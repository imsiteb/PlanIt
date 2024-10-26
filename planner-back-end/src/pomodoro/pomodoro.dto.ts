import { IsBoolean, IsNumber, IsOptional, Max, Min } from "class-validator";

export class PomodoroSessionDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean
}

export class PomodoroRoundDto {
  @IsNumber()
  totalSeconds: number

  @IsOptional()
  @IsBoolean()
  isComleted: boolean
}

export class PomodoroSettingsDto {
  @IsOptional() // значение может быть переданым, а может нет
  @IsNumber()
  @Min(1) // минимальный круг
  workInterval?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalsCount?: number
}