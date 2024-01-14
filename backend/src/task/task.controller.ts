import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTasksByDashboardIdResponseDto } from './dto/get-tasks-by-dashboard-id-response.dto';
import { TaskService } from './task.service';
import { CreateTaskResponseDto } from './dto/create-task-response.dto';
import { CreateTaskRequestDto } from './dto/create-task-request.dto';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { UpdateTaskRequestDto } from './dto/update-task-request.dto';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/dashboard/:id')
  @ApiResponse({ type: GetTasksByDashboardIdResponseDto })
  async getTasksByDashboardId(
    @Param('id') dashboardId: string,
  ): Promise<GetTasksByDashboardIdResponseDto> {
    return {
      data: await this.taskService.getTasksByDashboardId(dashboardId),
    };
  }

  @Post('/')
  @ApiResponse({ type: CreateTaskResponseDto })
  async createTask(
    @Body() data: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    return {
      data: await this.taskService.createTask(data),
    };
  }

  @Patch('/:id')
  @ApiResponse({ type: UpdateTaskResponseDto })
  async updateTask(
    @Param('id') id: string,
    @Body() data: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    return {
      data: await this.taskService.updateTask(id, data),
    };
  }

  @Delete('/:id')
  @ApiResponse({ type: DeleteTaskResponseDto })
  async deleteTask(@Param('id') id: string): Promise<DeleteTaskResponseDto> {
    await this.taskService.removeTask(id);
    return { success: true };
  }
}
