<template>
    <TPopup>
        <div :class="[
            bem.b(),
            size && bem.m(size),
            { 'is-disabled': disabled },
            { 'is-focus': isOpen }
        ]">
            <div class="t-select__wrapper" @click.stop="toggleDropdown">
                <TInput v-model="displayValue" :size="size" :placeholder="placeholder" :disabled="disabled" readonly />
                <span :class="bem.e('arrow')"></span>
                <span v-if="clearable && modelValue" :class="bem.e('clear')" @click.stop="clearValue">×</span>
            </div>

            <div v-show="isOpen" :class="bem.e('dropdown')" ref="dropdownRef">
                <ul>
                    <slot></slot>
                </ul>
            </div>
        </div>
    </TPopup>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import { bem, SelectProps } from './select'
import { TPopup, TInput } from '../../components';

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
const options = ref<Array<{ value: string | number, label?: string }>>([])
const highlightedIndex = ref(-1)

const displayValue = computed(() => {
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.join(', ')
    }
    return props.modelValue?.toString() || ''
})

provide('selectValue', computed(() => props.modelValue))
provide('updateSelectValue', updateValue)

function updateValue(value: string | number) {
    let newValue
    if (props.multiple) {
        const currentValue = Array.isArray(props.modelValue) ? props.modelValue : []
        const valueIndex = currentValue.indexOf(value)
        if (valueIndex > -1) {
            newValue = [...currentValue]
            newValue.splice(valueIndex, 1)
        } else {
            newValue = [...currentValue, value]
        }
    } else {
        newValue = value
        isOpen.value = false
    }

    emits('update:modelValue', newValue)
    emits('change', newValue)
}

function toggleDropdown() {
    if (props.disabled) return
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        highlightedIndex.value = -1
    }
}

function clearValue() {
    const newValue = props.multiple ? [] : ''
    emits('update:modelValue', newValue)
    emits('change', newValue)
    isOpen.value = false
}

function handleKeyDown(e: KeyboardEvent, type: 'up' | 'down' | 'enter') {
    if (!isOpen.value) {
        isOpen.value = true
        return
    }

    if (type === 'enter') {
        if (highlightedIndex.value >= 0) {
            const option = options.value[highlightedIndex.value]
            if (option) {
                updateValue(option.value)
            }
        }
        return
    }

    const direction = type === 'down' ? 1 : -1
    const newIndex = highlightedIndex.value + direction
    if (newIndex >= 0 && newIndex < options.value.length) {
        highlightedIndex.value = newIndex
        scrollToHighlighted()
    }
}

function scrollToHighlighted() {
    const dropdown = dropdownRef.value
    const optionEl = dropdown?.querySelectorAll('li')[highlightedIndex.value]
    if (optionEl && dropdown) {
        optionEl.scrollIntoView({ block: 'nearest' })
    }
}

function handleClickOutside(e: MouseEvent) {
    if (!isOpen.value) return
    if (!inputRef.value?.contains(e.target as Node) &&
        !dropdownRef.value?.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss"></style>
