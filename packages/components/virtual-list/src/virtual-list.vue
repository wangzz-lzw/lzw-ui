<template>
    <div ref="containerRef" :class="[bem.b(), 'virtual-list-container']" :style="containerStyle" @scroll="handleScroll">
        <!-- 幽灵层，用于撑开滚动区域 -->
        <div :class="[bem.e('phantom'), 'virtual-list-phantom']" :style="phantomStyle" />

        <!-- 实际内容区域 -->
        <div :class="[bem.e('content'), 'virtual-list-content']" :style="contentStyle">
            <div v-for="{ data, index, style } in renderList" :key="index" :style="style"
                :class="[bem.e('item'), 'virtual-list-item']">
                <slot :item="data" :index="index" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useNamespace } from '@lzwui/utils'
import { useVirtualList, virtualListProps, bem } from './virtual-list'
defineOptions({
    name: 'VirtualList',
})
const props = defineProps(virtualListProps)
const bem = useNamespace('virtual-list')
const {
    containerRef,
    containerStyle,
    phantomStyle,
    contentStyle,
    renderList,
    handleScroll,
    scrollToIndex
} = useVirtualList(props)

</script>

<style>
.virtual-list-container {
    position: relative;
    overflow: auto;
    will-change: transform;
    -webkit-overflow-scrolling: touch;
    /* 增加iOS滚动流畅度 */
}

.virtual-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    pointer-events: none;
    /* 防止幽灵层捕获事件 */
}

.virtual-list-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100%;
    contain: paint;
    /* 提高渲染性能 */
}

.virtual-list-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    contain: layout;
    /* 提高布局性能 */
}
</style>