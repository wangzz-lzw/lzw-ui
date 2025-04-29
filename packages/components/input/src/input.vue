<template>
    <div :class="[bem.b(), size && bem.m(size), { 'is-disabled': disabled }, { 'is-readonly': readonly }]">
        <input :class="[bem.e('input')]" ref="input" @input="handleInput" :readonly="disabled" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { inputProps, bem } from './input'

const props = defineProps(inputProps)

const input = ref<HTMLInputElement>()

const emits = defineEmits(['update:modelValue'])

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    input.value!.value = target.value;
    emits('update:modelValue', target.value);
}

const setNativeInputValue = (value: string) => {
    input.value!.value = value;
}

watch(() => props.modelValue, (value) => {
    setNativeInputValue(value);
})
</script>

<style scoped lang="scss"></style>
