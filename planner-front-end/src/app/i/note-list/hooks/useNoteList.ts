import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { noteListService } from '@/services/note-list.service'
import { INoteListResponse } from '@/types/note-list.types'

export const useNoteLists = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['note-lists'],
		queryFn: () => noteListService.getNoteLists()
	})

	const [items, setItems] = useState<INoteListResponse[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, isLoading }
}
