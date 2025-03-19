import { createPinia } from 'pinia'
import { useConversationStroe } from './conversation'
import { useMessageStroe } from './message'

const pinia = createPinia()

export default pinia

export { useConversationStroe, useMessageStroe }
