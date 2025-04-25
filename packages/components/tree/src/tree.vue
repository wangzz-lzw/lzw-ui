<template>
    <div class="t-tree">
        <TreeNode v-for="node in props.data" :key="node.id" :node="node"
            @handleClickNode="emits('handleClickNode', $event)">
            {{ node.name }}
        </TreeNode>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import TreeNode from './tree-node.vue'
const props = defineProps(
    {
        data: {
            type: Array,
            default: () => []
        },
        showCheckbox: {
            type: Boolean,
            default: false,
        },
    }
);
const emits = defineEmits([
    'handleClickNode'
]);
watch(() => props.data,
    (newVal) => {
        console.log(newVal);
    },
    { immediate: true }
);

</script>

<style scoped lang="scss"></style>
