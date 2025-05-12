import { store } from "../../app/store";
import { clientsApiSlice } from "../clients/clientsApiSlice";
import { projectsApiSlice } from "../projects/projectsApiSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Prefetch() {
  useEffect(() => {
    console.log("Subscribing");
    const clients = store.dispatch(
      clientsApiSlice.endpoints.getClients.initiate()
    );
    const projects = store.dispatch(
      projectsApiSlice.endpoints.getProjects.initiate()
    );

    return () => {
      console.log("Unsubscribing");
      clients.unsubscribe();
      projects.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
