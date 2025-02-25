import { Metadata } from "next"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Heading } from "@/components/ui/Heading"
import { NoteListView } from "./NoteListsView"

export const metadata: Metadata = {
  title: 'Note lists',
  ...NO_INDEX_PAGE
}

export default function TasksPage() {
  return <div>
    <Heading title="Note lists" />
    <NoteListView />
  </div>
}