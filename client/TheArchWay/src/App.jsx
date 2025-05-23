import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminWelcome from "./features/admin/AdminWelcome";
import Public from "./components/Public";
import DashLayout from "./features/clients/DashLayout";
import ClientProfile from "./features/projects/ClientProfile";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import ClientsList from "./features/clients/ClientsList";
import ProjectsList from "./features/projects/ProjectsList";
import NewClientForm from "./features/clients/NewClientForm";
import EditClientProfile from "./features/clients/EditClientProfile";
import NewProject from "./features/projects/NewProject";
import EditProject from "./features/projects/EditProject";
import ProjectProfileForm from "./features/projects/ProjectProfileForm";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Prefetch from "./features/auth/Prefetch";
import EditAdminCredentials from "./features/admin/EditAdminCredentials";
import ToastConfig from "./utils/ToastConfig";
import "./index.css";

export default function App() {
  useTitle("The ArchWay | Every Phase. One Platform");
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<NewClientForm />} />
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Public />} />
                  <Route path="admin" element={<AdminWelcome />}>
                    <Route path="edit" element={<EditAdminCredentials />} />
                  </Route>

                  <Route path="clients">
                    <Route index element={<ClientsList />} />
                    <Route path="new" element={<NewClientForm />} />

                    <Route path=":clientId">
                      <Route index element={<ClientProfile />} />
                      <Route path="edit" element={<EditClientProfile />} />
                      <Route path="projects">
                        <Route index element={<ProjectsList />} />
                        <Route path="new" element={<NewProject />} />
                        <Route path=":projectId">
                          <Route
                            path="profile"
                            element={<ProjectProfileForm />}
                          />
                          <Route path="edit" element={<EditProject />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Founder]}
                      />
                    }
                  >
                    <Route path="projects">
                      <Route index element={<ProjectsList />} />
                      <Route path=":projectId" element={<EditProject />} />
                    </Route>
                  </Route>
                </Route>
                {/*End Dash*/}
              </Route>
            </Route>
          </Route>
          {/*End Protected Routes*/}
        </Route>
      </Routes>
      <ToastConfig />
    </>
  );
}
