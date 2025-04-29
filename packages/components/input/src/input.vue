<template>
    <div :class="[bem.b(), size && bem.m(size), { 'is-disabled': disabled }, { 'is-readonly': readonly }]">
        <input :class="[bem.e('input')]" :value="modelValue" @input="handleInput" :readonly="disabled" />
    </div>
</template>

<script setup lang="ts">
import { inputProps, bem } from './input'

defineProps(inputProps)

const emits = defineEmits(['update:modelValue'])
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emits('update:modelValue', target.value);
}
</script>

<style scoped lang="scss"></style>
