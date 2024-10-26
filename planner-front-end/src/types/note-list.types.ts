import { IBase } from "./root.types"

export interface INoteResponse extends IBase{
  name: string
  isCompleted?: boolean
}

export interface INoteListResponse extends IBase{
  name: string
  notes?: INoteListResponse[]
}

export type TypeNoteListFormState = Partial<Omit<INoteListResponse, 'id' | 'updatedAt' | 'createdAt'>> // Omit вырезает поля id, updatedAt и возвращает все остальное
export type TypeNoteFormState = Partial<Omit<INoteResponse, 'id' | 'updatedAt' | 'createdAt'>>