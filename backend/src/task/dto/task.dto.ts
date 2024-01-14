import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TaskColumns } from '../task-columns.enum';

export class TaskDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskColumns })
  @IsEnum(TaskColumns)
  status: TaskColumns;

  @ApiProperty()
  @IsString()
  createdAt: string;
}
