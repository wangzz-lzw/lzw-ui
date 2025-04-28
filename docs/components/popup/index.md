<script setup>
import demo from './index.vue'
</script>

# Popup 弹出层

<preview comp-name="popup" demo-name="index">
  <demo/>
</preview>

## API

### Props

| 属性名     | 类型                                               | 默认值   | 说明                |
| ---------- | -------------------------------------------------- | -------- | ------------------- |
| modelValue | boolean                                            | false    | 控制弹出层显示/隐藏 |
| placement  | 'top' \| 'bottom' \| 'left' \| 'right' \| 'center' | 'center' | 弹出位置            |
| trigger    | 'click' \| 'hover'                                 | 'hover'  | 触发方式            |

### Events

| 事件名            | 说明                     | 参数             |
| ----------------- | ------------------------ | ---------------- |
| update:modelValue | 弹出层显示状态变化时触发 | (value: boolean) |
