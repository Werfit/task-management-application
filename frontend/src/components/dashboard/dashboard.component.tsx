import { Column } from "./components/column.component.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DashboardContext } from "../../context/dashboard/dashboard.context.tsx";
import { useCallback, useContext, useState } from "react";
import {
  Task,
  TaskColumn,
} from "../../context/dashboard/dashboard.interface.ts";
import { TaskModal } from "../task-modal/modal.component.tsx";
import { ModalAction } from "../task-modal/modal.enum.ts";

const Dashboard = () => {
  const { state } = useContext(DashboardContext);
  const [modalData, setModalData] = useState<{
    type: ModalAction;
    task?: Task;
    defaultStatus: TaskColumn;
  } | null>(null);

  const createTask = useCallback((status: TaskColumn) => {
    setModalData({
      type: ModalAction.CREATE,
      defaultStatus: status,
    });
  }, []);

  const updateTask = useCallback((task: Task) => {
    setModalData({
      type: ModalAction.UPDATE,
      task,
      defaultStatus: task.status,
    });
  }, []);

  return (
    <div>
      <p className="text-sm text-neutral-500 tracking-widest font-semibold">
        {state.dashboard?.title}
      </p>

      <div className="flex w-full mt-8 overflow-x-auto gap-4">
        <DndProvider backend={HTML5Backend}>
          <Column
            title="TODO"
            color="yellow"
            status={TaskColumn.TODO}
            tasks={state.tasks["TODO"]}
            onCreate={createTask}
            onUpdate={updateTask}
          />
          <Column
            title="In Progress"
            color="purple"
            status={TaskColumn.IN_PROGRESS}
            tasks={state.tasks["IN_PROGRESS"]}
            onCreate={createTask}
            onUpdate={updateTask}
          />
          <Column
            title="Done"
            color="green"
            status={TaskColumn.DONE}
            tasks={state.tasks["DONE"]}
            onCreate={createTask}
            onUpdate={updateTask}
          />
        </DndProvider>
      </div>

      {modalData && (
        <TaskModal
          type={modalData.type}
          task={modalData.task}
          defaultStatus={modalData.defaultStatus}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export { Dashboard };
