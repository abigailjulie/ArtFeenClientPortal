import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashLayout from "./features/clients/DashLayout";
import ClientProfile from "./features/clients/ClientProfile";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import ClientsList from "./features/clients/ClientsList";
import ProjectsList from "./features/projects/ProjectsList";
import NewClient from "./features/clients/NewClient";
import EditClientProfile from "./features/clients/EditClientProfile";
import NewProject from "./features/projects/NewProject";
import EditProject from "./features/projects/EditProject";
import ProjectProfile from "./features/projects/ProjectProfile";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Prefetch from "./features/auth/Prefetch";
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
          <Route path="register" element={<NewClient />} />
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route path="clients">
                    <Route index element={<ClientsList />} />
                    <Route path="new" element={<NewClient />} />

                    <Route path=":clientId">
                      <Route index element={<ClientProfile />} />
                      <Route path="edit" element={<EditClientProfile />} />
                      <Route path="projects">
                        <Route index element={<ProjectsList />} />
                        <Route path="new" element={<NewProject />} />
                        <Route path=":projectId">
                          <Route path="profile" element={<ProjectProfile />} />
                          <Route path="edit" element={<EditProject />} />
                        </Route>
                      </Route>
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
