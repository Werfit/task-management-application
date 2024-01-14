import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskWithDashboardDto } from './task-with-dashboard.dto';

export class UpdateTaskResponseDto {
  @ApiProperty({ type: TaskWithDashboardDto })
  @ValidateNested()
  @Type(() => TaskWithDashboardDto)
  data: TaskWithDashboardDto;
}
