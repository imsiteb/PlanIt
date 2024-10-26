import { axiosWithAuth } from '@/api/interceptors';
import { INoteListResponse, TypeNoteListFormState } from '@/types/note-list.types';

class NoteListService {
  private BASE_URL = '/user/note-list'

  async getNoteLists() {
    const response = await axiosWithAuth.get<INoteListResponse[]>(this.BASE_URL)
    return response
  }

  async createNoteList(data: TypeNoteListFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data)
    return response
  }

  async updateNoteList(id: string, data: TypeNoteListFormState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return response
  }

  async deleteNoteList(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const noteListService = new NoteListService()