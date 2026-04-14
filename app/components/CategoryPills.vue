<script setup lang="ts">
import { CATEGORY_KEYS, CATEGORY_STYLE } from '~/composables/useDesigns'

const { t } = useI18n()

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(cat: string) {
  emit('update:modelValue', cat)
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      class="px-3 py-1 rounded-full text-xs transition-all cursor-pointer"
      :class="modelValue === 'all' ? CATEGORY_STYLE.activeClass : CATEGORY_STYLE.inactiveClass"
      @click="select('all')"
    >
      {{ t('filter.all') }}
    </button>
    <button
      v-for="cat in CATEGORY_KEYS"
      :key="cat"
      class="px-3 py-1 rounded-full text-xs transition-all cursor-pointer"
      :class="modelValue === cat ? CATEGORY_STYLE.activeClass : CATEGORY_STYLE.inactiveClass"
      @click="select(cat)"
    >
      {{ t(`category.${cat}`) }}
    </button>
  </div>
</template>
