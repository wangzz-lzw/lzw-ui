import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  ExtractPropTypes,
  watch,
} from "vue";
import { useThrottleFn } from "@vueuse/core";
import { useNamespace } from "@lzwui/utils";
export const bem = useNamespace("virtual-list");

export const virtualListProps = {
  // 列表数据
  data: {
    type: Array as () => any[],
    required: true,
    default: () => [],
  },
  // 项目高度，可以是固定值或函数
  itemSize: {
    type: [Number, Function] as unknown as () =>
      | number
      | ((index: number) => number),
    required: true,
  },
  // 缓冲区大小（上下额外渲染的项目数量）
  buffer: {
    type: Number,
    default: 10, // 增加默认缓冲区大小
  },
  // 节流时间
  throttleTime: {
    type: Number,
    default: 16, // 降低节流时间，提高响应性
  },
  // 容器高度
  height: {
    type: [String, Number],
    default: "100%",
  },
} as const;

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>;

export const VirtualList = virtualListProps;

export function useVirtualList(props: VirtualListProps) {
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  const startIndex = ref(0);
  const endIndex = ref(0);
  const containerHeight = ref(0);
  const itemPositions = ref<{ top: number; bottom: number; height: number }[]>(
    []
  );

  // 获取项目高度
  const getItemSize = (index: number): number => {
    return typeof props.itemSize === "number"
      ? props.itemSize
      : props.itemSize(index);
  };

  // 初始化或更新项目位置信息
  const initItemPositions = () => {
    let top = 0;
    itemPositions.value = props.data.map((_, index) => {
      const height = getItemSize(index);
      const position = {
        top,
        bottom: top + height,
        height,
      };
      top += height;
      return position;
    });
  };

  // 监听数据变化，更新位置信息
  watch(() => props.data.length, initItemPositions, { immediate: true });

  // 计算总高度
  const totalHeight = computed(() => {
    return itemPositions.value.length > 0
      ? itemPositions.value[itemPositions.value.length - 1].bottom
      : 0;
  });

  // 二分查找获取滚动位置对应的索引
  const binarySearch = (scrollTop: number): number => {
    let start = 0;
    let end = itemPositions.value.length - 1;
    let mid = 0;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      const midValue = itemPositions.value[mid];

      if (midValue.bottom === scrollTop) {
        return mid + 1;
      } else if (midValue.bottom < scrollTop) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return start;
  };

  // 计算可见区域的项目范围
  const calculateRange = () => {
    if (!containerRef.value || itemPositions.value.length === 0) return;

    const currentScrollTop = scrollTop.value;
    const visibleCount = Math.ceil(
      containerHeight.value /
        (typeof props.itemSize === "number" ? props.itemSize : 50)
    );

    // 使用二分查找找到起始索引
    const newStartIndex = Math.max(
      0,
      binarySearch(currentScrollTop) - props.buffer
    );

    // 计算结束索引，确保有足够的项目渲染
    const newEndIndex = Math.min(
      props.data.length - 1,
      newStartIndex + visibleCount + props.buffer * 2
    );

    startIndex.value = newStartIndex;
    endIndex.value = newEndIndex;
  };

  // 可见数据
  const visibleData = computed(() => {
    return props.data.slice(startIndex.value, endIndex.value + 1);
  });

  // 容器样式
  const containerStyle = computed(() => ({
    height:
      typeof props.height === "number" ? `${props.height}px` : props.height,
    position: "relative" as const,
    overflow: "auto",
    willChange: "transform",
  }));

  // 幽灵层样式
  const phantomStyle = computed(() => ({
    height: `${totalHeight.value}px`,
    position: "absolute" as const,
    left: 0,
    top: 0,
    right: 0,
    zIndex: -1,
  }));

  // 内容样式
  const contentStyle = computed(() => {
    if (itemPositions.value.length === 0) return {};
    return {
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: `${itemPositions.value[startIndex.value]?.top || 0}px`,
      minHeight: "100%",
    };
  });

  // 渲染列表
  const renderList = computed(() =>
    visibleData.value.map((item, index) => {
      const actualIndex = startIndex.value + index;
      const itemPosition = itemPositions.value[actualIndex];
      return {
        data: item,
        index: actualIndex,
        style: {
          height: `${itemPosition?.height || getItemSize(actualIndex)}px`,
          width: "100%",
          boxSizing: "border-box" as const,
        },
      };
    })
  );

  // 更新容器高度
  const updateContainerHeight = () => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight;
      calculateRange();
    }
  };

  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (!containerRef.value || index < 0 || index >= props.data.length) return;

    const targetPosition = itemPositions.value[index];
    if (targetPosition) {
      containerRef.value.scrollTop = targetPosition.top;
    }
  };

  // 节流处理滚动事件
  const throttledScroll = useThrottleFn((e: Event) => {
    if (!containerRef.value) return;

    const target = e.target as HTMLElement;
    const newScrollTop = target.scrollTop;

    if (newScrollTop !== scrollTop.value) {
      scrollTop.value = newScrollTop;
      calculateRange();
    }
  }, props.throttleTime);

  // 处理滚动事件
  const handleScroll = (e: Event) => {
    if (!e.target) return;
    throttledScroll(e);
  };

  // 组件挂载时初始化
  onMounted(() => {
    if (containerRef.value) {
      updateContainerHeight();
      containerRef.value.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    window.addEventListener("resize", updateContainerHeight, { passive: true });
    initItemPositions();
  });

  // 组件卸载时清理
  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener("scroll", handleScroll);
    }
    window.removeEventListener("resize", updateContainerHeight);
  });

  return {
    containerRef,
    containerStyle,
    phantomStyle,
    contentStyle,
    renderList,
    handleScroll,
    scrollToIndex,
    visibleData,
    startIndex,
    totalHeight,
  };
}
