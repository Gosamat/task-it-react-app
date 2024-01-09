import React, { useContext } from "react";
import {
  AuthDispatchContext,
  AuthStateContext,
} from "../../Context/AuthContext";
import "./index.css";

export function ProfileForm() {
  const { setUsername, updateUser } = useContext(AuthDispatchContext);
  const { loggedUser, username } = useContext(AuthStateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(username);
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>{loggedUser.username}'s Profile</h2>
      </header>
      <div className="profile-description">
        <h4>Description</h4>
        <p>
          This is your Profile Page. Pretty Barren, I know, but this is simply
          for mock purposes. In a real scenario, you would be able to make a
          bio, manage multiple To-do lists and such, all from your profile page.
        </p>
      </div>
      <form>
        <div className="form-row">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={loggedUser.username}
          />
          <span>Change Username?</span>
        </div>
        <div className="form-row">
          <button
            className="btn-profile-submit"
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
