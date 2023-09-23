import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    const newTask = new TaskEntity();
    newTask.description = createTaskDto.description;

    if (newTask?.priority?.length) newTask.priority = createTaskDto?.priority;

    return this.taskRepository.save(newTask);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
