import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskDto } from './task.dto';

export class GetTasksByDashboardIdResponseDto {
  @ApiProperty({ type: TaskDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  data: TaskDto[];
}
