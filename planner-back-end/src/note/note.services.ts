import { Injectable } from "@nestjs/common";
import { NoteDto } from "src/note-list/note.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) { }

  async getAll(noteListId: string) {
    return this.prisma.note.findMany({
      where: {
        noteListId,
      }
    })
  }

  async create(dto: NoteDto, noteListId: string) {
    return this.prisma.note.create({
      data: {
        ...dto,
        noteList: {
          connect: {
            id: noteListId,
          }
        }
      }
    })
  }

  async update(dto: NoteDto, noteListId: string, noteId: string,) { // поменяла местами userId, taskId
    return this.prisma.note.update({
      where: {
        noteListId,
        id: noteId
      },
      data: dto
    })
  }

  async delete(noteId: string) {
    return this.prisma.note.delete({
      where: {
        id: noteId
      }
    })
  }
}