import { useNamespace } from "@lzwui/utils";
import type { PropType } from 'vue';

export const bem = useNamespace("date-picker");

export type DatePickerType = 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'year' | 'month';

export interface DatePickerProps {
  modelValue?: Date | string | number;
  type?: DatePickerType;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export const datePickerProps = {
  modelValue: {
    type: [Date, String, Number] as PropType<Date | string | number>,
    default: undefined
  },
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date' as const,
    validator: (value: string): boolean => 
      ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].includes(value)
  },
  format: {
    type: String,
    default: (props: DatePickerProps): string => {
      switch (props.type) {
        case 'date': return 'YYYY-MM-DD';
        case 'datetime': return 'YYYY-MM-DD HH:mm:ss';
        case 'year': return 'YYYY';
        case 'month': return 'MM';
        default: return '';
      }
    }
  },
  placeholder: {
    type: String,
    default: (props: DatePickerProps): string => {
      switch (props.type) {
        case 'date': return '请选择日期';
        case 'datetime': return '请选择日期时间';
        case 'daterange': return '请选择日期范围';
        case 'datetimerange': return '请选择日期时间范围';
        case 'year': return '请选择年份';
        case 'month': return '请选择月份';
        default: return '';
      }
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
};
