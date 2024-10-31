import { pomodoroService } from "@/services/pomodoro.service"
import { userService } from "@/services/user.service"
import { TypeUserForm } from "@/types/auth.types"
import { TypePomodoroSettingsState } from "@/types/pomodoro.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: async (data: TypeUserForm & TypePomodoroSettingsState) => {
      // const userData = userService.update(data)
      // const pomodoroData = pomodoroService.updatePomodoroSettings(data)
      // return { userData, pomodoroData }

      const { name, email, password, breakInterval, workInterval, intervalsCount } = data;

      // const [userData, pomodoroData] = await Promise.all([
      //   userService.update({ email, name, password }),
      //   pomodoroService.updatePomodoroSettings({ breakInterval, workInterval, intervalsCount })
      // ]);

      const userData = userService.update({ email, name, password })
      const pomodoroData = pomodoroService.updatePomodoroSettings({ breakInterval, workInterval, intervalsCount })

      console.log(userData)

      console.log(pomodoroData)

      if (userData) {
        console.log("useUpdateSettings ok, userData:  ", userData)
      }
      if (pomodoroData) {
        console.log("useUpdateSettings ok, pomodoroData:  ", pomodoroData)
      }
      return { userData, pomodoroData }
    },
    onSuccess() {
      toast.success('Profile was successfully updated')
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })

  return { mutate, isPending }
}