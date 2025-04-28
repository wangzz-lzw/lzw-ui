<template>
  <li class="t-select-option" :class="{
    'is-selected': isSelected,
    'is-disabled': disabled
  }" @click="handleClick">
    <span class="t-select-option__label">{{ label }}</span>
  </li>
</template>

<script setup lang="ts">

defineOptions({
  name: 't-option'
})
import { inject, computed, type Ref } from 'vue'

interface OptionProps {
  value: string | number
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<OptionProps>(), {
  label: '',
  disabled: false
})

const selectValue = inject<Ref<string | number | Array<string | number>>>('selectValue')
const updateSelectValue = inject<(value: string | number) => void>('updateSelectValue')

const isSelected = computed(() => {
  if (Array.isArray(selectValue?.value)) {
    return selectValue?.value.includes(props.value)
  }
  return selectValue?.value === props.value
})

function handleClick() {
  if (props.disabled) return
  updateSelectValue?.(props.value)
}
</script>

<style lang="scss"></style>
