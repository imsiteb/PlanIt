import Loader from '@/components/ui/Loader'
import styles from './NoteList.module.scss'
import { useNoteLists } from './hooks/useNoteList'
import { NoteList } from './NoteList'

export function NoteListsCatalog() {
  const { items, setItems, isLoading } = useNoteLists()

  if (isLoading) return <Loader />

  return (
    <div>
      <div className={styles.list}>
        {items?.length ? (
          items?.map(item => (
            <NoteList
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <div>Add the first note-list on the right form</div>
        )}
      </div>
    </div>
  )
}
