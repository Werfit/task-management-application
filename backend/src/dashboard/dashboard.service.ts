import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { CreateDashboardRequestDto } from './dto/create-dashboard-request.dto';
import { UpdateDashboardRequestDto } from './dto/update-dashboard-request.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
  ) {}

  async getAllDashboards(): Promise<Dashboard[]> {
    return this.dashboardRepository.find();
  }

  async getDashboardById(id: Dashboard['id']): Promise<Dashboard> {
    const dashboard = await this.dashboardRepository.findOneBy({ id });

    if (!dashboard) {
      throw new NotFoundException('Dashboard was not found');
    }

    return dashboard;
  }

  async createDashboard(data: CreateDashboardRequestDto): Promise<Dashboard> {
    return this.dashboardRepository.save(
      this.dashboardRepository.create({ title: data.title }),
    );
  }

  async updateDashboard(
    id: Dashboard['id'],
    data: UpdateDashboardRequestDto,
  ): Promise<Dashboard> {
    const dashboard = await this.dashboardRepository.findOneBy({ id });

    if (!dashboard) {
      throw new NotFoundException('Dashboard was not found');
    }

    dashboard.title = data.title;
    return dashboard.save();
  }
}
