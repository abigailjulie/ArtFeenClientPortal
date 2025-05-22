import { store } from "../../app/store";
import { clientsApiSlice } from "../clients/clientsApiSlice";
import { projectsApiSlice } from "../projects/projectsApiSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Prefetch() {
  useEffect(() => {
    store.dispatch(
      projectsApiSlice.util.prefetch("getProjects", "projectsList", {
        force: true,
      })
    );
    store.dispatch(
      clientsApiSlice.util.prefetch("getClients", "clientsList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
}
