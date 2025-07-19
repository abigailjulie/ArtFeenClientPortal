import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

export default function Welcome() {
  useTitle("The ArchWay | Welcome");
  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3"
      style={{
        backgroundColor: "var(--Forest)",
        color: "var(--White)",
      }}
    >
      <h1 className="text-white" style={{ fontSize: "var(--ft-Exlarge)" }}>
        The ArchWay
      </h1>

      <p>One platform for architects and clients from concept to completion.</p>

      <p className="d-flex flex-column link-opacity-75 link-offset-2">
        <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
