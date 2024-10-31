import { pomodoroService } from "@/services/pomodoro.service";
import { useQuery } from "@tanstack/react-query";

export function usePomodoroSettings() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['getPomodoroSettings'],
    queryFn: () => pomodoroService.getPomodoroSettings()
  })

  return { pomodoroData: data, pomodoroDataIsLoading: isLoading, pomodoroDataIsSuccess: isSuccess }
}