import React, { useState } from "react";
import "./profileform.css";

function ProfileForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
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
            placeholder="Email"
            type=""
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
