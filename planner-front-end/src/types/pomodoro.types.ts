import type{ IBase } from "./root.types";

export interface IPomodoroRoundResponse extends IBase{
  isCompleted?: boolean
  totalSeconds: number
}

export interface IPomodoroSessionResponse extends IBase {
  isCompleted?: boolean
  rounds?: IPomodoroRoundResponse[]
}

export interface IPomodoroSettingsResponse extends IBase {
  workInterval?: number
  breakInterval?: number
  intervalsCount?: number
}

export type TypePomodoroSessionState = Partial<Omit<IPomodoroSessionResponse, 'id' | 'createdAt' | 'updatedAt'>>

export type TypePomodoroRoundState = Partial<Omit<IPomodoroRoundResponse, 'id' | 'createdAt' | 'updatedAt'>>

export type TypePomodoroSettingsState = Partial<Omit<IPomodoroSettingsResponse, 'id' | 'createdAt' | 'updatedAt'>>