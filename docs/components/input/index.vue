<template>
    <div>
        不同尺寸的输入框
        defualt
        <t-input v-model="value" :placeholder="placeholder"></t-input>
        small
        <t-input v-model="value" :placeholder="placeholder" size="small"></t-input>
        mini
        <t-input v-model="value" :placeholder="placeholder" size="mini"></t-input>
    </div>

</template>

<script setup lang="ts">
import {ref} from 'vue'
const value = ref("")

const placeholder = ref("请输入内容")
</script>

<style scoped lang="scss"></style>
