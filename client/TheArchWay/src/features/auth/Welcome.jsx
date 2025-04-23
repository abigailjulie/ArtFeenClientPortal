import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);
  return (
    <section>
      <p>{today}</p>
      <h1>Welcome</h1>
      <p>
        <Link to="/dash/clients">View client Settings</Link>
      </p>
    </section>
  );
}
