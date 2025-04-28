<template>
  <div class="demo-select">
    <h2>基础用法</h2>
    <t-select v-model="value1" placeholder="请选择">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
    <p>选中值: {{ value1 }}</p>

    <h2>多选</h2>
    <t-select v-model="value2" multiple placeholder="请选择">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
    <p>选中值: {{ value2 }}</p>

    <h2>可清空</h2>
    <t-select v-model="value3" clearable placeholder="请选择">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
    <p>选中值: {{ value3 }}</p>

    <h2>禁用状态</h2>
    <t-select v-model="value4" disabled placeholder="请选择">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>

    <h2>不同尺寸</h2>
    <t-select v-model="value5" size="small" placeholder="小尺寸">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
    
    <t-select v-model="value6" size="mini" placeholder="迷你尺寸">
      <t-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]

const value1 = ref('')
const value2 = ref([])
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
</script>

<style scoped>
.demo-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

h2 {
  margin: 10px 0;
}
</style>
