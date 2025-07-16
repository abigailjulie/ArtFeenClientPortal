import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useGetClientsQuery } from "../../features/clients/clientsApiSlice";
import { showToast } from "../../utils/showToast";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import usePersist from "../../hooks/usePersist";
import Loader from "../Loader";
import DynButton from "../DynButton";

export default function LoginForm() {
  const clientRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const { client, isLoading: clientLoading } = useGetClientsQuery(
    "clientsList",
    {
      selectFromResult: ({ data, isLoading }) => ({
        isLoading,
        client: data?.ids
          .map((id) => data.entities[id])
          .find((c) => c.username === username),
      }),
      skip: !isRedirecting,
    }
  );

  useEffect(() => {
    clientRef.current.focus();
  }, []);

  useEffect(() => {
    if (isRedirecting && !clientLoading && client) {
      navigate(`/dash/clients/${client._id}/projects`);
    }
  }, [isRedirecting, client, clientLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setIsRedirecting(true);
    } catch (error) {
      let message;
      if (!error.status) {
        message = "No Server Response";
      } else if (error.status === 400) {
        message = "Missing Username or Password";
      } else if (error.status === 401) {
        message = "Unauthorized";
      } else {
        message = error?.data?.message || "Login Failed";
      }

      showToast.error(message);
      setIsRedirecting(false);
    }
  };

  const handleClientInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  if (loginLoading || (isRedirecting && clientLoading)) return <Loader />;

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
            autoComplete="off"
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
          <DynButton type="submit" show={true}>
            Sign In
          </DynButton>
        </Col>
      </Row>
    </Form>
  );
}
