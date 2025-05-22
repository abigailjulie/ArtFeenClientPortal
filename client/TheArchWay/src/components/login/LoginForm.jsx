import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PulseLoader from "react-spinners/PulseLoader";
import usePersist from "../../hooks/usePersist";

export default function LoginForm() {
  const clientRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

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
        setErrMsg(error?.data?.message);
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleClientInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <Form.Label htmlFor="username" visuallyHidden>
            Username
          </Form.Label>
          <Form.Control
            type="text"
            id="username"
            ref={clientRef}
            value={username}
            placeholder="Username"
            onChange={handleClientInput}
            autoComplete="off"
            required
          />
        </Col>

        <Col xs={12} md={6}>
          <Form.Label htmlFor="password" visuallyHidden>
            Password
          </Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePwdInput}
            required
          />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs="auto" className="my-1 d-flex align-items-center">
          <Form.Check
            type="checkbox"
            id="persist"
            label="Trust This Device"
            onChange={handleToggle}
            checked={persist}
          />
        </Col>
        <Col xs="auto" className="my-1 ms-auto">
          <Button type="submit">Sign In</Button>
        </Col>
      </Row>
    </Form>
  );
}
