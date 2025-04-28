<script setup>
import demo from './index.vue'
</script>

# Select 选择器

<preview comp-name="select" demo-name="index">
  <demo/>
</preview>
## API

### Select Props

| 参数        | 说明       | 类型                | 默认值   |
| ----------- | ---------- | ------------------- | -------- |
| v-model     | 绑定值     | string/number/array | -        |
| multiple    | 是否多选   | boolean             | false    |
| disabled    | 是否禁用   | boolean             | false    |
| clearable   | 是否可清空 | boolean             | false    |
| size        | 尺寸       | 'small' \| 'mini'   | -        |
| placeholder | 占位文本   | string              | '请选择' |

### Option Props

| 参数     | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | string/number | -      |
| label    | 选项的标签     | string        | -      |
| disabled | 是否禁用该选项 | boolean       | false  |
