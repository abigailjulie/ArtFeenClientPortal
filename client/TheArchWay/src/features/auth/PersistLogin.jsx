import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Spinner } from "react-bootstrap";

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log("Token refresh failed:", error);
        }
      };
      if (!token && persist) {
        verifyRefreshToken();
      }
    }
    return () => (effectRan.current = true);
  }, []);

  if (!persist) {
    return <Outlet />;
  } else if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  } else if (isError) {
    return (
      <p>
        {error.data?.message} <Link to="/login">Please log in again.</Link>
      </p>
    );
  } else if ((isSuccess && trueSuccess) || (token && isUninitialized)) {
    return <Outlet />;
  } else {
    return null;
  }
}
