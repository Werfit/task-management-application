import { SearchBar } from "./search-bar/search-bar.component.tsx";
import { Dashboard } from "./dashboard/dashboard.component.tsx";
import { useContext, useEffect, useState } from "react";
import { DashboardModal } from "./dashboard-modal/dashboard.modal.tsx";
import { DashboardContext } from "../context/dashboard/dashboard.context.tsx";
import { useParams, useNavigate } from "react-router-dom";

const App = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { state, getDashboard } = useContext(DashboardContext);
  const params = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!params.id) {
      return;
    }

    getDashboard({ id: params.id });
  }, []);

  useEffect(() => {
    if (!state.dashboard) {
      return;
    }

    console.log("aaiaiai");
    navigation(`/${state.dashboard.id}`, { replace: true });
  }, [state.dashboard, navigation]);

  return (
    <div className="container mx-auto py-4 flex flex-col gap-4">
      <SearchBar onCreate={() => setShowCreateModal(true)} />
      {state.dashboard && <Dashboard />}

      {showCreateModal && (
        <DashboardModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export { App };
