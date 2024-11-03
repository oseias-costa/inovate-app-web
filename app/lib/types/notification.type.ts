import { Document } from "./document.type"

export type Notification = {
  description: string,
  title: string,
  text: string,
  type: 'REQUEST' | 'NOTICE' | 'REPORT',
  itemUuid: string
  createAt: string
}
