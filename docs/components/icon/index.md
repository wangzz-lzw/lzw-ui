# Icon 图标

<script setup>
import demo from './index.vue'
</script>

## 图标集合

<preview comp-name="icon" demo-name="index">
  <demo/>
</preview>

## API

### Props

| 参数  | 说明     | 类型             | 默认值 | 必填 |
| ----- | -------- | ---------------- | ------ | ---- |
| name  | 图标名称 | string           | -      | 是   |
| size  | 图标大小 | number \| string | 16     | 否   |
| color | 图标颜色 | string           | -      | 否   |
| spin  | 是否旋转 | boolean          | false  | 否   |

### Events

| 事件名 | 说明           | 类型                      |
| ------ | -------------- | ------------------------- |
| click  | 点击图标时触发 | `(e: MouseEvent) => void` |
