import * as yup from "yup";

const searchSchema = yup.object({
  id: yup.string().trim().required(),
});

const createSchema = yup.object({
  title: yup.string().trim().required(),
});

type SearchSchema = {
  id: string;
};

type CreateSchema = {
  title: string;
};

export { searchSchema, createSchema };
export type { SearchSchema, CreateSchema };
