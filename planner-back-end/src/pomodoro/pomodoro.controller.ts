import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PomodoroRoundDto, PomodoroSessionDto, PomodoroSettingsDto } from './pomodoro.dto';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';

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
    @Body() dto: PomodoroSessionDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string) {
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

  @Get('/settings')
  @Auth()
  async getSettings(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getPomodoroSettings(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/settings')
  @Auth()
  async updateSettings(@CurrentUser() userId: string, @Body() dto: PomodoroSettingsDto) {
    return this.pomodoroService.updatePomodoroSettings(userId, dto)
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Put('/settings')
  // @Auth()
  // async updateSettings(@CurrentUser('id') userId: string, @Body() dto: PomodoroSettingsDto) {
  //   console.log(`Received DTO: ${JSON.stringify(dto)}`);
  
  //   try {
  //     return await this.pomodoroService.updatePomodoroSettings(userId, dto);
  //   } catch (error) {
  //     // Логирование ошибки для отладки
  //     console.error('Error updating Pomodoro settings:', error);
  
  //     // Проверка типа ошибки для более детальной обработк
  
  //     // Если это общая ошибка, выбрасываем серверную ошибку
  //     throw new InternalServerErrorException('Could not update Pomodoro settings. Please try again later.');
  //   }
  // }
}
