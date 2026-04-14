<script setup lang="ts">
    const switchLocalePath = useSwitchLocalePath();
</script>

<template>
    <div class="flex items-center gap-3">
        <!-- Language switcher -->
        <div class="flex items-center gap-1">
            <NuxtLink
                :to="switchLocalePath('en')"
                class="text-[10px] px-1.5 py-0.5 rounded transition-colors"
                :class="
                    $i18n.locale === 'en'
                        ? 'text-(--c-text) font-medium'
                        : 'text-(--c-text-muted) hover:text-(--c-text-secondary)'
                "
            >
                EN
            </NuxtLink>
            <span class="text-[10px] text-(--c-border)">|</span>
            <NuxtLink
                :to="switchLocalePath('zh')"
                class="text-[10px] px-1.5 py-0.5 rounded transition-colors"
                :class="
                    $i18n.locale === 'zh'
                        ? 'text-(--c-text) font-medium'
                        : 'text-(--c-text-muted) hover:text-(--c-text-secondary)'
                "
            >
                中
            </NuxtLink>
        </div>
        <UColorModeButton />
        <ULink to="https://github.com/false-ltd/design" external
            ><UIcon name="i-lucide-github" class="text-base"
        /></ULink>
    </div>
</template>
