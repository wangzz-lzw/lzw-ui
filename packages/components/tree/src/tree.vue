<template>
    <div class="t-tree">
        <TreeNode v-for="node in props.data" :key="node.id" :node="node"
            @handleClickNode="emits('handleClickNode', $event)" @onSelectedChange="onSelectedChange">
        </TreeNode>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { TreeNodeProps } from './tree-node'
import type { PropType } from 'vue'
import TreeNode from './tree-node.vue'
const props = defineProps(
    {
        data: {
            type: Array as PropType<TreeNodeProps[]>,
            default: () => []
        },
        showCheckbox: {
            type: Boolean,
            default: false,
        },
        selectedList: {
            type: Array,
            default: () => []
        }
    }
);
const emits = defineEmits([
    'handleClickNode', 'onSelectedChange'
]);
watch(() => props.data,
    (newVal) => {
        console.log(newVal);
    },
    { immediate: true }
);

const onSelectedChange = ({ node }: { node: TreeNodeProps }) => {
    console.log(node, 'node');
    const index = props.selectedList.findIndex((item: any) => item.id === node.id)
    if (index !== -1) {
        props.selectedList.splice(index, 1);
        console.log(props.selectedList, 'selectedList');
        emits('onSelectedChange', props.selectedList);
    } else {
        console.log(props.selectedList, 'selectedList2');
        props.selectedList.push(node)
        emits('onSelectedChange', props.selectedList);
    }
}
</script>

<style scoped lang="scss"></style>
