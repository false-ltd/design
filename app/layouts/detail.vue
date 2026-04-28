<script setup lang="ts">
const route = useRoute();
const slug = computed(() => {
    const s = route.params.slug;
    return Array.isArray(s) ? s[0] : s;
});
</script>

<template>
    <AppHeader>
        <span class="text-xs text-muted">/</span>
        <span class="text-xs text-toned capitalize">{{ slug?.replace(/\./g, " ") }}</span>
    </AppHeader>
    <UMain class="flex-1">
        <slot />
    </UMain>
</template>
