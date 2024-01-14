import { TaskModalForm } from "./form.component.tsx";
import { useContext } from "react";
import { DashboardContext } from "../../context/dashboard/dashboard.context.tsx";
import { TaskSchema } from "../../common/schema/task.schema.ts";
import { ModalAction } from "./modal.enum.ts";
import {
  Task,
  TaskColumn,
} from "../../context/dashboard/dashboard.interface.ts";

const Title: Record<keyof typeof ModalAction, string> = {
  CREATE: "Create task",
  UPDATE: "Update task",
};

type ModalProps = {
  type: ModalAction;
  onClose: () => void;
  task?: Task;
  defaultStatus: TaskColumn;
};

const TaskModal: React.FC<ModalProps> = ({
  type,
  task,
  onClose,
  defaultStatus,
}) => {
  const { createTask, updateTask, state } = useContext(DashboardContext);

  return (
    <div
      className="fixed w-full h-full bg-neutral-500/20 left-0 top-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/4 rounded shadow-md shadow-neutral-200/50 px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{Title[type]}</h2>

        <TaskModalForm
          onSubmit={(data: TaskSchema) => {
            if (!state.dashboard) {
              console.log("Dashboard was not found");
              return;
            }

            if (type === ModalAction.CREATE) {
              createTask({
                ...data,
                dashboardId: state.dashboard.id,
                status: parseInt(data.status.value),
              });
            } else if (task && ModalAction.UPDATE) {
              updateTask({
                ...task,
                ...data,
                oldStatus: task.status,
                dashboardId: state.dashboard.id,
                status: parseInt(data.status.value),
              });
            } else {
              console.error("Something went wrong");
            }
            onClose();
          }}
          task={task}
          defaultStatus={defaultStatus}
        />
      </div>
    </div>
  );
};

export { TaskModal };
