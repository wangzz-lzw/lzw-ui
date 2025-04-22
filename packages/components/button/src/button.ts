const BUTTON_TYPE = ["default", "primary", "success", "warning", "info", "danger"];
const BUTTON_SIZE = ["", "small", "mini"];

export const ButtonProps = {
  // 类型
  type: {
    type: String,
    default: "default",
    validator(value : keyof typeof BUTTON_TYPE) {
      return BUTTON_TYPE.includes(value as string);
    },
  },
  // 尺寸
  size: {
    type: String,
    default: "",
    validator(value:keyof typeof BUTTON_SIZE) {
      return BUTTON_SIZE.includes(value as string);
    },
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
};
