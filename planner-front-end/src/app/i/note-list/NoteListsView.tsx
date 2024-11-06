'use client'

import { FormProvider, useForm } from 'react-hook-form'
import type { TypeTimeBlockFormState } from '@/types/time-block.types'
import { NoteListsForm } from './form/NoteListsForm'
import { NoteListsCatalog } from './NoteListsCatalog'

export function NoteListView() {
	const methods = useForm<TypeTimeBlockFormState>()

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<NoteListsCatalog />
				<NoteListsForm />
			</div>
		</FormProvider>
	)
}
