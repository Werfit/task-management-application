import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), DashboardModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
