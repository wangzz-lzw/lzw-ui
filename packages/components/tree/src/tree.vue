<template>
    <div class="t-tree">
        <TreeNode showCheckbox v-for="node in treeData" :key="node.id" :node="node" v-bind="$attrs"
            @handleClickNode="emits('handleClickNode', $event)" @changeCheckStatus="changeCheckStatus">
        </TreeNode>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
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
        nodeKey: {
            type: String,
            default: "id",
        },
    }
);
const emits = defineEmits([
    'handleClickNode', 'onSelectedChange'
]);
const treeData = ref<TreeNodeProps[]>([]);

watch(
    () => props.data,
    (newValue) => (treeData.value = newValue),
    { immediate: true }
);
const changeAllCheckStatus = (node: TreeNodeProps) => {
    node.isChecked = !node.isChecked;
    if (node.children && node.children.length) {
        changeChildCheckStatus(node.children, node.isChecked); // 更改子级所有节点状态
    }
    changeParentCheckStatus(treeData.value, node[props.nodeKey as keyof TreeNodeProps] as string); // 更改父级所有节点状态
};
const changeCheckStatus = (node: TreeNodeProps) => {
    findNode(treeData.value, node[props.nodeKey as keyof TreeNodeProps] as string, changeAllCheckStatus);
};

const changeParentCheckStatus = (data: TreeNodeProps[], id: string, parent?: TreeNodeProps) => {
    for (let item of data) {
        if (item.id === id) {
            // 是否当前节点的所有子节点都选中
            const result = data.every((item) => item.isChecked === true);
            if (parent && parent.isChecked === result) {
                // 如果父级跟需要改变的结果一致，则不需要再往上找了
                break;
            } else if (parent && parent.isChecked !== result) {
                parent.isChecked = result;
                parent && changeParentCheckStatus(treeData.value, parent.id);
            }
        } else if (item.children && item.children.length) {
            changeParentCheckStatus(item.children, id, item);
        }
    }
};


const findNode = (data: TreeNodeProps[], id: string, handleFun: (node: TreeNodeProps) => void): TreeNodeProps | null => {
    let obj = null;
    for (let item of data) {
        if (item.id === id) {
            obj = item;
            handleFun(item);
            break;
        } else if (item.children && item.children.length) {
            const res: TreeNodeProps | null = findNode(item.children, id, handleFun);
            if (res) obj = res;
        }
    }
    return obj;
};


// 修改子级的选中状态
const changeChildCheckStatus = (children: TreeNodeProps[], isChecked: boolean) => {
    children.forEach((node: TreeNodeProps) => {
        node.isChecked = isChecked;
        if (node.children && node.children.length) changeChildCheckStatus(node.children, isChecked);
    });
};

const getCheckedNodes = () => {
    const checkedNodes: TreeNodeProps[] = [];
    getChecked(treeData.value, checkedNodes);
    return checkedNodes.map((item) => item[props.nodeKey as keyof TreeNodeProps]);
};

const getChecked = (data: TreeNodeProps[], checkedNodes: TreeNodeProps[]) => {
    for (let item of data) {
        if (item.isChecked) {
            checkedNodes.push(item);
        }
        if (item.children && item.children.length) {
            getChecked(item.children, checkedNodes);
        }
    }
};
const setCheckedNodes = (keys: string[]) => {
    setChecked(treeData.value, keys);
    keys.forEach((key) => {
        changeParentCheckStatus(treeData.value, key); // 更改父级所有节点状态
    });
};

const setChecked = (data: TreeNodeProps[], keys: string[]) => {
    for (let item of data) {
        if (keys.includes(item[props.nodeKey as keyof TreeNodeProps] as string)) {
            item.isChecked = true;
        }
        if (item.children && item.children.length) {
            setChecked(item.children, keys);
        }
    }
};
defineExpose({
    getCheckedNodes,
    setCheckedNodes
});
</script>

<style scoped lang="scss"></style>
