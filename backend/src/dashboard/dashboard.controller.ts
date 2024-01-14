import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetAllDashboardsResponseDto } from './dto/get-all-dashboards-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDashboardResponseDto } from './dto/create-dashboard-response.dto';
import { CreateDashboardRequestDto } from './dto/create-dashboard-request.dto';
import { UpdateDashboardRequestDto } from './dto/update-dashboard-request.dto';
import { UpdateDashboardResponseDto } from './dto/update-dashboard-response.dto';
import { GetDashboardByIdResponseDto } from './dto/get-dashboard-by-id-response.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/')
  @ApiResponse({
    type: GetAllDashboardsResponseDto,
  })
  async getAllDashboards(): Promise<GetAllDashboardsResponseDto> {
    return { data: await this.dashboardService.getAllDashboards() };
  }

  @Get('/:id')
  @ApiResponse({
    type: GetDashboardByIdResponseDto,
  })
  async getDashboardById(
    @Param('id') id: string,
  ): Promise<GetDashboardByIdResponseDto> {
    return { data: await this.dashboardService.getDashboardById(id) };
  }

  @Post('/')
  @ApiResponse({
    type: CreateDashboardResponseDto,
  })
  async createDashboard(
    @Body() data: CreateDashboardRequestDto,
  ): Promise<CreateDashboardResponseDto> {
    return { data: await this.dashboardService.createDashboard(data) };
  }

  @Patch('/:id')
  @ApiResponse({
    type: UpdateDashboardResponseDto,
  })
  async updateDashboard(
    @Param('id') id: string,
    @Body() data: UpdateDashboardRequestDto,
  ): Promise<UpdateDashboardResponseDto> {
    return { data: await this.dashboardService.updateDashboard(id, data) };
  }
}
