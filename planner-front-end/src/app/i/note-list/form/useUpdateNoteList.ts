import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeNoteListFormState } from '@/types/note-list.types'
import { noteListService } from '@/services/note-list.service'

export function useUpdateNoteList(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateNoteList } = useMutation({
		mutationKey: ['update note-list', key],
		mutationFn: ({ id, data }: { id: string; data: TypeNoteListFormState }) =>
			noteListService.updateNoteList(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['note-lists']
			})
		}
	})

	return { updateNoteList }
}
