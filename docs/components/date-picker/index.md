<script setup>
import demo from './demo.vue'
</script>

# Date Picker 日期选择器

<preview comp-name="date-picker" demo-name="demo">
  <demo/>
</preview>

## 说明

日期选择器组件用于让用户选择一个日期或日期范围。支持多种日期格式和选择模式。

## 基础用法

展示最基本的日期选择器用法。

## props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定的日期值 | Date \| string \| number | - |
| type | 选择器类型，可选值为 `date` `daterange` `datetime` `datetimerange` `year` `month` | string | `date` |
| format | 显示在输入框中的日期格式 | string | 根据type自动调整 |
| placeholder | 非范围选择时的占位内容 | string | 根据type自动调整 |
| disabled | 是否禁用 | boolean | `false` |
| clearable | 是否显示清除按钮 | boolean | `true` |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 当选择的日期值发生变化时触发 | 被选择的日期值 |
| change | 当日期值发生改变时触发（无论是用户选择还是程序设置） | 被选择的日期值 |