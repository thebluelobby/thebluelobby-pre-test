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

  private toggleCompletion(id: string, value: boolean) {
    return this.taskRepository
      .findOneByOrFail({
        id,
      })
      .then((task) => {
        task.isCompleted = value;
        return this.taskRepository.save(task);
      });
  }

  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = new TaskEntity();
    newTask.description = createTaskDto.description;

    if (newTask?.priority?.length) newTask.priority = createTaskDto?.priority;

    return this.taskRepository.save(newTask);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  complete(id: string): Promise<TaskEntity> {
    return this.toggleCompletion(id, true);
  }

  uncomplete(id: string): Promise<TaskEntity> {
    return this.toggleCompletion(id, false);
  }

  remove(id: string) {
    return this.taskRepository.delete({ id });
  }
}
