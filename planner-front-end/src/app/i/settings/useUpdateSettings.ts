import { userService } from "@/services/user.service"
import { TypeUserForm } from "@/types/auth.types"
import { TypePomodoroSettingsState } from "@/types/pomodoro.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['update profile'],
    mutationFn: (data: TypeUserForm) => userService.update(data),
    onSuccess() {
      toast.success('Profile was successfully updated')
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })

  return { mutate, isPending }
}