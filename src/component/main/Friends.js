import React, { useState, useEffect } from "react";
import Card from "./Card";
import { NavMain } from "./NavMain";
import Heading from "./Header";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

function createCard(contact) {
  const addFriend = () => {
    firebase.firestore().collection("friends").add({
      name: contact.name,
      imgURL: contact.imgURL,
      phone: contact.phone,
      email: contact.email,
      profileURL: contact.profileURL
    })
    .then(() => {
      console.log("Friend added successfully!");
    })
    .catch((error) => {
      console.error("Error adding friend: ", error);
    });
  };

  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={contact.name}
      img={contact.imgURL}
      email={contact.email}
      tel={contact.phone}
      profile={contact.profileURL}
    >
      <button onClick={addFriend}>Add Friend</button>
    </Card>
  );
}

function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("friends")
      .onSnapshot((snapshot) => {
        const newFriends = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFriends(newFriends);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="containers">
      <Heading />
      <div className="padd240">
        <NavMain />
        <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
        {friends.map(createCard)}
      </div>
    </div>
  );
}

export default Friends;