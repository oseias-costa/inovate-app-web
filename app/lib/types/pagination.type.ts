import { Document } from "./document.type"

export type Pagination<T> = {
  items: T[],
  "meta": {
    "totalItems": number,
    "itemCount": number,
    "itemsPerPage": number,
    "totalPages": number,
    "currentPage": number,
    "previusPage": number | null,
    "nextPage": number | null
  }
}
