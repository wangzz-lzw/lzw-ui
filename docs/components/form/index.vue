<template>
    <t-form :model="form" :rules="rules">
        <t-form-item label="姓名" prop="name">
            <t-input type="text" v-model="form.name" />
        </t-form-item>
    </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const form = ref({
    name: 'John Doe',
})

const rules = {
    name: [
        { required: true, message: '请输入姓名' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ]
}


</script>

<style scoped lang="scss"></style>
