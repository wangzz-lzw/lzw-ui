<template>
    <t-checkbox v-model="value">多选</t-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)

</script>
