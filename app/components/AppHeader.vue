<script setup lang="ts">
    const localePath = useLocalePath();

    const route = useRoute();

    const slug = computed(() => {
        const s = route.params.slug;
        return Array.isArray(s) ? s[0] : s;
    });
</script>

<template>
    <header class="sticky top-0 z-50 bg-(--c-bg)/95 backdrop-blur-sm border-b border-(--c-border)">
        <div class="max-w-400 mx-auto flex items-center justify-between h-12 px-5">
            <div class="flex items-center gap-3">
                <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
                    <UIcon name="i-lucide-terminal" class="text-lg text-(--c-accent)" />
                    <span class="text-sm font-semibold text-(--c-text)">Design</span>
                </NuxtLink>
                <span class="text-xs text-(--c-text-muted)">/</span>
                <span class="text-xs text-(--c-text-secondary) capitalize">{{ slug?.replace(/\./g, " ") }}</span>
            </div>

            <div class="flex items-center gap-4">
                <HeaderControls />
            </div>
        </div>
    </header>
</template>
