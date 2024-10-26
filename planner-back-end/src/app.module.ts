import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { NoteModule } from './note/note.module';
import { NoteListModule } from './note-list/note-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // загружает переменные окружения из файла .env
    AuthModule,
    UserModule,
    TaskModule,
    TimeBlockModule,
    PomodoroModule,
    NoteModule,
    NoteListModule
  ],
})
export class AppModule { }
