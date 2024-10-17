<template>
  <button
    :class="['button', `-${usage}`] "
  >
    <slot name="icon" />
    <slot />
    <span
      class="button--label"
    >{{ label }}</span>
  </button>
</template>
<script setup lang="ts">
  interface Props {
    label: string;
    usage: string;
  }

  withDefaults(defineProps<Props>(), {
    label: '',
    usage: '',
  });
</script>

