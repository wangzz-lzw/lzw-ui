<template>
  <button :class="[
    bem.b(),
    bem.e(type),
    size && bem.m(size),
    { 'is-round': round },
    { 'is-circle': circle }
  ]" :disabled="disabled">
    <span :class="[`${!!icon ? 't-icon icon-' + icon : ''}`]"></span>
    <div v-if="$slots.default" :class="bem.e('inner')">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { buttonProps, bem } from "./button";

defineOptions({
  name: "t-button",
});
defineProps(buttonProps);


</script>

<style lang="scss" scoped></style>
