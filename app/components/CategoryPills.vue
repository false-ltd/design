<script setup lang="ts">
import { CATEGORY_KEYS } from "~/composables/useDesigns";

const { t } = useI18n();

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();
</script>

<template>
    <div class="flex flex-wrap justify-center gap-2">
        <UButton
            :label="t('filter.all')"
            :variant="modelValue === 'all' ? 'solid' : 'outline'"
            color="neutral"
            size="xs"
            class="rounded-full"
            @click="emit('update:modelValue', 'all')"
        />
        <UButton
            v-for="cat in CATEGORY_KEYS"
            :key="cat"
            :label="t(`category.${cat}`)"
            :variant="modelValue === cat ? 'solid' : 'outline'"
            color="neutral"
            size="xs"
            class="rounded-full"
            @click="emit('update:modelValue', cat)"
        />
    </div>
</template>
