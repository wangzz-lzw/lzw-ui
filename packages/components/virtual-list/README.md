# Virtual List 虚拟列表

用于展示大量数据的高性能虚拟滚动列表组件。

## 基础用法

```vue
<template>
  <l-virtual-list :data="listData" :item-size="50" :height="400">
    <template #default="{ item, index }">
      <div class="list-item">Item {{ index }}: {{ item }}</div>
    </template>
  </l-virtual-list>
</template>

<script setup lang="ts">
import { ref } from "vue";

const listData = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
</script>
```

## 动态高度

```vue
<template>
  <l-virtual-list
    :data="dynamicListData"
    :item-size="getItemSize"
    :height="400"
  >
    <template #default="{ item, index }">
      <div class="list-item" :style="{ height: item.height + 'px' }">
        Item {{ index }}: {{ item.content }}
      </div>
    </template>
  </l-virtual-list>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dynamicListData = Array.from({ length: 10000 }, (_, i) => ({
  content: `Item ${i}`,
  height: Math.floor(Math.random() * 50) + 50, // 50-100px随机高度
}));

const getItemSize = (index: number) => {
  return dynamicListData[index].height;
};
</script>
```

## API

### Props

| 参数         | 说明                                   | 类型                                  | 默认值   |
| ------------ | -------------------------------------- | ------------------------------------- | -------- |
| data         | 列表数据                               | `array`                               | `[]`     |
| itemSize     | 项目高度，可以是固定值或返回高度的函数 | `number \| (index: number) => number` | -        |
| height       | 容器高度                               | `string \| number`                    | `'100%'` |
| buffer       | 上下缓冲区域的项目数量                 | `number`                              | `30`     |
| throttleTime | 滚动事件节流时间（毫秒）               | `number`                              | `16`     |

### Events

| 事件名 | 说明           | 回调参数       |
| ------ | -------------- | -------------- |
| scroll | 列表滚动时触发 | `event: Event` |

### Slots

| 插槽名  | 说明         | 作用域参数                     |
| ------- | ------------ | ------------------------------ |
| default | 列表项的内容 | `{ item: any, index: number }` |

### Methods

| 方法名        | 说明                 | 参数                      |
| ------------- | -------------------- | ------------------------- |
| scrollToIndex | 滚动到指定索引的项目 | `(index: number) => void` |

## 注意事项

1. 性能优化

   - 组件内部使用了节流来优化滚动性能
   - 使用了 CSS containment 来提升渲染性能
   - 建议给每个列表项设置唯一的 key

2. 动态高度

   - 使用动态高度时，需要提供准确的 itemSize 函数
   - 动态高度可能会影响滚动性能，建议使用固定高度

3. 缓冲区设置

   - buffer 属性用于预渲染可视区域外的项目
   - 较大的缓冲区可以提供更流畅的滚动体验，但会增加渲染负担
   - 默认值 30 适用于大多数场景

4. 容器高度
   - 可以使用具体数值（如 400）或百分比（如 '100%'）
   - 使用百分比时确保父容器有明确的高度

## 示例

### 基础列表

```vue
<l-virtual-list :data="listData" :item-size="50" :height="400">
  <template #default="{ item, index }">
    <div class="list-item">{{ item }}</div>
  </template>
</l-virtual-list>
```

### 动态高度列表

```vue
<l-virtual-list :data="dynamicData" :item-size="getItemSize" :height="400">
  <template #default="{ item, index }">
    <div class="list-item" :style="{ height: item.height + 'px' }">
      {{ item.content }}
    </div>
  </template>
</l-virtual-list>
```

### 滚动到指定位置

```vue
<template>
  <div>
    <button @click="scrollToItem(100)">滚动到第100项</button>
    <l-virtual-list
      ref="listRef"
      :data="listData"
      :item-size="50"
      :height="400"
    >
      <template #default="{ item }">
        <div class="list-item">{{ item }}</div>
      </template>
    </l-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const listRef = ref();
const scrollToItem = (index: number) => {
  listRef.value?.scrollToIndex(index);
};
</script>
```

## 最佳实践

1. 固定高度场景

   - 使用固定的 itemSize 可以获得最佳性能
   - 适用于列表项内容结构统一的场景

2. 动态高度场景

   - 确保 itemSize 函数返回准确的高度
   - 考虑缓存高度计算结果
   - 适当增加 buffer 值以提升滚动体验

3. 大数据量场景

   - 建议数据量在 1000-100000 条之间
   - 可以通过动态加载数据来优化初始加载性能
   - 考虑使用防抖/节流来处理频繁的数据更新

4. 性能优化建议
   - 避免在列表项中使用复杂的计算或大量的子组件
   - 使用 computed 或 memo 缓存不经常变化的数据
   - 适当使用 v-show 代替 v-if 来避免不必要的重渲染
