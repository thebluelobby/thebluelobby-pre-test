// tasks.controller.ts

import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  getAllTasks(@Query('filter') filterValue: boolean): Promise<Task[]> {

    if (filterValue) {
      return this.taskService.getFilteredTasks(filterValue)
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createNewTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createNewTask(task);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id')
  editTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.editTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/complete')
  markAsComplete(@Param('id') id: string, @Body('isComplete') isComplete: boolean) {
    return this.taskService.editComplete(id, isComplete);
  }
}
