<script setup lang="ts">
    const localePath = useLocalePath();
</script>

<template>
    <div class="min-h-screen bg-(--c-bg) relative">
        <!-- Fixed top bar -->
        <div
            class="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-12 px-5 bg-(--c-bg)/95 backdrop-blur-sm"
        >
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
                <UIcon name="i-lucide-cherry" class="text-lg text-(--c-accent)" />
                <span class="text-sm font-semibold text-(--c-text)">Design</span>
            </NuxtLink>
            <HeaderControls />
        </div>

        <slot />
    </div>
</template>
