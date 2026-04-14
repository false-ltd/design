#!/usr/bin/env python3
"""
Download HTML resources from getdesign.md
Saves resources to companies/{{name}}/ structure:
  - companies/{{name}}/index.html (light theme)
  - companies/{{name}}/dark.html  (dark theme)
  - companies/{{name}}/design.md  (markdown)

URLs are generated from company name:
  - https://getdesign.md/design-md/{name}/preview      → index.html
  - https://getdesign.md/design-md/{name}/preview-dark → dark.html
  - https://getdesign.md/design-md/{name}/DESIGN.md    → design.md

Anti-Cloudflare measures:
  - curl_cffi: mimics Chrome TLS fingerprint (falls back to requests if not installed)
  - Randomised delays between files and between companies
  - Full browser-like headers including Sec-Fetch-* fields
  - Exponential back-off on 429 / 503
  - Single-threaded to stay well under rate limits
"""

import csv
import os
import re
import time
import random
import argparse
import logging
from pathlib import Path
from enum import StrEnum

# ---------------------------------------------------------------------------
# Optional curl_cffi — strongly recommended for Cloudflare bypass.
#   pip install curl_cffi
# Falls back to plain requests if not installed (may trigger CF on some sites).
# ---------------------------------------------------------------------------
try:
    from curl_cffi import requests as _req_lib
    _USE_CURL_CFFI = True
    _IMPERSONATE   = "chrome124"
except ImportError:
    import requests as _req_lib   # type: ignore[no-redef]
    _USE_CURL_CFFI = False
    _IMPERSONATE   = None

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
CSV_FILE        = "companies.csv"
OUTPUT_BASE_DIR = "companies"

# Randomised delays (seconds) to avoid pattern detection
FILE_DELAY_MIN    = 2.0    # between files within one company
FILE_DELAY_MAX    = 5.0
COMPANY_DELAY_MIN = 4.0    # after finishing all files for one company
COMPANY_DELAY_MAX = 8.0

TIMEOUT     = 30
MAX_RETRIES = 3

FILE_TYPES: dict[str, str] = {
    "index.html": "preview",
    "dark.html":  "preview-dark",
    "design.md":  "DESIGN.md",
}

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-8s %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Browser-like request headers
# ---------------------------------------------------------------------------
_HEADERS: dict[str, str] = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,application/xml;"
        "q=0.9,image/avif,image/webp,*/*;q=0.8"
    ),
    "Accept-Language":           "en-US,en;q=0.9",
    "Accept-Encoding":           "gzip, deflate, br",
    "Connection":                "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest":            "document",
    "Sec-Fetch-Mode":            "navigate",
    "Sec-Fetch-Site":            "none",
    "Sec-Fetch-User":            "?1",
    "Cache-Control":             "max-age=0",
}

# ---------------------------------------------------------------------------
# HTTP session
# ---------------------------------------------------------------------------
def _build_session():
    """
    Build a session that mimics Chrome as closely as possible.
    curl_cffi replicates the TLS ClientHello fingerprint; plain requests cannot.
    """
    if _USE_CURL_CFFI:
        log.info("HTTP backend: curl_cffi  (Chrome %s TLS fingerprint)", _IMPERSONATE)
        session = _req_lib.Session(impersonate=_IMPERSONATE)
    else:
        log.warning(
            "curl_cffi not installed — using plain requests. "
            "Cloudflare TLS fingerprinting may block some downloads. "
            "Fix: pip install curl_cffi"
        )
        from requests.adapters import HTTPAdapter
        from urllib3.util.retry import Retry

        adapter = HTTPAdapter(max_retries=Retry(total=0, raise_on_status=False))
        session = _req_lib.Session()
        session.mount("https://", adapter)
        session.mount("http://",  adapter)

    session.headers.update(_HEADERS)
    return session


SESSION = _build_session()

# ---------------------------------------------------------------------------
# HTML cleaning
# ---------------------------------------------------------------------------
_SCRIPT_RE = re.compile(r"\s*<script[^>]*>.*?</script>\s*", re.DOTALL)
_BODY_RE   = re.compile(r"</div>\s*</body>")
_NAV_RE    = re.compile(
    r"(<div\s+class=[\"']nav-left[\"'][^>]*>).*?(</div>)", re.DOTALL
)
_INVALID_CHARS = str.maketrans('<>:"/\\|?*', "_________")


def _clean_html(html: str) -> str:
    html = _SCRIPT_RE.sub("", html)
    html = _BODY_RE.sub("</div>\n    </body>", html)
    html = _NAV_RE.sub(
        lambda m: f"{m.group(1)}\n            {m.group(2)}", html
    )
    return html


def _sanitize(name: str) -> str:
    return name.translate(_INVALID_CHARS).strip()


# ---------------------------------------------------------------------------
# Error log
# ---------------------------------------------------------------------------
_error_log = Path(OUTPUT_BASE_DIR) / "errors.log"


def _log_error(msg: str) -> None:
    log.error(msg)
    _error_log.parent.mkdir(parents=True, exist_ok=True)
    with _error_log.open("a", encoding="utf-8") as f:
        f.write(f"{msg}\n")


# ---------------------------------------------------------------------------
# Download result
# ---------------------------------------------------------------------------
class DownloadResult(StrEnum):
    SUCCESS = "success"
    SKIPPED = "skipped"
    FAILED  = "failed"


# ---------------------------------------------------------------------------
# Core download function
# ---------------------------------------------------------------------------
def _download_file(
    url: str,
    output_path: Path,
    *,
    force: bool = False,
) -> DownloadResult:

    if not force and output_path.exists():
        log.info("  SKIP  %s", output_path.name)
        return DownloadResult.SKIPPED

    log.info("  GET   %s", url)

    for attempt in range(MAX_RETRIES):
        try:
            kwargs: dict = {"timeout": TIMEOUT, "headers": _HEADERS}
            if _USE_CURL_CFFI:
                kwargs["impersonate"] = _IMPERSONATE

            resp = SESSION.get(url, **kwargs)

            # Rate-limited: exponential back-off (10s, 20s, 40s …)
            if resp.status_code == 429:
                wait = (2 ** attempt) * 10 + random.uniform(1, 5)
                log.warning(
                    "  429 rate-limited — waiting %.0fs (attempt %d/%d)",
                    wait, attempt + 1, MAX_RETRIES,
                )
                time.sleep(wait)
                continue

            # Cloudflare challenge or hard IP block
            if resp.status_code in (403, 503):
                _log_error(
                    f"HTTP {resp.status_code} for {url} "
                    "— possible Cloudflare block; consider waiting or using a proxy"
                )
                return DownloadResult.FAILED

            resp.raise_for_status()

        except Exception as exc:
            if attempt < MAX_RETRIES - 1:
                wait = (2 ** attempt) + random.uniform(0, 2)
                log.warning(
                    "  attempt %d/%d failed (%s) — retrying in %.1fs",
                    attempt + 1, MAX_RETRIES, exc, wait,
                )
                time.sleep(wait)
                continue
            _log_error(f"All {MAX_RETRIES} attempts failed for {url}: {exc}")
            return DownloadResult.FAILED

        # ── success: clean and save ───────────────────────────────────────
        content      = resp.text
        original_len = len(content)

        if output_path.suffix == ".html":
            content = _clean_html(content)
            removed = original_len - len(content)
            log.info(
                "  SAVE  %s  (%d chars, cleaned -%d)",
                output_path.name, len(content), removed,
            )
        else:
            log.info("  SAVE  %s  (%d chars)", output_path.name, original_len)

        output_path.write_text(content, encoding="utf-8")
        return DownloadResult.SUCCESS

    _log_error(f"Exhausted retries for {url}")
    return DownloadResult.FAILED


# ---------------------------------------------------------------------------
# Company processor
# ---------------------------------------------------------------------------
def process_company(
    name: str,
    *,
    index: int = 1,
    total: int = 1,
    force: bool = False,
) -> tuple[int, int, int]:
    """Download all three files for one company. Returns (ok, skipped, failed)."""
    base = name.lower()
    log.info("[%d/%d] %s", index, total, name)

    company_dir = Path(OUTPUT_BASE_DIR) / _sanitize(name)
    company_dir.mkdir(parents=True, exist_ok=True)

    ok = skipped = failed = 0
    file_items = list(FILE_TYPES.items())

    for i, (filename, suffix) in enumerate(file_items):
        url    = f"https://getdesign.md/design-md/{base}/{suffix}"
        result = _download_file(url, company_dir / filename, force=force)

        if result == DownloadResult.SUCCESS:
            ok += 1
        elif result == DownloadResult.SKIPPED:
            skipped += 1
        else:
            failed += 1

        # Delay between files (skip after the last one)
        if i < len(file_items) - 1:
            delay = random.uniform(FILE_DELAY_MIN, FILE_DELAY_MAX)
            log.debug("  sleeping %.1fs", delay)
            time.sleep(delay)

    return ok, skipped, failed


# ---------------------------------------------------------------------------
# CSV reader
# ---------------------------------------------------------------------------
def _read_companies(csv_file: str) -> list[str]:
    path = Path(csv_file)
    if not path.exists():
        log.error("CSV not found: %s", csv_file)
        return []

    seen:  set[str]  = set()
    names: list[str] = []
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            name = row.get("name", "").strip()
            if name and name not in seen:
                seen.add(name)
                names.append(name)
    return names


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(
        description="Download design resources from getdesign.md",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python download.py                    # all companies in CSV, skip existing files
  python download.py --force            # re-download everything
  python download.py --company stripe   # single company

Recommended:
  pip install curl_cffi                 # enables Chrome TLS fingerprint spoofing
        """,
    )
    parser.add_argument("--company", help="Download a single company by name")
    parser.add_argument(
        "--force", action="store_true", help="Overwrite existing files"
    )
    args = parser.parse_args()

    Path(OUTPUT_BASE_DIR).mkdir(parents=True, exist_ok=True)

    backend = "curl_cffi (Chrome TLS)" if _USE_CURL_CFFI else "requests (fallback)"
    print("=" * 54)
    print("  getdesign.md Downloader")
    print(f"  backend : {backend}")
    print(f"  delays  : {FILE_DELAY_MIN}–{FILE_DELAY_MAX}s/file  "
          f"{COMPANY_DELAY_MIN}–{COMPANY_DELAY_MAX}s/company")
    print("=" * 54)

    total_ok = total_skip = total_fail = 0

    if args.company:
        ok, skip, fail = process_company(
            args.company, index=1, total=1, force=args.force
        )
        total_ok, total_skip, total_fail = ok, skip, fail

    else:
        names = _read_companies(CSV_FILE)
        if not names:
            return

        log.info("Found %d companies in %s", len(names), CSV_FILE)

        for i, name in enumerate(names, 1):
            ok, skip, fail = process_company(
                name, index=i, total=len(names), force=args.force
            )
            total_ok   += ok
            total_skip += skip
            total_fail += fail

            # Longer pause between companies (skip after the last one)
            if i < len(names):
                delay = random.uniform(COMPANY_DELAY_MIN, COMPANY_DELAY_MAX)
                log.info("--- next company in %.1fs ---", delay)
                time.sleep(delay)

    print("\n" + "=" * 54)
    print("  Summary")
    print(f"  ✓ Downloaded : {total_ok}")
    print(f"  · Skipped    : {total_skip}")
    print(f"  ✗ Failed     : {total_fail}")
    if total_fail:
        print(f"  ↳ details → {_error_log}")
    print("=" * 54)


if __name__ == "__main__":
    main()

