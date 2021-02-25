import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let errors = useSelector(state => state.session.errors)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ username, password }))
  };

  return (
    <div className="login-container">
      <h1 id="login-form-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
