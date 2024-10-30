import { Document } from "./document.type"

export type Report = {
  uuid: string,
  createdAt: string,
  title: string,
  text: string,
  company: string,
  documents?: Document[]
}
