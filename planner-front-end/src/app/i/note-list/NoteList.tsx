import { Edit, GripVertical, Loader, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import styles from './NoteList.module.scss'
import {
  INoteListResponse,
  TypeNoteListFormState
} from '@/types/note-list.types'
import { useDeleteNoteList } from './hooks/useDeleteNoteList'
import Link from 'next/link'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export function NoteList({ item }: { item: INoteListResponse }) {
  const { reset } = useFormContext<TypeNoteListFormState>()
  const { deleteNoteList, isDeletePending } = useDeleteNoteList(item.id)

  return (
    <div>
      <div
        className={styles.block}
        style={{
          backgroundColor: '#991b1b',
          height: `60px`
        }}
      >
        <div className='flex items-center'>
          <div>
            <Link href={`${DASHBOARD_PAGES.NOTE_LISTS}/${item.id}`}>
              {item.name}{' '}
            </Link>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => {
              reset({
                id: item.id,
                name: item.name
              })
            }}
            className='opacity-50 transition-opacity hover:opacity-100 mr-2'
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteNoteList()}
            className='opacity-50 transition-opacity hover:opacity-100'
          >
            {isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
