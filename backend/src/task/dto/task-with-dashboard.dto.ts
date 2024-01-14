import { TaskDto } from './task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DashboardDto } from '../../dashboard/dto/dashboard.dto';

export class TaskWithDashboardDto extends TaskDto {
  @ApiProperty({ type: DashboardDto })
  @ValidateNested()
  @Type(() => DashboardDto)
  dashboard: DashboardDto;
}
