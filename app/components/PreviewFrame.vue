<script setup lang="ts">
    import { previewUrl } from "~/composables/useDesigns";

    const { t } = useI18n();

    const props = defineProps<{
        slug: string;
    }>();

    const variant = ref<"light" | "dark">("light");

    const src = computed(() => previewUrl(props.slug, variant.value));
</script>

<template>
    <div class="h-full relative bg-(--c-bg-elevated)">
        <!-- Toggle bar -->
        <div class="flex items-center gap-1.5 px-4 py-2">
            <button
                class="px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer"
                :class="
                    variant === 'light'
                        ? 'bg-(--c-accent) text-(--c-bg)'
                        : 'bg-(--c-bg) text-(--c-text-secondary) border border-(--c-border)'
                "
                @click="variant = 'light'"
            >
                {{ t("preview.light") }}
            </button>
            <button
                class="px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer"
                :class="
                    variant === 'dark'
                        ? 'bg-(--c-accent) text-(--c-bg)'
                        : 'bg-(--c-bg) text-(--c-text-secondary) border border-(--c-border)'
                "
                @click="variant = 'dark'"
            >
                {{ t("preview.dark") }}
            </button>
        </div>

        <!-- iframe — absolute positioned to fill remaining space -->
        <div class="absolute inset-x-0 bottom-0" style="top: 44px">
            <div class="px-3 pb-3 h-full">
                <iframe
                    :src="src"
                    class="w-full h-full rounded-lg border border-(--c-border) bg-white"
                    :title="`${slug} design preview (${variant})`"
                ></iframe>
            </div>
        </div>
    </div>
</template>
