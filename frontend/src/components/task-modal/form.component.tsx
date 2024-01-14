import Select from "react-tailwindcss-select";
import {
  Task,
  TaskColumn,
} from "../../context/dashboard/dashboard.interface.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskSchema, taskSchema } from "../../common/schema/task.schema.ts";
import { Option } from "react-tailwindcss-select/dist/components/type";

type ModalProps = {
  task?: Task;
  defaultStatus: TaskColumn;
  onSubmit: (data: TaskSchema) => void;
};

const options = Object.keys(TaskColumn)
  .filter((column) => Number.isNaN(parseInt(column)))
  .map((column) => ({
    value: TaskColumn[column as unknown as number],
    label: column.toString(),
  }));

const TaskModalForm: React.FC<ModalProps> = ({
  onSubmit,
  task,
  defaultStatus,
}) => {
  const { handleSubmit, register, setValue, watch } = useForm<TaskSchema>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      status: task
        ? { value: task.status.toString(), label: TaskColumn[task.status] }
        : {
            value: defaultStatus.toString(),
            label: TaskColumn[defaultStatus],
          },
      title: task?.title,
      description: task?.description,
    },
  });

  const selectValue = watch("status");

  const submitHandler: SubmitHandler<TaskSchema> = (data) => {
    onSubmit({
      ...(task ? task : {}),
      ...data,
    });
  };

  return (
    <form
      className="mt-4 flex flex-col gap-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        type="text"
        placeholder="Title"
        className="border border-neutral-300 text-neutral-500 bg-neutral-100/50 w-full px-2 py-1 rounded outline-none transition focus:bg-white"
        {...register("title")}
      />
      <textarea
        placeholder="Description"
        className="border border-neutral-300 text-neutral-500 bg-neutral-100/50 w-full px-2 py-1 rounded outline-none transition focus:bg-white"
        {...register("description")}
      ></textarea>

      <Select
        options={options}
        value={selectValue}
        onChange={(value) => {
          if (!value) {
            setValue("status", options[0]);
            return;
          }

          setValue("status", value as Option);
        }}
        primaryColor="primary"
      />

      <button className="w-full py-2 border border-indigo-500 rounded text-indigo-500 transition hover:bg-indigo-500 hover:text-white mt-4">
        Save
      </button>
    </form>
  );
};

export { TaskModalForm };
