import * as yup from "yup";

const taskSchema = yup.object({
  title: yup.string().required().trim(),
  description: yup.string().required().trim(),
  status: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
});

type TaskSchema = {
  title: string;
  description: string;
  status: {
    label: string;
    value: string;
  };
};

export { taskSchema };
export type { TaskSchema };
