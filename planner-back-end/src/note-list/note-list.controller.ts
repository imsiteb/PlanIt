import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { NoteListDto } from "./note.dto";
import { NoteListService } from "./note-list.services";

@Controller('user/note-list')
export class NoteListController{
  constructor(private readonly noteListService: NoteListService) { }

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.noteListService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: NoteListDto, @CurrentUser('id') userId: string) {
    return this.noteListService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: NoteListDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string) {
    return this.noteListService.update(dto, userId, id)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.noteListService.delete(id)
  }
}