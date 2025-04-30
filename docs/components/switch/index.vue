<template>
    <div>
        <t-switch v-model="value"></t-switch>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref(false);
</script>

<style scoped lang="scss"></style>
