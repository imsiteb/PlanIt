import { noteService } from "@/services/note.service";
import { INoteResponse } from "@/types/note-list.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useNotes(noteListId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => noteService.getNotes(noteListId)
  })

  const [items, setItems] = useState<INoteResponse[] | undefined>(data?.data)

  useEffect(() => {
    setItems(data?.data)
  }, [data?.data])

  return { items, setItems, isLoading }
}