import { useNamespace } from "@lzwui/utils";
import type { ExtractPropTypes,PropType } from "vue";

export const bem = useNamespace("table");

export const tableProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  border: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    values: ["large", "default", "small"],
    default: "default",
  },
  fit: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  rowClassName: {
    type: Function,
  },
  rowStyle: {
    type: Function,
  },
  cellClassName: {
    type: Function,
  },
  cellStyle: {
    type: Function,
  },
  headerRowClassName: {
    type: Function,
  },
  headerRowStyle: {
    type: Function,
  },
  headerCellClassName: {
    type: Function,
  },
  headerCellStyle: {
    type: Function,
  },
  sortBy: {
    type: String,
    default: '',
  },
  sortOrders: {
    type: Array,
    default: () => ['ascending', 'descending', null],
  },
  defaultSort: {
    type: Object,
    default: () => ({
      prop: '',
      order: '',
    }),
  },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;;

export interface TableColumn {
  prop: string;
  label: string;
  sortable?: boolean;
  sortMethod?: (a: any, b: any) => number;
  sortBy?: string | string[];
}
