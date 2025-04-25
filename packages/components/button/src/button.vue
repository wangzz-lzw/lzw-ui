<template>
  <button class="t-button" :class="[
    `t-button__${type}`,
    `${size && 't-button--' + size}`,
    { 'is-round': round },
  ]" :disabled="disabled">
    <div class="t-button__inner">
      <span v-if="$slots.default">
        <slot />
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { defineOptions, defineProps } from "vue";
import { ButtonProps } from "./button";

defineOptions({
  name: "t-button",
});

import { PropType } from "vue";

export interface ButtonProps {
  type?: "primary" | "success" | "warning" | "info" | "danger";
  size?: "" | "small" | "mini";
  round?: boolean;
  disabled?: boolean;
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
});
</script>

<style lang="scss" scoped></style>
