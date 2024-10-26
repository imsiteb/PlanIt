import { IsBoolean, IsOptional, IsString } from "class-validator";

export class NoteListDto {
  @IsOptional()
  @IsString()
  name: string
}

export class NoteDto{
  @IsOptional()
  @IsString()
  name: string

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}