import { CreateCharProps, OnUpdateCallback } from '@/types'

export interface IElectronApi {
  startChat: (data: CreateCharProps) => void
  onUpdateMessage: (callback: OnUpdateCallback) => any
}

declare global {
  interface Window {
    electronApi: IElectronApi
  }
}
