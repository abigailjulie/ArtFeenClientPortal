import useNewClientForm from "../../hooks/clients/useNewClientForm";
import NewClientForm from "../clients/NewClientForm";
import useTitle from "../../hooks/useTitle";

export default function NewClient() {
  useTitle("The ArchWay | Register");
  const { state, validation, clicked } = useNewClientForm();

  const isPublicRoute = location.pathname === "/register";
  const publicStyle = { margin: "3rem 5rem 5rem 5rem", paddingBottom: "5rem" };

  return (
    <div style={isPublicRoute ? publicStyle : undefined}>
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        New Client
      </h2>
      <div className="container-md">
        <NewClientForm
          state={state}
          validation={validation}
          clicked={clicked}
        />
      </div>
    </div>
  );
}
