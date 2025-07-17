import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { showToast } from "../../utils/showToast";

export const useDashNavigation = (client) => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const onNewProjectClicked = () => {
    if (client?._id) {
      navigate(`/dash/clients/${client._id}/projects/new`);
    } else {
      showToast.error("Client ID not found, unable to create project.");
    }
  };

  const onNewClientClicked = () => navigate("/dash/clients/new");

  const onProjectsClicked = () => {
    if (client?._id) {
      navigate(`/dash/clients/${client._id}/projects`);
    } else {
      navigate("/dash/projects");
    }
  };

  const onClientsClicked = () => navigate("/dash/clients");

  const handleGoHome = () => navigate("/dash");

  const onLogoutClicked = async () => {
    try {
      await sendLogout().unwrap();
      showToast.success("Logout successful");
      navigate("/", { replace: true });
    } catch (error) {
      const message = error?.data?.message || "Logout failed.";
      showToast.error(message, { toastId: "logout-error" });
    }
  };

  return {
    onNewProjectClicked,
    onNewClientClicked,
    onProjectsClicked,
    onClientsClicked,
    handleGoHome,
    onLogoutClicked,
  };
};
