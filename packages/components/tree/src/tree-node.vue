<template>
    <div class="t-tree-node">
        <div class="t-tree-node__content" @click.stop="handleClickNode($event, node)">
            <div class="t-icon icon-tubiao" :style="{
                visibility: node.children && node.children.length ? 'visible' : 'hidden',
                transform: showChild ? 'rotateZ(90deg)' : '',
            }" @click="showChild = !showChild"></div>
            <t-checkbox v-model="checked" v-if="showCheckbox" @click.stop="changeCheckStatus(node)"
                :class="getCheckType"></t-checkbox>
            <span class="t-tree-node__label">{{ node.label }}</span>
        </div>
        <!-- children -->
        <div class="t-tree-node__children" v-show="showChild">
            <t-tree-node v-for="child in node.children" :key="child.id" :node="child" :showCheckbox="showCheckbox"
                @handleClickNode="emits('handleClickNode', $event)"
                @changeCheckStatus="emits('changeCheckStatus', $event)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue'
import type { TreeNodeProps } from './tree-node'
defineOptions({
    name: "t-tree-node"
})

const props = defineProps(
    {
        node: {
            type: Object as PropType<TreeNodeProps>,
            default: () => ({
                id: "",
                label: "",
                showChild: false,
                children: [],
            })
        },
        showCheckbox: {
            type: Boolean,
            default: false,
        }
    }
);

const showChild = ref(false);

const checked = ref(false);

const emits = defineEmits(["handleClickNode", "changeCheckStatus"])
const handleClickNode = (e: Event, node: TreeNodeProps) => {
    showChild.value = !showChild.value;
    emits("handleClickNode", {
        ...node,
        $event: e, // 这边是携带上原生的事件对象，方便外部使用
    });
};

const getCheckType = computed(() => {
    let checkType = "";
    if (props.node.isChecked) {
        checkType = "all";
    } else if (props.node.children && props.node.children.every((item) => item.isChecked === true)) {
        checkType = "all";
    } else if (props.node.children && props.node.children.some((item) => item.isChecked === true)) {
        checkType = "some";
    } else {
        checkType = "none";
    }
    return checkType;
});

const changeCheckStatus = (node: TreeNodeProps) => {
    emits("changeCheckStatus", node)
};


</script>

<style scoped lang="scss"></style>
