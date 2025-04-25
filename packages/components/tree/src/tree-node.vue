<template>
    <div class="t-tree-node">
        <div class="t-tree-node__content" @click.stop="handleClickNode($event, node)">
            <div class="t-icon icon-tubiao" :style="{
                visibility: node.children && node.children.length ? 'visible' : 'hidden',
                transform: showChild ? 'rotateZ(90deg)' : '',
            }" @click="showChild = !showChild"></div>
            <t-checkbox v-model="checked" @click.stop="onSelectedChange"></t-checkbox>
            <span class="t-tree-node__label">{{ node.label }}</span>
        </div>
        <!-- children -->
        <div class="t-tree-node__children" v-show="showChild">
            <t-tree-node v-for="child in node.children" :key="child.id" :node="child"
                @handleClickNode="emits('handleClickNode', $event)" @onSelectedChange="onSelectedChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { TreeNodeProps } from './tree-node'
defineOptions({
    name: "t-tree-node"
})

const props = defineProps(
    {
        node: {
            type: Object as PropType<TreeNodeProps>,
            default: () => ({

            })
        }
    }
);

const showChild = ref(false);

const checked = ref(false);

const emits = defineEmits(["handleClickNode", "onSelectedChange"])
const handleClickNode = (e: Event, node: TreeNodeProps) => {
    showChild.value = !showChild.value;
    emits("handleClickNode", {
        ...node,
        $event: e, // 这边是携带上原生的事件对象，方便外部使用
    });
};

const onSelectedChange = () => {
    console.log('props', props.node);
    emits('onSelectedChange', {
        node: props.node,
        checked: checked.value
    })
}

</script>

<style scoped lang="scss"></style>
