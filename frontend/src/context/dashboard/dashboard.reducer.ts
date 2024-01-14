import { InitialState } from "./dashboard.interface.ts";
import { TaskColumn } from "./dashboard.interface.ts";
import {
  CreateDashboardResponse,
  CreateTaskResponse,
  DeleteTaskAction,
  DragTaskAction,
  GetDashboardResponse,
  GetDashboardTasksResponse,
  UpdateTaskPayload,
} from "./actions.type.ts";

export enum DashboardActions {
  DRAG_TASK,
  DELETE_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  GET_TASKS,
  GET_DASHBOARD,
  CREATE_DASHBOARD,
}

type Action = {
  type: DashboardActions;
  payload: unknown;
};

const DashboardReducer = (
  state: InitialState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case DashboardActions.DRAG_TASK: {
      const payload = action.payload as DragTaskAction;
      const task = state.tasks[getTaskColumnName(payload.from)].find(
        (t) => t.id === payload.id,
      );

      if (payload.to === payload.from) {
        return state;
      }

      if (!task) {
        return state;
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [getTaskColumnName(payload.from)]: state.tasks[
            getTaskColumnName(payload.from)
          ].filter((t) => t.id !== payload.id),
          [getTaskColumnName(payload.to)]: [
            { ...task, status: payload.to },
            ...state.tasks[getTaskColumnName(payload.to)],
          ],
        },
      };
    }
    case DashboardActions.DELETE_TASK: {
      const payload = action.payload as DeleteTaskAction;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [getTaskColumnName(payload.status)]: state.tasks[
            getTaskColumnName(payload.status)
          ].filter((task) => task.id !== payload.id),
        },
      };
    }
    case DashboardActions.CREATE_TASK: {
      const payload = action.payload as CreateTaskResponse;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [getTaskColumnName(payload.data.status)]: [
            payload.data,
            ...state.tasks[getTaskColumnName(payload.data.status)],
          ],
        },
      };
    }
    case DashboardActions.UPDATE_TASK: {
      const payload = action.payload as UpdateTaskPayload;
      const column = getTaskColumnName(payload.oldStatus);

      const task = state.tasks[column].find((t) => t.id === payload.data.id);

      if (!task) {
        console.log("Task was not found in the column");
        return state;
      }

      if (payload.data.status === task.status) {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [column]: state.tasks[column].map((t) =>
              t.id === payload.data.id ? payload.data : t,
            ),
          },
        };
      }

      const newColumn = getTaskColumnName(payload.data.status);

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [column]: state.tasks[column].filter((t) => t.id !== payload.data.id),
          [newColumn]: [payload.data, ...state.tasks[newColumn]],
        },
      };
    }
    case DashboardActions.GET_DASHBOARD: {
      const payload = action.payload as GetDashboardResponse;

      return {
        ...state,
        dashboard: payload.data,
      };
    }
    case DashboardActions.CREATE_DASHBOARD: {
      const payload = action.payload as CreateDashboardResponse;

      return {
        ...state,
        tasks: {
          TODO: [],
          IN_PROGRESS: [],
          DONE: [],
        },
        dashboard: payload.data,
      };
    }
    case DashboardActions.GET_TASKS: {
      const payload = action.payload as GetDashboardTasksResponse;
      const tasks = payload.data.reduce(
        (result: InitialState["tasks"], task) => ({
          ...result,
          [getTaskColumnName(task.status)]: [
            task,
            ...result[getTaskColumnName(task.status)],
          ],
        }),
        {
          TODO: [],
          IN_PROGRESS: [],
          DONE: [],
        },
      );

      return {
        ...state,
        tasks,
      };
    }
    default: {
      return state;
    }
  }
};

const getTaskColumnName = (task: TaskColumn): string => {
  switch (task) {
    case TaskColumn.TODO: {
      return "TODO";
    }
    case TaskColumn.IN_PROGRESS: {
      return "IN_PROGRESS";
    }
    case TaskColumn.DONE: {
      return "DONE";
    }
  }
};

export { DashboardReducer };
