import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DashboardDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  createdAt: string;
}
