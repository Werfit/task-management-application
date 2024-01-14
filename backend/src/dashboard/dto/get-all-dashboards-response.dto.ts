import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DashboardDto } from './dashboard.dto';

export class GetAllDashboardsResponseDto {
  @ApiProperty({ type: DashboardDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DashboardDto)
  data: DashboardDto[];
}
