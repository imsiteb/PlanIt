import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PomodoroRoundDto, PomodoroSessionDto, PomodoroSettingsDto } from './pomodoro.dto';

@Controller('user/timer')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) { }

  @Get('today')
  @Auth()
  async getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySession(userId)
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: PomodoroSessionDto, // извлечь данные тела запроса, отправленные клиентом
    @CurrentUser('id') userId: string, // для извлечения идентификатора текущего авторизованного пользователя из контекста запроса
    @Param('id') id: string) { // извлекает параметр маршрута :id
    return this.pomodoroService.update(dto, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/round/:id')
  @Auth()
  async updateRound(@Body() dto: PomodoroRoundDto, @Param('id') id: string) {
    return this.pomodoroService.updateRound(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteSession(
    @Param('id') id: string,
    @CurrentUser('id') userId: string) {
    return this.pomodoroService.deleteSession(id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/settings/:id') // надо ли сеттингс в пути?
  @Auth()
  async updateSettings(@CurrentUser('id') id: string, @Body() dto: PomodoroSettingsDto, @Param('id') pomodoroSettingsId: string) {
    return this.pomodoroService.updatePomodoroSettings(id, dto, pomodoroSettingsId)
  }
}
