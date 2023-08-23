import { IsEnum, IsOptional, IsString } from 'class-validator';

// Enums
import { TaskStatus } from '../models/task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
