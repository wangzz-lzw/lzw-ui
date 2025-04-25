<template>
    <t-button @click="getCheckedNodes" type="primary">获取选中的key</t-button>
    <div style="margin-top: 15px;">
        <t-tree ref="treeRef" :data="treeData" showCheckbox @handleClickNode="handleClickNode" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const treeData = [
    {
        id: "1",
        label: "Level one 1",
        children: [
            {
                id: "1-1",
                label: "Level two 1-1",
                children: [
                    {
                        id: "1-1-1",
                        label: "Level three 1-1-1",
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        label: "Level one 2",
        children: [
            {
                id: "2-1",
                label: "Level two 2-1",
                children: [
                    {
                        id: "2-1-1",
                        label: "Level three 2-1-1",
                    },
                ],
            },
            {
                id: "2-2",
                label: "Level two 2-2",
                children: [
                    {
                        id: "2-2-1",
                        label: "Level three 2-2-1",
                    },
                ],
            },
        ],
    },
    {
        id: "3",
        label: "Level one 3",
        children: [
            {
                id: "3-1",
                label: "Level two 3-1",
                children: [
                    {
                        id: "3-1-1",
                        label: "Level three 3-1-1",
                    },
                ],
            },
            {
                id: "3-2",
                label: "Level two 3-2",
                children: [
                    {
                        id: "3-2-1",
                        label: "Level three 3-2-1",
                    },
                ],
            },
            {
                id: "3-3",
                label: "Level two 3-3",
            },
        ],
    },
];
import type { Ref } from 'vue';

interface TreeComponent {
    getCheckedNodes: () => any[];
}

const treeRef: Ref<TreeComponent | null> = ref(null);
const handleClickNode = (e: Event, node: any) => {
    // console.log(e, node);
    console.log(node, 'node')
};

const getCheckedNodes = () => {
    const keys = treeRef.value!.getCheckedNodes();
    console.log(keys, 'keys')
}
</script>
