import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <section>
      <h1>Welcome</h1>
      <p>
        <Link to="/dash/clients">View client Settings</Link>
      </p>
    </section>
  );
}
