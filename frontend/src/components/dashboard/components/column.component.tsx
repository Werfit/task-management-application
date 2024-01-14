import { Task } from "./task.component.tsx";
import { useDrop } from "react-dnd";
import { DragType } from "../../../common/enums/dnd.enum.ts";
import { useContext } from "react";
import { DashboardContext } from "../../../context/dashboard/dashboard.context.tsx";
import { TaskColumn } from "../../../context/dashboard/dashboard.interface.ts";
import { Task as ITask } from "../../../context/dashboard/dashboard.interface.ts";

type Colors = "yellow" | "purple" | "green";

type ColumnProps = {
  title: string;
  color: Colors;
  status: TaskColumn;
  tasks: ITask[];
  onUpdate: (task: ITask) => void;
  onCreate: (status: TaskColumn) => void;
};

const BorderColors: Record<Colors, string> = {
  yellow: "border-amber-500",
  purple: "border-indigo-500",
  green: "border-emerald-500",
} as const;

const TextColors: Record<Colors, string> = {
  yellow: "text-amber-500",
  purple: "text-indigo-500",
  green: "text-emerald-500",
} as const;

const Column: React.FC<ColumnProps> = ({
  title,
  color,
  status,
  tasks,
  onCreate,
  onUpdate,
}) => {
  const { updateTask } = useContext(DashboardContext);
  const [_, drop] = useDrop(() => ({
    accept: DragType.TASK,
    drop: ({ task }: { task: ITask }) =>
      updateTask({ ...task, oldStatus: task.status, status }),
  }));

  return (
    <div className="flex-1" ref={drop}>
      <h1
        className={`text-center border-b-2 ${BorderColors[color]} ${TextColors[color]} font-semibold tracking-widest`}
      >
        {title}
      </h1>

      <div className="flex flex-col gap-4  mt-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onUpdate={onUpdate} />
        ))}

        <button
          className="border border-neutral-500 rounded py-2 text-center text-neutral-500 transition hover:bg-neutral-500/10 active:bg-neutral-500/20"
          onClick={() => onCreate(status)}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export { Column };
