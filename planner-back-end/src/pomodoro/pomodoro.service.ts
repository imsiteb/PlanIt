import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PomodoroRoundDto, PomodoroSessionDto, PomodoroSettingsDto } from './pomodoro.dto';
import { PomodoroRound } from '@prisma/client';

@Injectable()
export class PomodoroService {
  constructor(private prisma: PrismaService) { }

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0]

    return this.prisma.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc',
          }
        }
      }
    })
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId)

    if (todaySession) return todaySession

    const intervals = await this.prisma.pomodoroSettings.findFirst({
      where: {
        userId,
      },
      select: {
        intervalsCount: true,
      },
    })

    if (!intervals) throw new NotFoundException('User not found')

    return this.prisma.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: intervals.intervalsCount }, () => ({
              totalSeconds: 0,
            }))
          }
        },
        user: {
          connect: {
            id: userId,
          }
        }
      },
      include: {
        rounds: true
      }
    })
  }

  async update(
    dto: Partial<PomodoroSessionDto>,
    userId: string,
    pomodoroId: string, // поменяла местами входные параметры
  ) {
    return this.prisma.pomodoroSession.update({
      where: {
        userId,
        id: pomodoroId,
      },
      data: dto,
    })
  }

  async updateRound(
    dto: Partial<PomodoroRoundDto>, // частичный объект, не все поля используются
    roundId: string
  ) {
    return this.prisma.pomodoroRound.update({
      where: {
        id: roundId,
      },
      data: dto,
    })
  }

  async deleteSession(sessionId: string, userId: string) {
    return this.prisma.pomodoroSession.delete({
      where: {
        id: sessionId,
        userId,
      },
    })
  }

  async getPomodoroSettings(userId: string){
    return this.prisma.pomodoroSettings.findUnique({
      where: {
        userId
      }
    })
  }

  async updatePomodoroSettings(userId: string, dto: PomodoroSettingsDto) {
    return this.prisma.pomodoroSettings.update({
      where: {
        userId,
      },
      data: dto
    })
  }
}
