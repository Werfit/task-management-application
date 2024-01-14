import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DashboardDto } from './dashboard.dto';

export class CreateDashboardResponseDto {
  @ApiProperty({ type: DashboardDto })
  @ValidateNested()
  @Type(() => DashboardDto)
  data: DashboardDto;
}
