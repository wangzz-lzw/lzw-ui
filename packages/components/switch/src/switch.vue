<template>
    <div :class="[bem.b()]">
        <input type="checkbox" :class="[bem.e('inner')]" @change="handleInputChange" />
    </div>
</template>

<script setup lang="ts">
import { bem, switchProps } from './switch';
const props = defineProps(switchProps);


const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log(target.checked);
}
</script>

<style scoped lang="scss"></style>
