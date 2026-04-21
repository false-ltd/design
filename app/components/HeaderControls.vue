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
    <div class="flex items-center gap-3">
        <ULink to="https://github.com/false-ltd/design" external
            ><UIcon name="i-lucide-github" class="text-base"
        /></ULink>
        <UColorModeButton class="cursor-pointer" />
        <UDropdownMenu :items="localeItems">
            <button
                class="p-1.5 rounded-lg hover:bg-accented transition-colors flex cursor-pointer items-center gap-1.5"
            >
                <UIcon name="i-lucide-languages" class="w-4 h-4 text-toned" />
            </button>
        </UDropdownMenu>
    </div>
</template>
