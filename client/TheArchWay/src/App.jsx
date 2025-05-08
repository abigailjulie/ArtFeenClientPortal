import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./features/public/Public";
import DashLayout from "./features/clients/DashLayout";
import Profile from "./features/projects/Profile";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import ClientsList from "./features/clients/ClientsList";
import ProjectsList from "./features/projects/ProjectsList";
import NewClientForm from "./features/clients/NewClientForm";
import EditClient from "./features/clients/EditClient";
import NewProject from "./features/projects/NewProject";
import EditProject from "./features/projects/EditProject";

import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="clients">
            <Route index element={<ClientsList />} />
            <Route path=":id" element={<EditClient />} />
            <Route path="new" element={<NewClientForm />} />
          </Route>

          <Route path="projects">
            <Route index element={<ProjectsList />} />
            <Route path=":id" element={<EditProject />} />
            <Route path="new" element={<NewProject />} />
          </Route>

          <Route path="profile">
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
