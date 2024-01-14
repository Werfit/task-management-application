import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskColumns } from '../task-columns.enum';

export class UpdateTaskRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty({ enum: TaskColumns, default: TaskColumns.TODO })
  @IsOptional()
  @IsEnum(TaskColumns)
  @IsOptional()
  status: TaskColumns;
}
