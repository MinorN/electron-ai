import { CreateCharProps, OnUpdateCallback } from "@/types"

export interface IElectronApi {
  startChat: (data: CreateCharProps) => void
  onUpdateMessage: (callback: OnUpdateCallback) => any
  copyImageToUserDir: (source: string) => Promise<string>
  getFilePath: (file: File) => string
}

declare global {
  interface Window {
    electronApi: IElectronApi
  }
}
