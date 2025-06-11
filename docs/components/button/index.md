<script setup>
import demo1 from './demo.vue'
</script>

# Button 按钮

<preview comp-name="button" demo-name="demo">
  <demo1/>
</preview>

# props

## 自动部署测试

| 参数 | 说明                                                                    | 类型   | 默认值    |
| ---- | ----------------------------------------------------------------------- | ------ | --------- |
| type | 按钮类型，可选值为 `primary` `success` `warning` `danger` `info` `text` | string | `default` |
| size | 按钮大小，可选值为 `small` `mini` `defualt`                             | string | `default` |
| icon | 按钮图标，支持设置图标类型，例如：`icon="search"`                       | string | -         |
