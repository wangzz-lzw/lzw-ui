<template>
    <div ref="containerRef" :class="[bem.b()]" :style="containerStyle" @scroll="handleScroll">
        <!-- 幽灵层，用于撑开滚动区域 -->
        <div :class="[bem.e('phantom')]" :style="phantomStyle" />

        <!-- 实际内容区域 -->
        <div :class="[bem.e('content')]" :style="contentStyle">
            <div v-for="{ data, index, style } in renderList" :key="index" :style="style" :class="[bem.e('item')]">
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

<style></style>