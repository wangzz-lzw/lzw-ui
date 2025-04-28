import { useNamespace } from "@lzwui/utils";

export const bem = useNamespace("select");



export interface  SelectProps {
    modelValue?: string | number | Array<string | number>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    size?: '' | 'small' | 'mini'
    multiple?: boolean
}
