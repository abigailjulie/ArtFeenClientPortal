import React from "react";
import { Link } from "react-router-dom";

export default function Public() {
  return (
    <section>
      <p>Welcome to</p>
      <h1>The ArchWay</h1>
      <p>A new way of connected clients to the architecture process.</p>
      <p>
        <Link to="/login">Employee Login</Link>
      </p>
    </section>
  );
}
