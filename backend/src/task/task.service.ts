import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskRequestDto } from './dto/create-task-request.dto';
import { DashboardService } from '../dashboard/dashboard.service';
import { UpdateTaskRequestDto } from './dto/update-task-request.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private dashboardService: DashboardService,
  ) {}

  async getTasksByDashboardId(dashboardId: string): Promise<Task[]> {
    return this.taskRepository.findBy({
      dashboard: {
        id: dashboardId,
      },
    });
  }

  async createTask(data: CreateTaskRequestDto): Promise<Task> {
    // the method throws not found error under the hood, so we don't need to handle it manually here
    const dashboard = await this.dashboardService.getDashboardById(
      data.dashboardId,
    );

    const task = await this.taskRepository.save(
      this.taskRepository.create({
        title: data.title,
        description: data.description,
        status: data.status,
        dashboard,
      }),
    );

    // save method doesn't return relations and there is no way to specify which relations to join
    task.dashboard = dashboard;

    return task;
  }

  async updateTask(id: Task['id'], data: UpdateTaskRequestDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['dashboard'],
    });

    if (!task) {
      throw new NotFoundException('Task was not found');
    }

    Object.keys(data).forEach((property) => {
      task[property] = data[property];
    });

    return task.save();
  }

  async removeTask(id: Task['id']): Promise<DeleteResult> {
    return this.taskRepository.delete({ id });
  }
}
