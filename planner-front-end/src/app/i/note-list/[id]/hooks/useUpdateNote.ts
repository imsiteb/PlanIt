import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeNoteFormState } from '@/types/note-list.types'
import { noteService } from '@/services/note.service'

export function useUpdateNote(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateNote } = useMutation({
		mutationKey: ['update note', key],
		mutationFn: ({ id, noteListId, data }: {
      id: string;
      noteListId: string;
      data: TypeNoteFormState
    }) =>
			noteService.updateNote(id, noteListId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})

	return { updateNote }
}