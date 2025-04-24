<template>
    <div class="lzw-input">
        <input class="lzw-input__inner" @input="handleInput"/>
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

<style scoped lang="scss">
@use "../../../theme-chalk/common/base.scss" as *;
.lzw-input {
        width: 100%;
        border-radius: 4px;
        border: 1px solid $t-border-color;

        &:focus-within {
            border-color: $t-primary;
            box-shadow: 0 0 0 1px $t-primary-lighten;
        }
        &:hover {
            border-color: $t-primary;
            box-shadow: 0 0 0 1px $t-primary-lighten;
        }
        & .lzw-input__inner {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            outline: none;
            padding: 0 12px;
            &::placeholder {
                color: $t-placeholder-color;
            }
        }
}
</style>
