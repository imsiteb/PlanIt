import { axiosWithAuth } from "@/api/interceptors"
import { IPomodoroSessionResponse, IPomodoroSettingsResponse, TypePomodoroRoundState, TypePomodoroSessionState, TypePomodoroSettingsState } from "@/types/pomodoro.types"

class PomodoroService {
  private BASE_URL = '/user/timer'

  async getTodaySession() {
    const response = await axiosWithAuth.get<IPomodoroSessionResponse>(`${this.BASE_URL}/today`)
    return response
  }

  async createSession() {
    const response = await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL)
    return response
  }

  async updateSession(id: string, data: TypePomodoroSessionState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return response
  }

  async deleteSession(id: string) {
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response
  }

  async updateRound(id: string, data: TypePomodoroRoundState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data)
    return response
  }

  async getPomodoroSettings() {
    const response = await axiosWithAuth.get(`${this.BASE_URL}/settings`)
    return response.data
  }

  async updatePomodoroSettings(data: TypePomodoroSettingsState) {
    console.log("Before put")
    const response = await axiosWithAuth.post(`${this.BASE_URL}/settings`, data)
    console.log("After put")
    return response.data
  }
}

export const pomodoroService = new PomodoroService()
