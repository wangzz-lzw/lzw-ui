<template>
    <div class="lzw-input">
        <input class="lzw-input__inner" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">

defineProps(
    {
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '',
        }
    }
)

const emits = defineEmits(['update:modelValue'])
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emits('update:modelValue', target.value);
}
</script>

<style scoped lang="scss"></style>
