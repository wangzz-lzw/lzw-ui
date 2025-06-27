<template>
  <div>
    <h2>基础用法</h2>
    <t-date-picker v-model="date1" />
    <p>当前选择的日期: {{ date1 }}</p>
  </div>

  <div style="margin-top: 20px;">
    <h2>日期范围选择</h2>
    <t-date-picker v-model="date2" type="daterange" placeholder="请选择日期范围" />
    <p>当前选择的日期范围: {{ date2 }}</p>
  </div>

  <div style="margin-top: 20px;">
    <h2>禁用状态</h2>
    <t-date-picker v-model="date3" disabled />
    <p>禁用状态下的日期选择器</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const date1 = ref();
const date2 = ref();
const date3 = ref(new Date());
</script>