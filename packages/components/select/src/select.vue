<template>
    <div :class="[
        bem.b(),
        size && bem.m(size),
        { 'is-disabled': disabled },
        { 'is-focus': isOpen }
    ]">
        <TPopup v-model="isOpen" :disabled="disabled">
            <div class="t-select__wrapper" ref="inputRef">
                <TInput v-model="displayValue" :size="size" :placeholder="placeholder" readonly :disabled="disabled" />
                <span :class="bem.e('arrow')" :style="{ transform: isOpen ? 'rotate(180deg)' : '' }"></span>
                <span v-if="clearable && modelValue" :class="bem.e('clear')" @click.stop="clearValue">×</span>
            </div>
            <template #popper>
                <div :class="bem.e('dropdown')" :style="computedStyle" ref="dropdownRef">
                    <TScrollbar>
                        <slot></slot>
                    </TScrollbar>
                </div>
            </template>
        </TPopup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { bem, SelectProps } from './select'
import { TPopup, TInput, TScrollbar } from '../../components';
import { OptionProps } from './option';

defineOptions({
    name: 't-select'
})


const props = withDefaults(defineProps<SelectProps>(), {
    placeholder: '请选择',
    disabled: false,
    clearable: false,
    size: '',
    multiple: false
})

const emits = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const inputRef = ref<HTMLInputElement>()

const dropdownRef = ref<HTMLDivElement>()
const displayValue = ref('')
const newValue = ref()
provide('selectValue', computed(() => props.modelValue))
provide('updateSelectValue', updateValue)

function updateValue(newProps: OptionProps) {
    if (props.multiple) {
        newValue.value = [...(newValue.value || []), newProps.value]
        displayValue.value = [...(displayValue.value || []), newProps.label!].join('')
    } else {
        newValue.value = newProps.value
        displayValue.value = newProps.label!
        isOpen.value = false
    }
    emits('update:modelValue', newValue.value)
    emits('change', newValue.value)
}

function clearValue() {
    const newValue = props.multiple ? [] : ''
    displayValue.value = newValue.toString()
    emits('update:modelValue', newValue)
    emits('change', newValue)
    isOpen.value = false
}

const computedStyle = computed(() => {
    const input = inputRef.value
    const dropdown = dropdownRef.value
    if (!input || !dropdown) {
        return {}
    }
    const { top, left, width } = input.getBoundingClientRect()
    const { height } = dropdown.getBoundingClientRect()
    return {
        top: `${top + height}px`,
        left: `${left}px`,
        minWidth: `${width - 20}px`
    }
})
</script>

<style scoped lang="scss"></style>
