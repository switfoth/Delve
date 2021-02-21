import React, { useState } from "react";
import "./profileform.css";

function ProfileForm({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <div className="profile-box">
      <h1>Profile Page</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <h3>Username</h3>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          <h3>Email</h3>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        <button type="submit">Edit Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
