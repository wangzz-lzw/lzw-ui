import { withInstall } from '@lzwui/utils'
import Message from './src/message.vue'
import { message } from './src/message'

export const TMessage = Object.assign(withInstall(Message), message)

export default TMessage

export * from './src/message'
