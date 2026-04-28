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
                class="w-9 h-9 rounded-full bg-elevated"
                loading="lazy"
            />
            <div>
                <h2 class="font-[Georgia,serif] text-lg text-default">{{ design.name }}</h2>
                <span class="text-[10px] text-muted">{{ t(`category.${design.categoryKey}`) }}</span>
            </div>
        </div>

        <!-- Description -->
        <p class="text-xs text-toned leading-relaxed mb-4">{{ design.description }}</p>

        <!-- View document button -->
        <UButton
            :label="t('detail.viewDoc')"
            icon="i-lucide-book-open"
            color="neutral"
            variant="solid"
            block
            class="mb-5"
            @click="emit('openDoc')"
        />

        <template v-if="pending">
            <div class="space-y-3">
                <USkeleton class="h-4 w-2/3" />
                <USkeleton class="h-4 w-1/2" />
                <USkeleton class="h-4 w-3/4" />
            </div>
        </template>

        <template v-else-if="spec">
            <!-- Color palette -->
            <div v-if="spec.colors.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-muted mb-2">
                    {{ t("detail.colors") }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <div v-for="color in spec.colors" :key="color.hex" class="group relative">
                        <div
                            class="w-7 h-7 rounded-md border border-default cursor-default"
                            :style="{ backgroundColor: color.hex }"
                            :title="`${color.name}: ${color.hex}`"
                        />
                    </div>
                </div>
            </div>

            <!-- Typography -->
            <div v-if="spec.fonts.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-muted mb-2">
                    {{ t("detail.typography") }}
                </div>
                <div v-for="font in spec.fonts" :key="font.role" class="text-xs mb-1">
                    <span class="text-default">{{ font.role }}:</span>
                    <span class="text-toned ml-1">{{ font.name }}</span>
                </div>
            </div>

            <!-- Key traits -->
            <div v-if="spec.traits.length" class="mb-5">
                <div class="text-[9px] uppercase tracking-[1px] text-muted mb-2">
                    {{ t("detail.keyTraits") }}
                </div>
                <div class="flex flex-wrap gap-1.5">
                    <span
                        v-for="(trait, i) in spec.traits.slice(0, 5)"
                        :key="i"
                        class="px-2 py-0.5 rounded text-[9px] bg-elevated text-toned"
                    >
                        {{ trait.length > 30 ? trait.slice(0, 30) + "..." : trait }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
