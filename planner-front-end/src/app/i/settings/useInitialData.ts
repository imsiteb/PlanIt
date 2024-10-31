'use client'

import { usePomodoroSettings } from "@/hooks/usePomodoroSettings"
import { useProfile } from "@/hooks/useProfile"
import { TypeUserForm } from "@/types/auth.types"
import { TypePomodoroSettingsState } from "@/types/pomodoro.types"
import { useEffect } from "react"
import { UseFormReset } from "react-hook-form"

export function useInitialData(
  resetData: UseFormReset<TypeUserForm & TypePomodoroSettingsState>
) {
  const { data, isSuccess } = useProfile()
  const { pomodoroData, pomodoroDataIsSuccess } = usePomodoroSettings()

  useEffect(() => {
    if (isSuccess && data && pomodoroDataIsSuccess && pomodoroData) {
      resetData({
        email: data?.user.email,
        name: data?.user.name,
        breakInterval: pomodoroData?.breakInterval,                   // 4:08
        workInterval: pomodoroData?.workInterval,                     // 4:08
        intervalsCount: pomodoroData?.intervalsCount                  // 4:08
      })
      console.log("data reset")
    }
  }, [isSuccess, pomodoroDataIsSuccess])
}