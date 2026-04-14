<script setup lang="ts">
    const localePath = useLocalePath();
</script>

<template>
    <header class="sticky top-0 z-50 bg-(--c-bg)/95 backdrop-blur-sm border-b border-(--c-border)">
        <div class="flex items-center justify-between h-12 px-5">
            <div class="flex items-center gap-3">
                <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
                    <UIcon name="i-lucide-cherry" class="text-lg text-(--c-accent)" />
                    <span class="text-sm font-semibold text-(--c-text)">Design</span>
                </NuxtLink>
                <slot />
            </div>

            <HeaderControls />
        </div>
    </header>
</template>
