<script setup lang="ts">
    import { marked } from "marked";
    import { findDesign } from "~/composables/useDesigns";

    const { t } = useI18n();

    definePageMeta({
        layout: "detail",
    });

    const route = useRoute();
    const slug = computed(() => {
        const s = route.params.slug;
        return Array.isArray(s) ? s[0] : s;
    });

    const design = computed(() => findDesign(slug.value ?? ""));

    if (!design.value) {
        throw createError({ statusCode: 404, statusMessage: t("detail.notFound") });
    }

    useHead({
        title: design.value ? `${design.value.name} — Design` : "Design",
    });

    useSeoMeta({
        title: () => design.value ? `${design.value.name} — Design` : "Design",
        ogTitle: () => design.value ? `${design.value.name} Design System — Design` : "Design",
        description: () => design.value?.description ?? "",
        ogDescription: () => design.value?.description ?? "",
        ogType: "article",
        ogUrl: () => `https://design.false.ltd/${slug.value}`,
    });

    // Slideover for design.md
    const docOpen = ref(false);
    const mdUrl = computed(() => `/designs/${slug.value}/design.md`);
    const { data: rawMd, pending: mdPending } = useFetch<string>(mdUrl, { responseType: "text" });
    const renderedMd = computed(() => {
        if (!rawMd.value) return "";
        return marked(rawMd.value, { async: false }) as string;
    });

    const copied = ref(false);
    async function copyMd() {
        if (!rawMd.value) return;
        await navigator.clipboard.writeText(rawMd.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    }

</script>

<template>
    <!-- Mobile: natural scroll, spec scrolls away, preview fills viewport -->
    <div class="lg:hidden">
        <SpecSummary :design="design" @open-doc="docOpen = true" />
        <div class="h-[calc(100vh-48px)]">
            <PreviewFrame :slug="design.slug" />
        </div>
    </div>

    <!-- Desktop: side-by-side fixed viewport -->
    <div v-if="design" class="hidden lg:block h-[calc(100vh-48px)]">
        <div class="grid grid-cols-[320px_1fr] h-full">
            <div class="border-r border-(--c-border) h-full overflow-hidden">
                <SpecSummary :design="design" @open-doc="docOpen = true" />
            </div>
            <div class="h-full">
                <PreviewFrame :slug="design.slug" />
            </div>
        </div>
    </div>

    <!-- Document modal -->
        <UModal v-model:open="docOpen">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <span class="text-sm font-semibold text-(--c-text)">{{ design.name }}</span>
                    <div class="flex items-center gap-2">
                        <button
                            class="cursor-pointer text-xs text-(--c-text-secondary) hover:text-(--c-text) transition-colors flex items-center gap-1 px-1.5 py-1 rounded"
                            @click="copyMd"
                        >
                            <UIcon :name="copied ? 'lucide-check' : 'lucide-clipboard'" class="text-xl" />
                        </button>
                        <button class="text-xl rounded cursor-pointer" @click="docOpen = false">
                            <UIcon name="i-lucide-x" class="text-xl" />
                        </button>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="h-full w-full overflow-auto">
                    <div v-if="mdPending" class="px-6 py-8 text-sm text-(--c-text-muted)">
                        {{ t("detail.loading") }}
                    </div>
                    <div
                        v-else-if="renderedMd"
                        class="px-6 pb-6 prose prose-neutral dark:prose-invert max-w-none"
                        v-html="renderedMd"
                    />
                </div>
            </template>
        </UModal>
</template>
