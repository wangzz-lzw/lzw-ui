<template>
    <t-form :model="form" :rules="rules">
        <t-form-item label="姓名" prop="name">
            <t-input type="text" v-model="form.name" />
        </t-form-item>
        <t-form-item label="省份" prop="province">
            <t-select v-model="form.province" placeholder="请选择省份" clearable>
                <t-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </t-select>
        </t-form-item>
    </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const form = ref({
    name: '',
    province: ""
})
const options = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' },
    { value: 'option4', label: '选项4' },
    { value: 'option5', label: '选项5' },
    { value: 'option6', label: '选项6' },
    { value: 'option7', label: '选项7' },
    { value: 'option8', label: '选项8' },
    { value: 'option9', label: '选项9' },
    { value: 'option10', label: '选项10' },
]
const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    province: [{ required: true, message: '请选择省份', trigger: 'change' }]
}


</script>

<style scoped lang="scss"></style>
