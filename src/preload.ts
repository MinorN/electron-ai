// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron'
import { CreateCharProps, OnUpdateCallback } from './types'

contextBridge.exposeInMainWorld('electronApi', {
  startChat: (data: CreateCharProps) => ipcRenderer.send('startChat', data),
  onUpdateMessage: (callback: OnUpdateCallback) =>
    ipcRenderer.on('update-message', (_event, data) => callback(data)),
})
