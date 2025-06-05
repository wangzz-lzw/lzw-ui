<template>
  <div class="app-container">
    <h1>LZW-UI 组件示例</h1>

    <div class="section">
      <h2>表格组件</h2>
      <t-table :columns="tableColumns" :data="tableData"></t-table>
    </div>

    <div class="section">
      <h2>虚拟列表组件</h2>
      <div class="virtual-list-container">
        <t-virtual-list :data="virtualListData" :item-size="50" :buffer="5">
          <template #default="{ item, index }">
            <div class="list-item">
              <span class="item-index">{{ index }}</span>
              <span class="item-title">{{ item.title }}</span>
              <span class="item-desc">{{ item.description }}</span>
            </div>
          </template>
        </t-virtual-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 表格组件数据
const tableColumns = [
  {
    label: 'Name',
    prop: 'name',
    width: 150,
    fixed: true,
    sortable: true
  },
  {
    label: 'Age',
    prop: 'age',
    width: 100,
  },
  {
    label: 'Address',
    prop: 'address',
    width: 200,
  },
  {
    label: 'Email',
    prop: 'email',
    width: 200,
  },
];

const tableData = [
  {
    name: 'John',
    age: 20,
    address: 'New York No. 1 Lake Park',
    email: 'john@example.com',
  },
  {
    name: 'Tom',
    age: 21,
    address: 'London No. 1 Lake Park',
    email: 'tom@example.com',
  },
  {
    name: 'Jerry',
    age: 22,
    address: 'Sydney No. 1 Lake Park',
    email: 'jerry@example.com',
  },
];

// 虚拟列表组件数据
const virtualListData = ref(Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  title: `项目 ${index + 1}`,
  description: `这是第 ${index + 1} 个项目的详细描述，用于测试虚拟列表组件的性能。`
})));

</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  margin-bottom: 40px;

  h2 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 500;
  }
}

.virtual-list-container {
  height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;

  .item-index {
    flex: 0 0 50px;
    font-weight: bold;
  }

  .item-title {
    flex: 0 0 150px;
    font-weight: 500;
  }

  .item-desc {
    flex: 1;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>