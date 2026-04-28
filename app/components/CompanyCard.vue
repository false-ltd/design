<script setup lang="ts">
import type { Design } from "~/composables/useDesigns";
import { avatarUrl } from "~/composables/useDesigns";

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
    design: Design;
}>();
</script>

<template>
    <NuxtLink :to="localePath(`/${design.slug}`)">
        <UCard
            variant="outline"
            :ui="{
                root: 'hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] hover:ring-accented transition-all duration-200',
                body: 'p-4 sm:p-4',
            }"
        >
            <div class="flex items-center gap-2.5 mb-2">
                <img
                    :src="avatarUrl(design)"
                    :alt="design.name"
                    class="w-6 h-6 rounded-full bg-elevated"
                    loading="lazy"
                    decoding="async"
                />
                <span class="text-sm font-medium text-default">{{ design.name }}</span>
            </div>
            <p class="text-xs text-toned leading-relaxed mb-3 line-clamp-2">{{ design.description }}</p>
            <span class="text-[10px] text-muted">{{ t(`category.${design.categoryKey}`) }}</span>
        </UCard>
    </NuxtLink>
</template>
