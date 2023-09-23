import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Please provide description for the task.' })
  description: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
