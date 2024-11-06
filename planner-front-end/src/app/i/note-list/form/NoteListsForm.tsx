import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { useUpdateNoteList } from './useUpdateNoteList'
import { useCreateNoteList } from './useCreateNoteList'
import { TypeNoteListFormState } from '@/types/note-list.types'

export function NoteListsForm() {
	const { register, control, watch, reset, handleSubmit, getValues } =
		useFormContext<TypeNoteListFormState>()

	const existsId = watch('id')

	const { updateNoteList } = useUpdateNoteList(existsId)
	const { createNoteList, isPending } = useCreateNoteList()

	const onSubmit: SubmitHandler<TypeNoteListFormState> = data => {
		const { id, name } = data
		const dto = { name: name || undefined }

		if (id) {
			updateNoteList({
				id,
				data: dto
			})
		} else {
			createNoteList(dto)
		}

		reset({
			name: ''
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				{...register('name', {
					required: true
				})}
				id='name'
				label='Enter name:'
				placeholder='Enter name:'
				extra='mb-4'
			/>

			<Button
				type='submit'
				disabled={isPending}
				className='mt-6'
			>
				{existsId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
