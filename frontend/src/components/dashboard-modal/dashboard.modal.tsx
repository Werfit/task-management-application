import { CreateModalForm } from "./form.component.tsx";
import { useContext } from "react";
import { DashboardContext } from "../../context/dashboard/dashboard.context.tsx";
import { CreateSchema } from "../../common/schema/dashboard.schema.ts";

type ModalProps = {
  onClose: () => void;
};

const DashboardModal: React.FC<ModalProps> = ({ onClose }) => {
  const { createDashboard } = useContext(DashboardContext);

  return (
    <div
      className="fixed w-full h-full bg-neutral-500/20 left-0 top-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/4 rounded shadow-md shadow-neutral-200/50 px-6 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create dashboard</h2>

        <CreateModalForm
          onSubmit={(data: CreateSchema) => {
            createDashboard(data);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export { DashboardModal };
