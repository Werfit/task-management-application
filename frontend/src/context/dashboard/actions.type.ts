import { Dashboard, Task, TaskColumn } from "./dashboard.interface.ts";

export type CreateDashboardAction = {
  title: string;
};

export type CreateDashboardResponse = {
  data: Dashboard;
};

export type GetDashboardAction = {
  id: string;
};

export type GetDashboardResponse = {
  data: Dashboard;
};

export type GetDashboardTasksResponse = {
  data: Task[];
};

export type CreateTaskAction = Omit<Task, "id" | "createdAt">;
export type CreateTaskResponse = {
  data: Task;
};

export type UpdateTaskAction = Task & {
  oldStatus: TaskColumn;
};
export type UpdateTaskResponse = {
  data: Task;
};
export type UpdateTaskPayload = UpdateTaskResponse & {
  oldStatus: TaskColumn;
};

export type DragTaskAction = {
  from: TaskColumn;
  to: TaskColumn;
} & Pick<Task, "id">;

export type DeleteTaskAction = Pick<Task, "id" | "status">;
