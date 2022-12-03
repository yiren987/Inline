import React from "react";
import Card from "./Card";
import contacts from "../db";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={contact.name}
      img={contact.imgURL}
      email={contact.email}
      tel={contact.phone}
      profile={contact.profileURL}
    />
  );
}

function Friends() {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
      {contacts.map(createCard)}
    </>
  );
}

export default Friends;
