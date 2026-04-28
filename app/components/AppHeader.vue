<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
    <UHeader>
        <template #title>
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
                <UIcon name="i-lucide-cherry" class="text-lg text-highlighted" />
                <span class="text-sm font-semibold">Design</span>
            </NuxtLink>
        </template>

        <slot />

        <template #right>
            <HeaderControls />
        </template>
    </UHeader>
</template>
