import useNewClientForm from "../../hooks/clients/useNewClientForm";
import NewClientForm from "../clients/NewClientForm";

export default function NewClient() {
  const { state, validation, clicked } = useNewClientForm();

  const isPublicRoute = location.pathname === "/register";
  const publicStyle = { margin: "3rem 5rem 5rem 5rem", paddingBottom: "5rem" };

  return (
    <div className="mb-5" style={isPublicRoute ? publicStyle : undefined}>
      {state?.isError && (
        <p className="text-danger">{state.error?.data?.message}</p>
      )}
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        New Client
      </h2>
      <NewClientForm state={state} validation={validation} clicked={clicked} />
    </div>
  );
}
