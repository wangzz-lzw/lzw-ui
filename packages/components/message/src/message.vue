<template>
    <transition :name="`${bem.b()}--fade`">
        <div v-show="visible" :class="[
            bem.b(),
            bem.m(type),
            {
                [bem.m('center')]: center,
                [bem.m('closable')]: showClose
            }
        ]" :style="{ top: `${offset}px` }" @mouseenter="clearTimer" @mouseleave="startTimer">
            <t-icon :name="iconClass" :class="bem.e('icon')" />
            <div :class="bem.e('content')">
                <slot>
                    <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                    <p v-else v-html="message"></p>
                </slot>
            </div>
            <t-icon v-if="showClose" name="close" :class="bem.e('close')" @click="close" />
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { messageProps } from './message'
import { bem } from './message'
import { TIcon } from '@lzwui/components/icon'

defineOptions({
    name: 't-message'
})
const props = defineProps(messageProps)
const emit = defineEmits(['destroy'])

const visible = ref(false)
const timer = ref<NodeJS.Timeout | null>(null)

const iconClass = computed(() => {
    const iconMap: Record<'success' | 'warning' | 'info' | 'error', string> = {
        success: 'check-circle',
        warning: 'warning',
        info: 'info',
        error: 'close-circle'
    }
    return iconMap[props.type as keyof typeof iconMap] || 'info'
})

const close = () => {
    visible.value = false
    props.onClose?.()
    emit('destroy')
}

const startTimer = () => {
    if (props.duration > 0) {
        timer.value = setTimeout(() => {
            close()
        }, props.duration)
    }
}

const clearTimer = () => {
    if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
    }
}

onMounted(() => {
    visible.value = true
    startTimer()
})

onBeforeUnmount(() => {
    clearTimer()
})
</script>
