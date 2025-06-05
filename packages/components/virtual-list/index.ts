import { withInstall } from "@lzwui/utils";
import VirtualList from "./src/virtual-list.vue";

export const TVirtualList = withInstall(VirtualList);
export default TVirtualList;

export * from "./src/virtual-list";
export type { VirtualListInstance } from "./src/virtual-list.d";

// 组件类型声明
declare module "vue" {
  export interface GlobalComponents {
    LVirtualList: typeof TVirtualList;
  }
}
