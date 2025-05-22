import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import LoginForm from "../../components/login/LoginForm";

export default function Login() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"var(--Forest)"} />;

  return (
    <section className="h-100 d-flex flex-column justify-content-center align-items-center">
      <header>
        <h1 style={{ fontSize: "var(--ft-Exlarge)" }}>Login</h1>
        <p>A new way of connected clients to the architecture process.</p>
      </header>

      <main className="w-75">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <LoginForm />
      </main>

      <footer className="d-flex flex-column text-center">
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
