import { useContext } from "react";
import { DashboardContext } from "../../context/dashboard/dashboard.context.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  searchSchema,
  SearchSchema,
} from "../../common/schema/dashboard.schema.ts";

type SearchBarOptions = {
  onCreate: () => void;
};

const SearchBar: React.FC<SearchBarOptions> = ({ onCreate }) => {
  const { getDashboard } = useContext(DashboardContext);
  const { register, handleSubmit } = useForm<SearchSchema>({
    resolver: yupResolver(searchSchema),
  });

  const submitHandler: SubmitHandler<SearchSchema> = (data) =>
    getDashboard(data);

  return (
    <nav className="w-full">
      <form className="flex gap-4" onSubmit={handleSubmit(submitHandler)}>
        <input
          className="flex-1 px-2 py-3 outline-none border-b-2 border-b-neutral-500 text-neutral-800 transition bg-transparent focus:bg-neutral-50"
          placeholder="Enter dashboard id"
          {...register("id")}
        />
        <button
          type="submit"
          className="border-2 outline-none border-indigo-500 text-indigo-500 px-4 py-2 rounded transition hover:bg-indigo-500 hover:text-white"
        >
          Search
        </button>
        <button
          type="submit"
          className="border-2 outline-none border-amber-500 text-amber-500 px-4 py-2 rounded transition hover:bg-amber-500 hover:text-white"
          onClick={onCreate}
        >
          Create
        </button>
      </form>
    </nav>
  );
};

export { SearchBar };
