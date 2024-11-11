import { Dispatch, SetStateAction } from "react"
import styles from './Notes.module.scss'
import { INoteResponse } from "@/types/note-list.types"

interface INoteAddRowInput {
  setItems: Dispatch<SetStateAction<INoteResponse[] | undefined>>
}

export function NoteAddRowInput({ setItems }: INoteAddRowInput) {
  const addRow = () => {
    setItems(prev => {
      if (!prev) return

      return [
        ...prev,
        {
          id: '',
          name: '',
          isCompleted: false
        }
      ]
    })
  }

  return (
    <div className={styles.addRow}>
      <button
        onClick={addRow}
        className="italic opacity-40 text-sm">
        Add note...
      </button>
    </div>
  )
}