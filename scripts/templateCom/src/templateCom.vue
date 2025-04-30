<template>
    <div :class="[bem.b()]"></div>
</template>

<script setup lang="ts">
import { bem, templateComProps } from './templateCom';
const props = defineProps(templateComProps);

const emits = defineEmits();
</script>

<style scoped lang="scss"></style>
