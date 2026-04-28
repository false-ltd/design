<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale, locales } = useI18n();

const localeItems = computed(() =>
    (locales.value as { code: string; name: string }[]).map((l) => ({
        label: l.name,
        icon: locale.value === l.code ? "i-lucide-check" : undefined,
        to: switchLocalePath(l.code as "en" | "zh"),
    })),
);
</script>

<template>
    <div class="flex items-center gap-1.5">
        <UButton
            to="https://github.com/false-ltd/design"
            external
            icon="i-lucide-github"
            color="neutral"
            variant="ghost"
            size="sm"
        />
        <UColorModeButton class="cursor-pointer" />
        <UDropdownMenu :items="localeItems">
            <UButton icon="i-lucide-languages" color="neutral" variant="ghost" size="sm" />
        </UDropdownMenu>
    </div>
</template>
