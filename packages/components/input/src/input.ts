import { useNamespace } from "@lzwui/utils";


export const bem = useNamespace("input");



export interface InputProps {
    modelValue: string;
    type?: string;
    size?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    maxlength?: number;
    clearable?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    error?: string;
    onClear?: () => void;
    onInput?: (value: string) => void;
}

export const inputProps = {
    modelValue: {
        type: String,
        default: "",
    },
    // 类型
    type: {
        type: String,
        default: "text",
    }
    // 尺寸
    , size: {
        type: String,
        default: "",
    }
    // 占位符
    , placeholder: {
        type: String,
        default: "",
    }
    // 是否禁用
    , disabled: {
        type: Boolean,
        default: false,
    }
    // 是否只读
    , readonly: {
        type: Boolean,
        default: false,
    }
    // 最大长度
    , maxlength: {
        type: Number,
        default: null,
    }
    // 是否可清除
    , clearable: {
        type: Boolean,
        default: false,
    }
    // 前缀图标
    , prefixIcon: {
        type: String,
        default: "",
    }
    // 后缀图标
    , suffixIcon: {
        type: String,
        default: "",
    }
    // 错误信息
    , error: {
        type: String,
        default: "",
    }
    // 清除事件
    , onClear: {
        type: Function,
        default: null,
    }
    // 输入事件
    , onInput: {
        type: Function,
        default: null,
    }
}