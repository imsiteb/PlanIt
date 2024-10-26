import { axiosWithAuth } from "@/api/interceptors"
import { INoteResponse, TypeNoteFormState } from "@/types/note-list.types"

class NoteService {
  private BASE_URL = '/user/note-list'

  async getNotes(noteListId: string) {
    const response = await axiosWithAuth.get<INoteResponse[]>(`${this.BASE_URL}/${noteListId}`)
    return response
  }

  async createNote(noteListId: string, data: TypeNoteFormState) {
    const response = await axiosWithAuth.post(`${this.BASE_URL}/${noteListId}`, data)
    return response
  }

  async updateNote(id: string, noteListId: string, data: TypeNoteFormState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${noteListId}/${id}`, data)
    return response
  }

  async deleteNoteList(id: string, noteListId: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${noteListId}/${id}`)
    return response
  }
}

export const noteService = new NoteService()