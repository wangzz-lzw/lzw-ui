import { PropType } from "vue";

import { useNamespace } from '@lzwui/utils'


export const bem = useNamespace('button')
export interface ButtonProps {
  type?: "primary" | "success" | "warning" | "info" | "danger";
  size?: "" | "small" | "mini";
  round?: boolean;
  disabled?: boolean;
  circle?: boolean;
}

export const buttonProps= {
  // 类型
  type: {
    type: String as PropType<ButtonProps['type']>,
    default: "default",
  },
  // 尺寸
  size: {
    type: String as PropType<ButtonProps['size']>,
    default: "",
  },
  // 圆角
  round: {
    type: Boolean,
    default: false,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  }
};

