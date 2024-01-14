import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskColumns } from '../task-columns.enum';

export class CreateTaskRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dashboardId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty({ enum: TaskColumns, default: TaskColumns.TODO })
  @IsEnum(TaskColumns)
  @IsOptional()
  status: TaskColumns;
}
