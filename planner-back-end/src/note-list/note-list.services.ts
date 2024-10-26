import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { NoteListDto } from "./note.dto";

@Injectable()
export class NoteListService {
  constructor(private prisma: PrismaService) { }

  async getAll(userId: string) {
    return this.prisma.noteList.findMany({
      where: {
        userId,
      }
    })
  }

  async create(dto: NoteListDto, userId: string) {
    return this.prisma.noteList.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })
  }

  async update(dto: NoteListDto, userId: string, noteListId: string,) { // поменяла местами userId, taskId
    return this.prisma.noteList.update({
      where: {
        userId,
        id: noteListId
      },
      data: dto
    })
  }

  async delete(noteListId: string) {
    return this.prisma.noteList.delete({
      where: {
        id: noteListId
      }
    })
  }
}