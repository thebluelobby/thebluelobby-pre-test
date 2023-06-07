import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    complete: boolean;

    @Column({ default: new Date() })
    createdOn: Date;

    @Column()
    dueDate: Date;
}
