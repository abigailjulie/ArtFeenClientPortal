import { Link } from "react-router-dom";
import LoginForm from "../../components/login/LoginForm";
import useTitle from "../../hooks/useTitle";

export default function Login() {
  useTitle("The ArchWay | Login");
  return (
    <section className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3">
      <header>
        <h1 className="responsive-heading">Login</h1>
        <p>A new way of connected clients to the architecture process.</p>
      </header>

      <main className="w-100 px-5">
        <LoginForm />
      </main>

      <footer className="d-flex flex-column align-items-center gap-2 mt-4">
        <Link
          className="link-dark link-opacity-75 link-offset-2"
          to="/register"
        >
          Create Account
        </Link>
        <Link className="link-dark link-opacity-75 link-offset-2" to="/">
          Back to Home
        </Link>
      </footer>
    </section>
  );
}
