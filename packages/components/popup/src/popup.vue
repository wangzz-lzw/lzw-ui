<template>
  <div class="reference-wrapper" style="display: inline-block">
    <div class="reference" aria-describedby="tooltip" ref="referenceRef" @click.stop.prevent="togglePopperShow"
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <slot></slot>
    </div>
  </div>
  <transition name="fade">
    <div ref="popperRef" role="tooltip" id="tooltip" v-show="modelValue"
      :style="{ zIndex: 2000, position: 'absolute' }">
      <div id="arrow" data-popper-arrow></div>
      <slot name="popper"></slot>
    </div>
  </transition>

</template>

<style scoped>
.reference-wrapper {
  position: relative;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>
import { ref, watch, nextTick, onUnmounted, onMounted, onBeforeUnmount } from 'vue'
import { usePopper } from '@lzwui/utils/usePopper'
import { propsDefinition } from './popup'
defineOptions({
  name: 't-popup'
})

const props = defineProps(propsDefinition)
const emits = defineEmits(['update:modelValue', 'hide', 'show'])

const referenceRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)

// 确保refs在nextTick后初始化
onMounted(async () => {
  await nextTick()
  if (!referenceRef.value) {
    console.error('Failed to bind reference element')
  }
  if (!popperRef.value) {
    console.error('Failed to bind popper element')
  }

  // 如果modelValue初始为true，立即显示popper
  if (props.modelValue) {
    showPopper()
    await nextTick()
    updatePopper()
  }
  document.addEventListener('click', handleClickOutside)
})

const {
  isPopperShow,
  showPopper,
  hidePopper,
  updatePopper
} = usePopper(referenceRef, popperRef, {
  placement: props.placement
})

watch(() => props.modelValue, async (visible) => {
  if (!referenceRef.value || !popperRef.value) return

  if (visible) {
    showPopper()
    await nextTick()
    if (popperRef.value) {
      updatePopper()
    }
    emits('show')
  } else {
    hidePopper()
    emits('hide')
  }
})

onUnmounted(() => {
  if (popperRef.value) {
    popperRef.value = null
  }
})

const togglePopperShow = () => {
  if (props.disabled) return
  if (props.trigger === 'manual') return
  emits('update:modelValue', !props.modelValue)
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    emits('update:modelValue', true)
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    emits('update:modelValue', false)
  }
}



function handleClickOutside(e: MouseEvent) {
  if (!props.modelValue) return
  if (!popperRef.value?.contains(e.target as Node) &&
    !popperRef.value?.contains(e.target as Node)) {
    emits('update:modelValue', false)
  }
}


onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
