import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  Query,
} from '@nestjs/common';

// DTOs
import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task.dto';

// Interfaces
import { Task } from '../models/task.model';

// Services
import { TasksService } from '../services/tasks.service';

@Controller('/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GETS
  @Get('/')
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getWithFilters(filterDto);
    }

    return this.tasksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getById(id);
  }

  // POSTS
  @Post('/')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // PATCHS
  @Patch('/:id/status')
  async updateTaskSatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskSatus(id, status);
  }

  // DELETES
  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
