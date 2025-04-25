<script setup>
import demo from './index.vue'
</script>

# Tree 树

<preview comp-name="tree" demo-name="index">
  <demo/>
</preview>

## props

| 参数     | 说明       | 类型   | 可选值 | 默认值 |
| -------- | ---------- | ------ | ------ | ------ |
| data     | 数据源     | Array  | -      | -      |
| label    | 节点名称   | String | -      | -      |
| children | 子节点名称 | String | -      | -      |

## 事件

| 事件名称        | 说明     | 回调参数 |
| --------------- | -------- | -------- |
| handleClickNode | 点击节点 | -        |

## expose

| 方法名称        | 说明         | 回调参数 |
| --------------- | ------------ | -------- |
| getCheckedNodes | 获取选中节点 | -        |
| setCheckedNodes | 设置选中节点 | -        |
