#!/usr/bin/env bash
# Usage:
#   ./download.sh                    # all from companies.csv
#   ./download.sh --company stripe   # single company

set -euo pipefail

CSV_FILE="companies.csv"
OUT_DIR="../public/designs"
LOG_FILE="${OUT_DIR}/errors.log"

CURL=(
  curl -sL --compressed --max-time 30
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
  -H "Accept-Language: en-US,en;q=0.9"
  -H "Sec-Fetch-Dest: document" -H "Sec-Fetch-Mode: navigate"
  -H "Sec-Fetch-Site: none"     -H "Cache-Control: max-age=0"
)

PY_CLEAN='
import sys, re, pathlib
p = pathlib.Path(sys.argv[1])
h = p.read_text(encoding="utf-8")
h = re.sub(r"\s*<script[^>]*>.*?</script>", "", h, flags=re.DOTALL)
h = re.sub(r"\s*<footer[^>]*>.*?</footer>", "", h, flags=re.DOTALL)
h = re.sub(r"(<div\s[^>]*class=[\"'"'"']nav-left[\"'"'"'][^>]*>).*?(</div>)", r"\1\2", h, flags=re.DOTALL)
p.write_text(h.strip() + "\n", encoding="utf-8")
'

fetch() {
  local url="$1" dest="$2" clean="${3:-0}"
  echo "  GET $(basename "${dest}")"
  if "${CURL[@]}" -o "${dest}" "${url}"; then
    [[ "${clean}" == 1 ]] && python3 -c "${PY_CLEAN}" "${dest}"
  else
    mkdir -p "${OUT_DIR}"
    echo "$(date '+%F %T') FAIL ${url}" >> "${LOG_FILE}"
    echo "  FAIL $(basename "${dest}")"
  fi
  sleep $(( 2 + RANDOM % 4 ))
}

process() {
  local name="$1"
  local slug
  slug=$(echo "${name}" | tr '[:upper:]' '[:lower:]')
  local dir="${OUT_DIR}/${name}"
  mkdir -p "${dir}"
  echo "[${name}]"
  fetch "https://getdesign.md/design-md/${slug}/preview"      "${dir}/index.html" 1
  fetch "https://getdesign.md/design-md/${slug}/preview-dark" "${dir}/dark.html"  1
  fetch "https://getdesign.md/design-md/${slug}/DESIGN.md"    "${dir}/design.md"
}

mkdir -p "${OUT_DIR}"

if [[ "${1:-}" == "--company" ]]; then
  process "$2"
else
  while IFS=',' read -r name; do
    [[ "${name}" == "name" || -z "${name}" ]] && continue
    process "${name}"
  done < "${CSV_FILE}"
fi
