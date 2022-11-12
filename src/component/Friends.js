import React from "react";
import Card from "./Card";
import contacts from "../db";

function createCard(contact) {
  return (
    <Card
      id={contact.id}
      name={contact.name}
      img={contact.imgURL}
      email={contact.email}
      tel={contact.phone}
    />
  );
}

function Friends() {
  return (
    <>
      <h1>Friends</h1>
      {contacts.map(createCard)}
    </>
  );
}

export default Friends;
