import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({
    name: 'task_id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'status',
    nullable: false,
    default: false,
  })
  status: boolean;
}
