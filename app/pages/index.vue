<script setup lang="ts">
    import { DESIGNS } from "~/composables/useDesigns";

    definePageMeta({
        layout: "default",
    });

    const { t } = useI18n();
    const activeCategory = ref("all");

    useSeoMeta({
        title: () => t("site.title"),
        ogTitle: () => t("site.title"),
        description: () => t("site.description"),
        ogDescription: () => t("site.description"),
        ogType: "website",
        ogUrl: "https://design.false.ltd",
        ogImage: "https://design.false.ltd/home.png",
        twitterCard: "summary_large_image",
    });

    const filteredDesigns = computed(() => {
        if (activeCategory.value === "all") return DESIGNS;
        return DESIGNS.filter((d) => d.categoryKey === activeCategory.value);
    });
</script>

<template>
    <div>
        <!-- Hero -->
        <div class="text-center pt-20 md:pt-24 pb-8 md:pb-12 px-4 md:px-6">
            <h1
                class="font-[Georgia,serif] text-4xl md:text-5xl font-normal text-(--c-text) leading-tight tracking-[-0.02em] mb-3"
            >
                {{ t("hero.title") }}
            </h1>
            <p class="text-sm text-(--c-text-muted)">
                {{ t("hero.subtitle", { count: DESIGNS.length }) }}
            </p>
        </div>

        <!-- Category Pills -->
        <div class="px-4 md:px-6 mb-10">
            <CategoryPills v-model="activeCategory" />
        </div>

        <!-- Card Grid -->
        <div class="max-w-6xl mx-auto px-4 md:px-6 pb-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <CompanyCard v-for="design in filteredDesigns" :key="design.slug" :design="design" />
            </div>

            <div v-if="filteredDesigns.length === 0" class="text-center py-20 text-sm text-(--c-text-muted)">
                {{ t("filter.noResults") }}
            </div>
        </div>
    </div>
</template>
