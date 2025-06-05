import { DefineComponent } from "vue";

export declare const VirtualList: DefineComponent<{
  data: any[];
  itemSize: number | ((index: number) => number);
  buffer?: number;
  throttleTime?: number;
  height?: string | number;
}>;

export interface VirtualListInstance {
  scrollToIndex: (index: number) => void;
}
