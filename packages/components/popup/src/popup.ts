import { PropType } from 'vue'

export interface PopupProps {
  modelValue: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right',
  trigger?: 'click' | 'hover' |'manual',
  zIndex?: number,
  disabled:boolean
}

export const propsDefinition = {
  modelValue: {
    type: Boolean as PropType<PopupProps['modelValue']>,
    default: false
  },
  placement: {
    type: String as PropType<PopupProps['placement']>,
    default: 'bottom'
  },
  zIndex: {
    type: Number as PropType<PopupProps['zIndex']>,
    default: 1000
  },
  trigger: {
    type: String as PropType<PopupProps['trigger']>,
    default: 'click'
  },
  disabled: {
    type: Boolean as PropType<PopupProps['disabled']>,
    default: false
  },
}
