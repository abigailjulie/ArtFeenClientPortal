import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./features/public/Public";
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
import ClientProjectsList from "./features/clients/ClientProjectsList";
import ProjectProfileForm from "./features/projects/ProjectProfileForm";

import "./index.css";
import Prefetch from "./features/auth/Prefetch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register/clients" element={<NewClientForm />} />

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            {/* <Route index element={<Public />} /> */}

            <Route path="clients">
              <Route index element={<ClientsList />} />
              <Route path=":clientId" element={<EditClientProfile />}>
                <Route index element={<ClientProfile />} />
                <Route path="projects">
                  <Route index element={<ClientProjectsList />} />
                  <Route path="new" element={<NewProject />} />
                  <Route
                    path=":projectId/profile"
                    element={<ProjectProfileForm />}
                  />
                </Route>
              </Route>
            </Route>

            <Route path="projects">
              <Route index element={<ProjectsList />} />
              <Route path=":projectId" element={<EditProject />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
