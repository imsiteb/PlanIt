'use client'

import Loader from '@/components/ui/Loader'
import { useNotes } from './hooks/useNote'
import { useParams } from 'next/navigation';
import { NoteAddRowInput } from './NoteAddRowInput';
import styles from './Notes.module.scss'
import { NoteRow } from './NoteRow';

export function Notes() {
	const { id } = useParams();
	const noteListId = Array.isArray(id) ? id.join('') : id;

	const { items, setItems } = useNotes(noteListId)
	console.log(items)

	return (
		<div className={styles.parentsWrapper}>
			{items?.map(item => (
				<NoteRow
					key={item.id}
					item={item}
					setItems={setItems}
					noteListId={noteListId}
				/>
			))}
			{!items?.some(item => !item.id) && (
				<NoteAddRowInput
					setItems={setItems}
				/>
			)}
		</div>
	)
}
