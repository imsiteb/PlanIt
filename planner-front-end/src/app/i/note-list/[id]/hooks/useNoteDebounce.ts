import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'
import { TypeTaskFormState } from '@/types/task.types'
import { TypeNoteFormState } from '@/types/note-list.types'
import { useCreateNote } from './useCreateNote'
import { useParams } from 'next/navigation'
import { useUpdateNote } from './useUpdateNote'

interface IUseNoteDebounce {
	watch: UseFormWatch<TypeNoteFormState>
	id: string,
	noteListId: string
}

export function useNoteDebounce({ watch, id, noteListId }: IUseNoteDebounce) {

	const { createNote } = useCreateNote()
	const { updateNote } = useUpdateNote()

	const debouncedCreateNote = useCallback(
		debounce((data: TypeNoteFormState) => { // обёртка над вашей функцией, которая позволяет отменить и отложить на какое-то время её повторные вызовы
			createNote({ noteListId, data })
		}, 444),
		[]
	)

	// Теперь debouncedUpdateTask будет сохраняться между рендерами, и debounce будет работать как ожидается
	const debouncedUpdateNote = useCallback(
		debounce((data: TypeNoteFormState) => {
			updateNote({id, noteListId, data})
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(data => {
			if (id) {
				debouncedUpdateNote({
					...data
				})
			} else {
				debouncedCreateNote(data)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedUpdateNote, debouncedCreateNote])
}
