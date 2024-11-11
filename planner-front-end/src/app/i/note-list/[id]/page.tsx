import { Metadata } from "next"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Heading } from "@/components/ui/Heading"
import { Notes } from "./Notes"

export const metadata: Metadata = {
  title: 'Notes',
  ...NO_INDEX_PAGE
}

export default function NotesPage() {
  return <div>
    <Heading title="Notes" />
    <Notes />
  </div>
}