import { useNamespace } from "@lzwui/utils";


export const bem = useNamespace("switch");


export const switchProps = {
    modelValue: Boolean,
    size: String,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
        type: [String, Number, Boolean],
        default: true,
    },
    inactiveValue: {
        type: [String, Number, Boolean],
        default: false,
    },
    name: String,
    validateTrigger: {
        type: String,
        default: "change",
    },
    validateRules: {
        type: Array,
        default: () => [],
    },
    validateMessages: {
        type: Object,
        default: () => ({}),
    },
    onChange: {
        type: Function,
        default: () => () => {},
    }
}