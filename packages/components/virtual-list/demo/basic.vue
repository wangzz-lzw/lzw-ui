<template>
    <div class="virtual-list-demo">
        <h3>基础用法（10万条数据）</h3>
        <div class="control-panel">
            <l-button @click="scrollToRandom">滚动到随机位置</l-button>
            <l-button @click="scrollToTop">回到顶部</l-button>
            <l-button @click="addItems">添加数据</l-button>
        </div>
        <div class="list-container">
            <l-virtual-list ref="basicListRef" :data="listData" :item-size="50" :height="400" :buffer="30">
                <template #default="{ item, index }">
                    <div class="list-item">
                        <span class="item-index">{{ index }}</span>
                        <span class="item-content">{{ item }}</span>
                    </div>
                </template>
            </l-virtual-list>
        </div>

        <h3>动态高度（不同内容不同高度）</h3>
        <div class="list-container">
            <l-virtual-list ref="dynamicListRef" :data="dynamicListData" :item-size="getItemSize" :height="400"
                :buffer="30">
                <template #default="{ item, index }">
                    <div class="list-item dynamic-item" :style="{ height: item.height + 'px' }">
                        <span class="item-index">{{ index }}</span>
                        <div class="item-content">
                            <div>{{ item.content }}</div>
                            <div class="item-desc">高度: {{ item.height }}px</div>
                        </div>
                    </div>
                </template>
            </l-virtual-list>
        </div>

        <h3>大数据量测试（100万条数据）</h3>
        <div class="list-container">
            <l-virtual-list ref="largeListRef" :data="largeListData" :item-size="50" :height="400" :buffer="30">
                <template #default="{ item, index }">
                    <div class="list-item">
                        <span class="item-index">{{ index }}</span>
                        <span class="item-content">{{ item }}</span>
                    </div>
                </template>
            </l-virtual-list>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// 基础列表数据 (10万条)
const listData = ref(Array.from({ length: 100000 }, (_, i) => `List Item ${i}`))

// 动态高度列表数据
const dynamicListData = ref(Array.from({ length: 10000 }, (_, i) => ({
    content: `Dynamic Height Item ${i}`,
    height: Math.floor(Math.random() * 100) + 50 // 50-150px随机高度
})))

// 大数据量列表 (100万条)
const largeListData = ref(Array.from({ length: 1000000 }, (_, i) => `Large List Item ${i}`))

// 虚拟列表引用
const basicListRef = ref()
const dynamicListRef = ref()
const largeListRef = ref()

// 获取动态高度
const getItemSize = (index: number) => {
    return dynamicListData.value[index].height
}

// 滚动到随机位置
const scrollToRandom = () => {
    const randomIndex = Math.floor(Math.random() * listData.value.length)
    basicListRef.value?.scrollToIndex(randomIndex)
}

// 滚动到顶部
const scrollToTop = () => {
    basicListRef.value?.scrollToIndex(0)
}

// 添加数据
const addItems = () => {
    const newItems = Array.from(
        { length: 1000 },
        (_, i) => `New Item ${listData.value.length + i}`
    )
    listData.value = [...listData.value, ...newItems]
}

// 性能测试
onMounted(() => {
    console.time('Virtual List Render')
    // 等待下一帧，确保组件已渲染
    requestAnimationFrame(() => {
        console.timeEnd('Virtual List Render')
    })
})
</script>

<style scoped>
.virtual-list-demo {
    padding: 20px;
}

.control-panel {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
}

.list-container {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin: 20px 0;
    background: #fff;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #fff;
    transition: background-color 0.2s;
}

.list-item:hover {
    background-color: #f5f7fa;
}

.item-index {
    min-width: 60px;
    color: #909399;
    font-size: 14px;
}

.item-content {
    flex: 1;
    padding: 12px 0;
}

.dynamic-item {
    display: flex;
    align-items: flex-start;
}

.item-desc {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}

h3 {
    margin: 20px 0;
    color: #303133;
    font-weight: 500;
}
</style>