import { Module } from "@nestjs/common";
import { NoteListController } from "./note-list.controller";
import { NoteListService } from "./note-list.services";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [NoteListController],
  providers: [NoteListService, PrismaService],
  exports: [NoteListService]
})
export class NoteListModule {}
