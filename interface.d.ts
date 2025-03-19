import { CreateCharProps } from "@/types"

export interface IElectronApi {
  startChat: (data: CreateCharProps) => void
}

declare global {
  interface Window {
    electronApi: IElectronApi
  }
}
