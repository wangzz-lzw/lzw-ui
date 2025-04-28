import { PropType } from 'vue'

export interface PopupProps {
  modelValue: boolean
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  zIndex?: number
  mask?: boolean
  maskClosable?: boolean
}

export const propsDefinition = {
  modelValue: {
    type: Boolean as PropType<PopupProps['modelValue']>,
    default: false
  },
  position: {
    type: String as PropType<PopupProps['position']>,
    default: 'center'
  },
  zIndex: {
    type: Number as PropType<PopupProps['zIndex']>,
    default: 1000
  },
}
