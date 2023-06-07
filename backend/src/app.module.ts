import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TaskModule
  ]
})
export class AppModule { }
