import { useNamespace } from "@lzwui/utils";

export const bem = useNamespace("option");


export interface  OptionProps {
  value: string | number
  label?: string
  disabled?: boolean
}