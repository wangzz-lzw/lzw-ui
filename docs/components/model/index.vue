<template>
    <div>
        <t-button @click="visible = true">显示弹窗</t-button>
        <t-model v-model="visible">
            我是内容我是内容我是内容我是内容我是内容
            我是内容我是内容我是内容我是内容我是内容
        </t-model>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)

</script>

<style scoped lang="scss"></style>
