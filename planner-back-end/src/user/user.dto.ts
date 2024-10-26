import { IsEmail, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class UserDto{
  @IsOptional()
  @IsEmail()
  email:string

  @IsOptional()
  @MinLength(6, {
    message: 'Password must be more than 6 characters',
  })

  @IsOptional()
  @IsString()
  password: string
}