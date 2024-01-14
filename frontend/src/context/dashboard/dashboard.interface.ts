import {
  CreateDashboardAction,
  CreateTaskAction,
  DeleteTaskAction,
  DragTaskAction,
  GetDashboardAction,
  UpdateTaskAction,
} from "./actions.type.ts";

export interface DashboardState {
  state: InitialState;
  createDashboard: (data: CreateDashboardAction) => Promise<void>;
  getDashboard: (data: GetDashboardAction) => Promise<void>;
  dragTask: (data: DragTaskAction) => Promise<void>;
  deleteTask: (data: DeleteTaskAction) => Promise<void>;
  createTask: (data: CreateTaskAction) => Promise<void>;
  updateTask: (data: UpdateTaskAction) => Promise<void>;
}

export interface InitialState {
  dashboard: Dashboard | null;
  tasks: {
    [k: string]: Task[];
  };
}

export enum TaskColumn {
  TODO,
  IN_PROGRESS,
  DONE,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskColumn;
  createdAt: string;
  dashboardId: string;
}

export interface Dashboard {
  id: string;
  title: string;
  createdAt: string;
}
