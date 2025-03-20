import { createApp } from "vue"
import {
  createRouter,
  createMemoryHistory,
  type RouteRecordRaw,
} from "vue-router"
import pinia from "@/stores"
import App from "./App.vue"
import "./index.css"
import Home from "./views/Home.vue"
import Conversation from "./views/Conversation.vue"
import Settings from "./views/Settings.vue"
import { useConversationStroe } from "@/stores"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/conversation/:id",
    component: Conversation,
  },
  {
    path: "/settings",
    component: Settings,
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
})

router.beforeEach((to, _) => {
  const stroe = useConversationStroe()
  if (!to.path.startsWith("/conversation")) {
    stroe.selectedId = -1
  }
})

createApp(App).use(router).use(pinia).mount("#app")
