import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeNoteFormState } from '@/types/note-list.types'
import { noteService } from '@/services/note.service'

export function useCreateNote() {
	const queryClient = useQueryClient()

	const { mutate: createNote } = useMutation({
		mutationKey: ['create note'],
		mutationFn: ({ noteListId, data }: {
			noteListId: string;
			data: TypeNoteFormState
		}) => noteService.createNote(noteListId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})

	return { createNote }
}
