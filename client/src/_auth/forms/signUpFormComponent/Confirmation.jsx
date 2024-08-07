import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => (
  <div className="confirmation">
    <h2>Confirmation</h2>
    <p>Thank you for signing up!</p>
    <Link to="/sign-in">Sign In</Link>
  </div>
);

export default Confirmation;
