<template>
    <div :class="bem.b()">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { bem } from './scrollbar'
</script>

<style scoped lang="scss"></style>
