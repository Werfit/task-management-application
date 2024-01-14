import { Column, Entity, OneToMany } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import type { Task } from '../../task/entities/task.entity';

@Entity('dashboards')
export class Dashboard extends EntityHelper {
  @Column()
  title: string;

  @OneToMany('tasks', 'dashboard')
  tasks: Task[];
}
