<script setup lang="ts">
    const route = useRoute();
    const slug = computed(() => {
        const s = route.params.slug;
        return Array.isArray(s) ? s[0] : s;
    });
</script>

<template>
    <div class="min-h-screen bg-(--c-bg) flex flex-col">
        <AppHeader>
            <template #default>
                <span class="text-xs text-(--c-text-muted)">/</span>
                <span class="text-xs text-(--c-text-secondary) capitalize">{{ slug?.replace(/\./g, " ") }}</span>
            </template>
        </AppHeader>
        <main class="flex-1">
            <slot />
        </main>
    </div>
</template>
