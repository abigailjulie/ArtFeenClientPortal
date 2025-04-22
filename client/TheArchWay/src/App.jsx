import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./features/public/Public";
import DashLayout from "./features/clients/DashLayout";
import Home from "./pages/Home";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import ClientsList from "./features/clients/ClientsList";
import ProjectsList from "./features/projects/ProjectsList";
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
          </Route>

          <Route path="projects">
            <Route index element={<ProjectsList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
