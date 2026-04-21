export interface DesignSpec {
    colors: { name: string; hex: string }[];
    fonts: { role: string; name: string }[];
    traits: string[];
}

export function parseDesignMd(md: string): DesignSpec {
    const colors: { name: string; hex: string }[] = [];
    const fonts: { role: string; name: string }[] = [];
    const traits: string[] = [];

    const colorRegex = /\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\)/g;
    let match;
    while ((match = colorRegex.exec(md)) !== null) {
        if (colors.length < 8 && !colors.some((c) => c.hex === match![2])) {
            colors.push({ name: match![1]!, hex: match![2]! });
        }
    }

    const fontSection = md.match(/### Font Family\s*\n([\s\S]*?)(?=\n###|\n##|$)/);
    if (fontSection) {
        const fontRegex = /\*\*(.+?)\*\*:\s*`(.+?)`/g;
        while ((match = fontRegex.exec(fontSection[1] ?? "")) !== null) {
            fonts.push({ role: match[1]!, name: match[2]! });
        }
    }

    const traitsSection = md.match(/\*\*Key Characteristics:\*\*\s*\n([\s\S]*?)(?=\n##|$)/);
    if (traitsSection) {
        const traitRegex = /^-\s+(.+)$/gm;
        while ((match = traitRegex.exec(traitsSection[1]!)) !== null) {
            const raw = match[1]!;
            const text = (raw.split(" -- ")[0] ?? raw).split(" — ")[0]!.trim();
            if (text.length > 0 && text.length < 80) {
                traits.push(text);
            }
        }
    }

    return { colors, fonts, traits };
}

export function useDesignSpec(slug: string) {
    const url = `/designs/${slug}/design.md`;

    const { data: rawMd, pending, error } = useFetch<string>(url, { responseType: "text" });

    const spec = computed<DesignSpec | null>(() => {
        if (!rawMd.value) return null;
        return parseDesignMd(rawMd.value);
    });

    return { spec, pending, error };
}
