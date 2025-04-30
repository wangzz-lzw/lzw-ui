import { useNamespace } from "@lzwui/utils";
import { createVNode, render } from 'vue';
import Message from './message.vue';
import type { ExtractPropTypes } from 'vue';

export const bem = useNamespace("message");

export type MessageOptions = Partial<ExtractPropTypes<typeof messageProps>> & {
  appendTo?: HTMLElement | string
}

export const messageProps = {
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (val: string) =>
      ['success', 'warning', 'info', 'error'].includes(val)
  },
  duration: {
    type: Number,
    default: 3000
  },
  showClose: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 20
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: () => {}
  }
}

export const messageEmits = {
  destroy: () => true
}

export const messageTypes = ['success', 'warning', 'info', 'error'] as const;
export type MessageType = typeof messageTypes[number];

export const createMessage = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  const container = document.createElement('div')
  const vm = createVNode(Message, options)
  render(vm, container)
  document.body.appendChild(container.firstElementChild!)

  return {
    close: () => {
      render(null, container)
      document.body.removeChild(container)
    }
  }
}

export const message = Object.assign(createMessage, {
  success: (options: MessageOptions | string) => createMessage(typeof options === 'object'? { ...options, type:'success' } : {message: options, type:'success'}),
  warning: (options: MessageOptions | string) => createMessage(typeof options === 'object'? { ...options, type: 'warning' } : {message: options, type: 'warning'}),  
  info: (options: MessageOptions | string) => createMessage(typeof options === 'object'? { ...options, type: 'info' } : {message: options, type: 'info'}),
  error: (options: MessageOptions | string) => createMessage(typeof options === 'object'? { ...options, type: 'error' } : {message: options, type: 'error'})
})
