<script setup>
import demo from './index.vue'
</script>

# Popup 弹出层

<preview comp-name="popup" demo-name="index">
  <demo/>
</preview>

## API

### Props
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | boolean | false | 控制弹出层显示/隐藏 |
| position | 'top' \| 'bottom' \| 'left' \| 'right' \| 'center' | 'center' | 弹出位置 |
| zIndex | number | 1000 | 弹出层z-index |
| mask | boolean | true | 是否显示遮罩 |
| maskClosable | boolean | true | 点击遮罩是否可关闭 |

### Events
| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 弹出层显示状态变化时触发 | (value: boolean) |

### Methods
| 方法名 | 说明 | 参数 |
|--------|------|------|
| handleOpen | 打开弹出层 | - |
| handleClose | 关闭弹出层 | - |
