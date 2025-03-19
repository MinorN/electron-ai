// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from "electron"
import { CreateCharProps } from "./types"

contextBridge.exposeInMainWorld("electronApi", {
  startChat: (data: CreateCharProps) => ipcRenderer.send("startChat", data),
})
