import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskRepository.find();
        return tasks;
    }

    async getFilteredTasks(filterValue: boolean): Promise<Task[]> {
        const tasks = await this.taskRepository.find({
            where: {
                complete: filterValue,
            },
        });
        return tasks;
    }

    async createNewTask(task: CreateTaskDto): Promise<Task> {
        return this.taskRepository.save(task);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id: id });
        if (!task) {
            throw new NotFoundException(`Cannot find task with ID ${id}`);
        }
        return task;
    }

    async editTask(id: string, updatedTask: Task): Promise<Task> {
        await this.taskRepository.update(id, updatedTask);
        return this.getTaskById(id);
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Delete Error! Cannot find task with ID ${id}`);
        }
    }

    async editComplete(id: string, isComplete: boolean): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id: id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        if (isComplete) {
            task.complete = true;
        } else {
            task.complete = false;
        }

        return this.taskRepository.save(task);
    }
}
