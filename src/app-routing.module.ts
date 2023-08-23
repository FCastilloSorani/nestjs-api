import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

// Modules
import { AuthModule } from '@auth/auth.module';
import { TasksModule } from '@tasks/tasks.module';

export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'tasks',
    module: TasksModule,
  },
];

@Module({
  imports: [RouterModule.register(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
