import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'

export const Auth = () => UseGuards(JwtAuthGuard) // проверяем авторизацию созданным декоратором

// UseGuards(JwtAuthGuard) — это декоратор, встроенный в NestJS, который применяется к контроллеру или методу для ограничения доступа только для пользователей, прошедших аутентификацию через JWT (JSON Web Token)

