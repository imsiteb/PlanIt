import { usePomodoroSettings } from '@/hooks/usePomodoroSettings'

export function useLoadSettings() {
	const { pomodoroData } = usePomodoroSettings()

	const workInterval = pomodoroData?.workInterval ?? 50 // ?? отдаст 50 ТОЛЬКО если null || undefined
	const breakInterval = pomodoroData?.workInterval ?? 10 // break?

	return { workInterval, breakInterval }
}
