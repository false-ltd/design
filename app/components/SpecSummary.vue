<script setup lang="ts">
    import type { Design } from "~/composables/useDesigns";
    import { avatarUrl } from "~/composables/useDesigns";
    import { useDesignSpec } from "~/composables/useDesignSpec";

    const { t } = useI18n();

    const props = defineProps<{
        design: Design;
    }>();

    const { spec, pending } = useDesignSpec(props.design.slug);

    const emit = defineEmits<{
        openDoc: [];
    }>();
</script>

<template>
    <div class="p-5 overflow-y-auto h-full">
        <!-- Company header -->
        <div class="flex items-center gap-3 mb-4">
            <img
                :src="avatarUrl(design)"
                :alt="design.name"
                class="w-9 h-9 rounded-full bg-(--c-bg-elevated)"
                loading="lazy"
            />
            <div>
                <h2 class="font-[Georgia,serif] text-lg text-(--c-text)">{{ design.name }}</h2>
                <span class="text-[10px] text-(--c-text-muted)">{{ t(`category.${design.categoryKey}`) }}</span>
            </div>
        </div>

        <!-- Description -->
        <p class="text-xs text-(--c-text-secondary) leading-relaxed mb-4">{{ design.description }}</p>

        <!-- View document button — prominent, near top -->
        <button
            class="w-full text-center text-sm font-medium py-2.5 px-4 rounded-lg bg-(--c-accent) text-(--c-bg) hover:opacity-85 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 mb-5 cursor-pointer"
            @click="emit('openDoc')"
        >
            <span class="i-lucide-book-open text-base" />
            {{ t("detail.viewDoc") }}
        </button>

        <template v-if="pending">
            <div class="space-y-3">
                <div class="h-4 bg-(--c-bg-elevated) rounded w-2/3"></div>
                <div class="h-4 bg-(--c-bg-elevated) rounded w-1/2"></div>
                <div class="h-4 bg-(--c-bg-elevated) rounded w-3/4"></div>
            </div>
        </template>

        <template v-else-if="spec">
            <!-- Color palette -->
            <div v-if="spec.colors.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-(--c-text-muted) mb-2">
                    {{ t("detail.colors") }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <div v-for="color in spec.colors" :key="color.hex" class="group relative">
                        <div
                            class="w-7 h-7 rounded-md border border-(--c-border) cursor-default"
                            :style="{ backgroundColor: color.hex }"
                            :title="`${color.name}: ${color.hex}`"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Typography -->
            <div v-if="spec.fonts.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-(--c-text-muted) mb-2">
                    {{ t("detail.typography") }}
                </div>
                <div v-for="font in spec.fonts" :key="font.role" class="text-xs mb-1">
                    <span class="text-(--c-text)">{{ font.role }}:</span>
                    <span class="text-(--c-text-secondary) ml-1">{{ font.name }}</span>
                </div>
            </div>

            <!-- Key traits -->
            <div v-if="spec.traits.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-(--c-text-muted) mb-2">
                    {{ t("detail.keyTraits") }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <span
                        v-for="(trait, i) in spec.traits.slice(0, 5)"
                        :key="i"
                        class="px-2 py-0.5 rounded text-[9px] bg-(--c-bg-elevated) text-(--c-text-secondary)"
                    >
                        {{ trait.length > 30 ? trait.slice(0, 30) + "..." : trait }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
