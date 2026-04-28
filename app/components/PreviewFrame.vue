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
    <div class="h-full relative bg-elevated">
        <!-- Toggle bar -->
        <div class="flex items-center gap-1.5 px-4 py-2">
            <UButton
                :label="t('preview.light')"
                :variant="variant === 'light' ? 'solid' : 'outline'"
                color="neutral"
                size="xs"
                class="rounded-full"
                @click="variant = 'light'"
            />
            <UButton
                :label="t('preview.dark')"
                :variant="variant === 'dark' ? 'solid' : 'outline'"
                color="neutral"
                size="xs"
                class="rounded-full"
                @click="variant = 'dark'"
            />
        </div>

        <!-- iframe — absolute positioned to fill remaining space -->
        <div class="absolute inset-x-0 bottom-0" style="top: 44px">
            <div class="px-3 pb-3 h-full">
                <iframe
                    :src="src"
                    class="w-full h-full rounded-lg border border-default bg-white"
                    :title="`${slug} design preview (${variant})`"
                />
            </div>
        </div>
    </div>
</template>
