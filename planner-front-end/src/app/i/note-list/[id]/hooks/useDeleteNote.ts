import { useMutation, useQueryClient } from '@tanstack/react-query'
import { noteService } from '@/services/note.service'

export function useDeleteNote() {
	const queryClient = useQueryClient()

	const { mutate: deleteNote, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete note'],
		mutationFn: ({ id, noteListId }: {
			id: string, noteListId: string
		}) => noteService.deleteNote(id, noteListId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})

	return { deleteNote, isDeletePending }
}