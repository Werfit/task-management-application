import { useDrag } from "react-dnd";
import { DragType } from "../../../common/enums/dnd.enum.ts";
import { Task as ITask } from "../../../context/dashboard/dashboard.interface.ts";
import React, { useContext } from "react";
import { DashboardContext } from "../../../context/dashboard/dashboard.context.tsx";

type TaskOptions = {
  task: ITask;
  onUpdate: (task: ITask) => void;
};

const Task: React.FC<TaskOptions> = ({ task, onUpdate }) => {
  const { deleteTask } = useContext(DashboardContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragType.TASK,
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="bg-white py-2 px-3 rounded shadow-md shadow-neutral-100/50 flex flex-col gap-2"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>
        <h4 className="text-sm text-neutral-500">{task.title}</h4>
        <p className="">{task.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="flex-1 p-2 border border-amber-500 text-amber-500 rounded transition hover:bg-amber-500 hover:text-white"
          onClick={() => onUpdate(task)}
        >
          Edit
        </button>
        <button
          className="flex-1 p-2 border border-red-500 text-red-500 rounded transition hover:bg-red-500 hover:text-white"
          onClick={() => deleteTask({ id: task.id, status: task.status })}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export { Task };
