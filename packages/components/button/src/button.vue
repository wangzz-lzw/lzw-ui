<template>
  <button class="t-button" :class="[
    `${bem.e(type)}`,
    `${size && 't-button--' + size}`,
    { 'is-round': round },
    { 'is-circle': circle }
  ]" :disabled="disabled">
    <span :class="[`${!!icon ? 't-icon icon-' + icon : ''}`]"></span>
    <div v-if="$slots.default" class="t-button__inner">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { defineOptions, defineProps } from "vue";
import { ButtonProps, bem } from "./button";

defineOptions({
  name: "t-button",
});

import { PropType } from "vue";

export interface ButtonProps {
  type?: "primary" | "success" | "warning" | "info" | "danger";
  size?: "" | "small" | "mini";
  round?: boolean;
  disabled?: boolean;
  circle?: boolean;
}

defineProps({
  type: {
    type: String as PropType<ButtonProps["type"]>,
    default: "primary",
  },
  size: {
    type: String as PropType<ButtonProps["size"]>,
    default: "",
  },
  round: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  circle: {
    type: Boolean,
    default: false,
  }
});
</script>

<style lang="scss" scoped></style>
