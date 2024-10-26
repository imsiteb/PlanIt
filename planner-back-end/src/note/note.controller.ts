import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { NoteService } from "./note.services";
import { NoteDto } from "src/note-list/note.dto";

@Controller('user/note-list/:id')
export class NoteController{
  constructor(private readonly noteService: NoteService) { }

  @Get()
  @Auth()
  async getAll(@Param('id') noteListId: string) {
    return this.noteService.getAll(noteListId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: NoteDto, @Param('id') noteListId: string) {
    return this.noteService.create(dto, noteListId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':noteId')
  @Auth()
  async update(
    @Body() dto: NoteDto,
    @Param('id') noteListId: string,
    @Param('noteId') id: string) {
    return this.noteService.update(dto, noteListId, id)
  }

  @HttpCode(200)
  @Delete(':noteId')
  @Auth()
  async delete(@Param('noteId') id: string) {
    return this.noteService.delete(id)
  }
}