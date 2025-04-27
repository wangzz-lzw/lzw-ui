<template>
    <div class="t-checkbox" @click="handleClick" :class="{ 'is-foucs': modelValue }">
        <div class="t-checkbox__input-wrapper" :class="{ checked: modelValue }">
            <input type="checkbox" class="t-checkbox__original" :checked="checked" :value="modelValue" />
            <div class="t-checkbox__input"></div>
        </div>
        <span class="t-checkbox__label">
            <slot v-if="slots.default"></slot>
            <span v-else>{{ label }}</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

defineOptions({
    name: "t-checkbox"
});

const slots = useSlots();
const props = defineProps(
    {
        modelValue: {
            type: Boolean,
            default: false,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "",
        },
    }
);

const emits = defineEmits(['update:modelValue', "change"]);



const handleClick = () => {
    emits('update:modelValue', !props.modelValue);
    emits('change', !props.modelValue);
}

</script>

<style scoped lang="scss"></style>
