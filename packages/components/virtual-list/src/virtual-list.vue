<template>
    <div :class="[bem.b()]" ref="containerRef" @scroll="handleScroll" style="height: 100%; overflow-y: auto;">
        <div :style="{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }">
            <div v-for="(item, index) in visibleData" :key="index" :class="[bem.e('item')]"
                :style="{ height: `${itemSize}px` }">
                <slot :item="item" :index="startIndex + index" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bem, VirtualList, useVirtualList } from './virtual-list';
defineOptions({
    name: 't-virtual-list'
})
const props = defineProps(VirtualList);
const emits = defineEmits();

const {
    containerRef,
    visibleData,
    paddingTop,
    paddingBottom,
    handleScroll
} = useVirtualList(props);
</script>

<style scoped lang="scss">
@use '@lzwui/theme-chalk/components/virtual-list.scss';
</style>
