<template>
  <li class="t-option" :class="[
    bem.b(),
    { 'is-selected': isSelected },
    { 'is-disabled': disabled }
  ]" @click="handleClick">
    <span :class="bem.e('label')">
      <slot v-if="$slots.default"></slot>
      <template v-else>{{ label }}</template>
    </span>
  </li>
</template>

<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import { bem, OptionProps } from './option'

defineOptions({
  name: 't-option'
})


const props = withDefaults(defineProps<OptionProps>(), {
  label: '',
  disabled: false
})

const selectValue = inject<Ref<string | number | Array<string | number>>>('selectValue')
const updateSelectValue = inject<(props: OptionProps) => void>('updateSelectValue')

const isSelected = computed(() => {
  if (Array.isArray(selectValue?.value)) {
    return selectValue?.value.includes(props.value)
  }
  return selectValue?.value === props.value
})

function handleClick() {
  if (props.disabled) return
  updateSelectValue?.(props)
}
</script>

<style lang="scss"></style>
