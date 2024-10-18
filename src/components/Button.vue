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

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      default: '',
    },
    usage: {
      type: String,
      default: '',
    },
  },
});
</script>

