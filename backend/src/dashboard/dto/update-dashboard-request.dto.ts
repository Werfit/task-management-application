import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDashboardRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
