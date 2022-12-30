import React from "react";
import Card from "./Card";
import contacts from "../../db";
import { NavMain } from "./NavMain";
import Heading from "./Header";

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
    <div className="containers">
      <Heading />
      <div className="padd240">
        <NavMain />
        <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
        {contacts.map(createCard)}
      </div>
    </div>
  );
}

export default Friends;
