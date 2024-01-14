import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateSchema,
  createSchema,
} from "../../common/schema/dashboard.schema.ts";

type ModalProps = {
  onSubmit: (data: CreateSchema) => void;
};

const CreateModalForm: React.FC<ModalProps> = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<CreateSchema>({
    resolver: yupResolver(createSchema),
  });

  const submitHandler: SubmitHandler<CreateSchema> = (data) => {
    onSubmit(data);
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

      <button className="w-full py-2 border border-indigo-500 rounded text-indigo-500 transition hover:bg-indigo-500 hover:text-white mt-4">
        Create
      </button>
    </form>
  );
};

export { CreateModalForm };
