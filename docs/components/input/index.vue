<template>
    <div>
        <t-input v-model="value" :placeholder="placeholder"></t-input>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const value = ref("")

const placeholder = ref("请输入内容")
</script>

<style scoped lang="scss"></style>
