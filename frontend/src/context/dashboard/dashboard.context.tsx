import { createContext, useReducer } from "react";
import { DashboardState, InitialState } from "./dashboard.interface.ts";
import { DashboardActions, DashboardReducer } from "./dashboard.reducer.ts";
import {
  CreateDashboardAction,
  CreateDashboardResponse,
  CreateTaskAction,
  DeleteTaskAction,
  DragTaskAction,
  GetDashboardAction,
  GetDashboardResponse,
  GetDashboardTasksResponse,
  UpdateTaskAction,
} from "./actions.type.ts";
import { axios } from "../../services/axios.ts";

const initialState: InitialState = {
  dashboard: null,
  tasks: {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  },
};

const DashboardContext = createContext<DashboardState>({
  state: initialState,
  createDashboard: async () => {},
  getDashboard: async () => {},
  dragTask: async () => {},
  deleteTask: async () => {},
  createTask: async () => {},
  updateTask: async () => {},
});

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const createDashboard = async (
    data: CreateDashboardAction,
  ): Promise<void> => {
    try {
      const response = await axios.post<CreateDashboardResponse>(
        "/dashboard",
        data,
      );

      dispatch({
        type: DashboardActions.CREATE_DASHBOARD,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDashboard = async (data: GetDashboardAction): Promise<void> => {
    try {
      const response = await axios.get<GetDashboardResponse>(
        `/dashboard/${data.id}`,
      );
      dispatch({
        type: DashboardActions.GET_DASHBOARD,
        payload: response.data,
      });

      const tasks = await axios.get<GetDashboardTasksResponse>(
        `/task/dashboard/${data.id}`,
      );
      dispatch({
        type: DashboardActions.GET_TASKS,
        payload: tasks.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (data: CreateTaskAction): Promise<void> => {
    try {
      const response = await axios.post("/task", data);

      dispatch({
        type: DashboardActions.CREATE_TASK,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (data: UpdateTaskAction): Promise<void> => {
    try {
      const response = await axios.patch(`/task/${data.id}`, data);

      dispatch({
        type: DashboardActions.UPDATE_TASK,
        payload: { ...response.data, oldStatus: data.oldStatus },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dragTask = async (data: DragTaskAction): Promise<void> =>
    dispatch({
      type: DashboardActions.DRAG_TASK,
      payload: data,
    });

  const deleteTask = async (data: DeleteTaskAction): Promise<void> => {
    try {
      await axios.delete(`/task/${data.id}`);

      dispatch({
        type: DashboardActions.DELETE_TASK,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        state,
        createDashboard,
        getDashboard,
        dragTask,
        deleteTask,
        updateTask,
        createTask,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
