import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Spinner from "react-bootstrap/Spinner";

export default function Login() {
  const clientRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    clientRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (error) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleClientInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <Spinner animation="border" />;

  return (
    <section className="h-100 d-flex flex-column justify-content-center align-items-center">
      <header>
        <h1>Login</h1>
        <p>A new way of connected clients to the architecture process.</p>
      </header>

      <main>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={clientRef}
            value={username}
            onChange={handleClientInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="ppassword"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button>Sign In</button>
        </form>
        <p className="d-flex flex-column">
          <Link to="/register/clients">Register clients</Link>
          <Link to="/register/admin">Register Admin</Link>
        </p>
      </main>

      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
}
