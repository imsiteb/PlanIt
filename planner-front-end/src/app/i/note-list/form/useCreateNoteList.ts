import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeNoteListFormState } from '@/types/note-list.types'
import { noteListService } from '@/services/note-list.service'

export function useCreateNoteList() {
	const queryClient = useQueryClient()

	const { mutate: createNoteList, isPending } = useMutation({
		mutationKey: ['create note-list'],
		mutationFn: (data: TypeNoteListFormState) =>
			noteListService.createNoteList(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['note-lists']
			})
		}
	})

	return {
		createNoteList,
		isPending
	}
}
