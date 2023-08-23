import { Module } from '@nestjs/common';

// Controllers
import { TasksController } from './controllers/tasks.controller';

// Services
import { TasksService } from './services/tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
