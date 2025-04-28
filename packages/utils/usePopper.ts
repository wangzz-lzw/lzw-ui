import { ref, onMounted, onUnmounted,nextTick,watch,type Ref } from 'vue'
import { createPopper, Instance, Options } from '@popperjs/core'

export interface UsePopperOptions extends Partial<Options> {
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: [number, number]
  gpuAcceleration?: boolean
  adaptive?: boolean
  boundary?: HTMLElement | 'clippingParents' | 'scrollParent' | 'viewport'
  preventOverflow?: boolean
}

export function usePopper(
  referenceRef: Ref<HTMLElement | null>,
  popperRef: Ref<HTMLElement | null>,
  options: UsePopperOptions = {}
) {
  const popperInstance = ref<Instance | null>(null)
  const isPopperShow = ref(false)

  const defaultOptions: UsePopperOptions = {
    placement: options.placement || 'bottom',
    offset: options.offset || [0, 10], // 增加默认offset
    gpuAcceleration: false,
    adaptive: false,
    preventOverflow: true,
    ...options
  }

  const createPopperInstance = () => {
    console.log('Creating popper instance...')
    if (!referenceRef.value) {
      console.error('Reference element not found')
      return
    }
    if (!popperRef.value) {
      console.error('Popper element not found')
      return
    }

    try {
      popperInstance.value = createPopper(referenceRef.value, popperRef.value, {
        placement: defaultOptions.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: defaultOptions.offset
            }
          },
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: defaultOptions.gpuAcceleration,
              adaptive: defaultOptions.adaptive
            }
          },
          {
            name: 'preventOverflow',
            enabled: defaultOptions.preventOverflow,
            options: {
              boundary: defaultOptions.boundary || 'clippingParents'
            }
          }
        ]
      })
      console.log('Popper instance created successfully')
    } catch (error) {
      console.error('Failed to create popper instance:', error)
    }
  }

  const updatePopper = () => {
    if (popperInstance.value) {
      popperInstance.value.update()
    }
  }

  const destroyPopper = () => {
    if (popperInstance.value) {
      popperInstance.value.destroy()
      popperInstance.value = null
    }
  }

  const showPopper = () => {
    if (!popperInstance.value) {
      createPopperInstance()
    }
    isPopperShow.value = true
    nextTick(() => {
      updatePopper()
    })
  }

  const hidePopper = () => {
    isPopperShow.value = false
  }

  watch([referenceRef, popperRef], () => {
    if (popperInstance.value) {
      destroyPopper()
      createPopperInstance()
    }
  })

  onMounted(() => {
    createPopperInstance()
  })

  onUnmounted(() => {
    if (popperInstance.value) {
      destroyPopper()
    }
  })

  return {
    popperInstance,
    isPopperShow,
    showPopper,
    hidePopper,
    updatePopper,
    destroyPopper
  }
}
