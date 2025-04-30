<template>
    <div>
        <span :class="[bem.b(), 'icon-' + name]"></span>
    </div>
</template>

<script setup lang="ts">
import { bem, iconProps } from './icon';
const props = defineProps(iconProps);

</script>

<style scoped lang="scss"></style>
