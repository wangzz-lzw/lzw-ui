<template>
    <div class="icon-showcase">
        <h2>图标集合</h2>

        <div class="search-box">
            <t-input v-model="searchText" placeholder="搜索图标名称" clearable size="large">
                <template #prefix>
                    <t-icon name="search" />
                </template>
            </t-input>
        </div>

        <div class="icon-categories">
            <div v-for="category in filteredCategories" :key="category.name" class="category">
                <h3>{{ category.name }}</h3>
                <div class="icon-grid">
                    <div v-for="icon in category.icons" :key="icon" class="icon-item" @click="copyIconName(icon)">
                        <div class="icon-wrapper">
                            <t-icon :name="icon" size="24" />
                        </div>
                        <div class="icon-name">{{ icon }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import { message } from '@lzwui/components/message'

const iconCategories = ref([])

// 从scss文件中提取的图标列表
const allIcons = [
    'bread-filled', 'chevron-up-rectangle', 'edit-off', 'gesture-left-slip',
    'bridge-2-filled', 'chevron-up-s', 'edit-2-filled', 'gesture-open-filled',
    'bridge-3', 'chili-filled', 'edit-off-filled', 'gesture-pray',
    'bridge-1', 'chicken', 'education', 'gesture-left-slip-filled',
    'bridge', 'chimney', 'education-filled', 'gesture-open',
    'bridge-4', 'chili', 'ellipsis', 'fries',
    'bridge-5-filled', 'chimney-2', 'eggplant-filled', 'gesture-press',
    'bridge-6-filled', 'chimney-1', 'emo-emotional', 'gesture-pray-filled',
    'bridge-1-filled', 'chimney-2-filled', 'eggplant', 'gesture-ranslation-filled',
    'bridge-2', 'chimney-filled', 'emo-emotional-filled', 'gesture-ranslation',
    'bridge-5', 'chimney-1-filled', 'enter', 'gesture-press-filled',
    'bridge-6', 'church', 'equal', 'gesture-right-filled',
    'brightness', 'circle', 'error', 'gesture-right-slip',
    'brightness-1-filled', 'church-filled', 'error-circle', 'gesture-right-slip-filled',
    'brightness-1', 'circle-filled', 'error-circle-filled', 'gesture-slide-up-filled',
    'broccoli-filled', 'city', 'error-triangle', 'gesture-slide-up',
    'brightness-filled'
]

// 分类图标
onMounted(() => {
    iconCategories.value = [
        {
            name: '基础图标',
            icons: allIcons.filter(icon =>
                ['check', 'close', 'search', 'loading', 'arrow-up', 'arrow-down',
                    'arrow-left', 'arrow-right', 'plus', 'minus'].includes(icon)
            )
        },
        {
            name: '状态图标',
            icons: allIcons.filter(icon =>
                ['info', 'success', 'warning', 'error', 'question'].includes(icon)
            )
        },
        {
            name: '全部图标',
            icons: allIcons
        }
    ]
})

const searchText = ref('')

const filteredCategories = computed(() => {
    return iconCategories.value.map(category => {
        const filteredIcons = category.icons.filter(icon =>
            icon.toLowerCase().includes(searchText.value.toLowerCase())
        )
        return {
            name: category.name,
            icons: filteredIcons
        }
    }).filter(category => category.icons.length > 0)
})

const { copy } = useClipboard()

const copyIconName = (iconName) => {
    copy(`<t-icon name="${iconName}" />`)
    message.success(`已复制: ${iconName}`)
}
</script>

<style scoped>
.icon-showcase {
    padding: 20px;
}

.search-box {
    margin-bottom: 24px;
    max-width: 400px;
}

.icon-categories {
    margin-top: 24px;
}

.category {
    margin-bottom: 32px;
}

.category h3 {
    margin-bottom: 16px;
    font-weight: 500;
    color: var(--color-text-1);
}

.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
}

.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--color-border-2);
}

.icon-item:hover {
    background-color: var(--color-fill-2);
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-light);
}

.icon-wrapper {
    margin-bottom: 8px;
}

.icon-name {
    font-size: 13px;
    color: var(--color-text-2);
    text-align: center;
    word-break: break-all;
}
</style>
