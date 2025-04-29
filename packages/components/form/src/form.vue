<template>
    <div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { provide, PropType } from 'vue';
import type { Rules } from 'async-validator'
// Define or import the Rules type

defineOptions({
    name: 't-form'
})

const props = defineProps({
    model: {
        type: Object,
        default: () => ({})
    },
    rules: {
        type: Object as PropType<Rules>,
        default: () => ({})
    }
})



provide('form', { rules: props.rules, model: props.model });


</script>

<style scoped lang="scss"></style>
