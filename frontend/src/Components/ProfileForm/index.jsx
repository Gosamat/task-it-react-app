import React, { useContext } from "react";

import "./index.css";

export function ProfileForm() {


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
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
            //onChange={(e) => setUsername(e.target.value)}
            //placeholder={loggedUser.username}
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
