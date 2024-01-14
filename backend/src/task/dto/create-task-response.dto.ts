import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskWithDashboardDto } from './task-with-dashboard.dto';

export class CreateTaskResponseDto {
  @ApiProperty({ type: TaskWithDashboardDto })
  @ValidateNested()
  @Type(() => TaskWithDashboardDto)
  data: TaskWithDashboardDto;
}
