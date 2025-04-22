import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="home" element={<Layout />}>
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
