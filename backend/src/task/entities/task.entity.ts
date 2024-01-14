import { EntityHelper } from '../../utils/entity-helper';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskColumns } from '../task-columns.enum';
import { Dashboard } from '../../dashboard/entities/dashboard.entity';

@Entity('tasks')
export class Task extends EntityHelper {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: TaskColumns, default: TaskColumns.TODO })
  status: TaskColumns;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.tasks)
  dashboard: Dashboard;
}
