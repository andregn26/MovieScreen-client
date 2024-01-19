import React from "react";
import { Link } from "react-router-dom";
import "./FriendsSuggestions.scss";

export const FriendsSuggestions = ({ users }) => {
  return (
    <>
      {users && (
        <article key={users._id}>
          <Link
            to={`/profile/${users.username}`}
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            <div>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
                src={users.profileImg}
                alt="profilepicture"
              />

              <p>{users.username}</p>
              <p style={{ textAlign: "center" }}>
                <small>{users.country}</small>
              </p>
            </div>
          </Link>
        </article>
      )}
    </>
  );
};
