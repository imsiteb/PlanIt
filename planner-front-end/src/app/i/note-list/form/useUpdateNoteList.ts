import { useMutation, useQueryClient } from '@tanstack/react-query'
import { timeBlockService } from '@/services/time-block.service'
import { TypeNoteFormState } from '@/types/note-list.types'
import { noteListService } from '@/services/note-list.service'

export function useUpdateNoteList(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateNoteList } = useMutation({
		mutationKey: ['update note-list', key],
		mutationFn: ({ id, data }: { id: string; data: TypeNoteFormState }) =>
			noteListService.updateNoteList(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['note-lists']
			})
		}
	})

	return { updateNoteList }
}
