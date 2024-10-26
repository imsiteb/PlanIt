import type { User } from '@/../node_modules/@prisma/client'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator( // создаем собственный декоратор
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // переключает контекст на HTTP-запрос, получаем информацию о текущем пользователе
    const user = request.user; // из объекта request извлекается объект текущего пользователя (предполагается, что user был добавлен в запрос после прохождения аутентификации

    return data ? user[data] : user;
  },
);