import { useMutation, useQueryClient } from '@tanstack/react-query'
import { timeBlockService } from '@/services/time-block.service'
import { noteListService } from '@/services/note-list.service'

export function useDeleteNoteList(itemId: string) {
	const queryClient = useQueryClient()

	const { mutate: deleteNoteList, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete note-list', itemId],
		mutationFn: () => noteListService.deleteNoteList(itemId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['note-lists']
			})
		}
	})

	return { deleteNoteList, isDeletePending }
}
