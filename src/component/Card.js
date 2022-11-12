import React from "react";
import Avatar from "./Avatar";

function Card(props) {
  return (
    <div className="card">
      <div className="friendList">
        <Avatar img={props.img} />
        <p className="name">{props.name}</p>
      </div>
    </div>
  );
}
export default Card;
