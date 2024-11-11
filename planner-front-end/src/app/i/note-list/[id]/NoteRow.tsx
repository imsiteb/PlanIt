import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import cn from "clsx"
import { GripVertical, Loader, Trash } from "lucide-react"
import Checkbox from "@/components/ui/checkbox"
import styles from './Notes.module.scss'
import { TransparentField } from "@/components/ui/fields/TransparentField"
import { INoteResponse, TypeNoteFormState } from "@/types/note-list.types"
import { useDeleteNote } from "./hooks/useDeleteNote"
import { useNoteDebounce } from "./hooks/useNoteDebounce"

interface INoteRow {
  item: INoteResponse
  setItems: Dispatch<SetStateAction<INoteResponse[] | undefined>>
  noteListId: string
}

export function NoteRow({ item, setItems, noteListId }: INoteRow) {
  const { register, control, watch } = useForm<TypeNoteFormState>({
    defaultValues: {
      name: item.name,
      isCompleted: item.isCompleted
    }
  })
  useNoteDebounce({ watch, id: item.id, noteListId })

  const { deleteNote, isDeletePending } = useDeleteNote()

  return <div
    className={cn(
      styles.row,
      watch('isCompleted') ? styles.completed : '',
      "animation-opacity"
    )}
  >
    <div>
      <span className="inline-flex items-center gap-2.5 w-full">
        <Controller
          control={control}
          name="isCompleted"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              onChange={onChange}
              checked={value}
            />
          )}
        />

        <TransparentField {...register('name')} />
      </span>
    </div>
    <div
      onClick={() =>
        item.id ? deleteNote({ id: item.id, noteListId }) : setItems(prev => prev?.slice(0, -1))
      }
    >
      <button
        // onClick={() =>
        //   item.id ? deleteNote({id: item.id, noteListId}) : setItems(prev => prev?.slice(0, -1))
        // }
        className='opacity-50 transition-opacity hover:opacity-100'
      >
        {isDeletePending ? <Loader size={15} /> : <Trash size={17} />}
      </button>
    </div>
  </div>
}