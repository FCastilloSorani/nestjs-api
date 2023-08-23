import { Injectable, NotFoundException } from '@nestjs/common';

// DTOs
import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';

// Models
import { Task, TaskStatus } from '../models/task.model';

// UUID
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // GETS
  getAll(): Task[] {
    return this.tasks;
  }

  getWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter((e: Task) => e.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (e: Task) => e.title.includes(search) || e.description.includes(search),
      );
    }

    return tasks;
  }

  getById(id: string): Task {
    const found = this.tasks.find((e: Task) => e.id === id);

    if (!found) throw new NotFoundException(`Task with ID "${id}" not found`);

    return found;
  }

  // POSTS
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  // PATCHES
  updateTaskSatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id);

    task.status = status;

    return task;
  }

  // DELETES
  deleteTask(id: string): void {
    const found = this.getById(id);
    this.tasks = this.tasks.filter((e: Task) => e.id !== found.id);
  }
}
