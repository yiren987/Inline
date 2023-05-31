import React from "react";
import Avatar from "./Avatar";

function Card(props) {
  return (
    <div className="card">
      <div className="friendList">
        <Avatar img={props.img} />
        <a
          className="name"
          href={props.profile}
          target="_blank"
          rel="noreferrer noopener"
        >
          {props.name}
        </a>
        <button className="btn btn-primary deleteButton">Delete</button>
      </div>
    </div>
  );
}
export default Card;
