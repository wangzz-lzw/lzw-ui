import { useNamespace } from "@lzwui/utils";
import { computed, ref } from "vue";

export const bem = useNamespace("virtual-list");
interface VirtualListProps {
    data: any[];
  itemSize: number;
    buffer: number;
    }

export const VirtualList = {
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  itemSize: {
    type: Number,
    default: 36
  },
  buffer: {
    type: Number,
    default: 5
  }
};

export function useVirtualList(props:VirtualListProps) {
  const containerRef = ref(null);
  const scrollTop = ref(0);
  const visibleCount = computed(() => Math.ceil(window.innerHeight / props.itemSize) + props.buffer);
  const startIndex = computed(() => Math.floor(scrollTop.value / props.itemSize));
  const endIndex = computed(() => startIndex.value + visibleCount.value);
  const visibleData = computed(() => props.data.slice(startIndex.value, endIndex.value));
  const paddingTop = computed(() => startIndex.value * props.itemSize);
  const paddingBottom = computed(() => (props.data.length - endIndex.value) * props.itemSize);

  const handleScroll = (e:any) => {
    scrollTop.value = e.target.scrollTop;
  };

  return {
    containerRef,
    visibleData,
    paddingTop,
    paddingBottom,
    handleScroll
  };
}