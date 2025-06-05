<template>
    <Teleport to="body" v-if="modelValue">
        <div class="t-model__mask" @click="handleClose"></div>
        <div class="t-model">
            <div class="t-model__header">
                <div class="t-model__header-title">
                    <slot name="title" v-if="$slots.title">
                    </slot>
                    <span v-else>{{ title }}</span>
                </div>
                <div class="t-model__header-close">
                    <span class="t-icon icon-close" @click="handleClose"></span>
                </div>
            </div>
            <div class="t-model__body">
                <slot></slot>
            </div>
            <div class="t-model__footer">
                <slot name="footer" v-if="$slots.footer"></slot>
                <div v-else>
                    <t-button @click="handleClose" type="secondary">取消</t-button>
                    <t-button type="primary" @click="handleClose">确定</t-button>
                </div>
            </div>
        </div>
    </Teleport>

</template>

<script setup lang="ts">
import { propsDefinition } from './model';
defineOptions({
    name: "t-model"
});

defineProps(propsDefinition)

const emits = defineEmits(["update:modelValue"]);

const handleClose = () => {
    emits("update:modelValue", false);
};

const handleOpen = () => {
    emits("update:modelValue", true);
};


defineExpose({
    handleClose,
    handleOpen,
});
</script>

<style scoped lang="scss"></style>
