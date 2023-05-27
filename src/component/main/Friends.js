import React, { useState, useEffect } from "react";
import Card from "./Card";
import { NavMain } from "./NavMain";
import Heading from "./Header";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

function CreateCard(contact, status) {
  const { username, portraitURL, email } = contact;

  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={username}
      img={portraitURL}
      email={email}
      status={status}
    />
  );
}


function Friends() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    username: ""
  });

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userRef = firebase.firestore().collection("users").where("username", "==", formData.username);
    const querySnapshot = await userRef.get();

    if (querySnapshot.empty) {
      console.error("User not found");
      return;
    }

    const user = querySnapshot.docs[0].data();
    const currentUserEmail = firebase.auth().currentUser.email;

    const senderNotificationRef = firebase
      .firestore()
      .collection("notifications")
      .doc(currentUserEmail)
      .collection("friend_requests")
      .doc(user.email);

    const receiverNotificationRef = firebase
      .firestore()
      .collection("notifications")
      .doc(user.email)
      .collection("friend_requests")
      .doc(currentUserEmail);

    const senderNotificationSnapshot = await senderNotificationRef.get();

    if (senderNotificationSnapshot.exists) {
      const senderNotificationData = senderNotificationSnapshot.data();

      if (senderNotificationData.type === "friend_request_denied") {
        await senderNotificationRef.delete();
        await receiverNotificationRef.delete();
      } else {
        console.error("Friend request already sent");
        return;
      }
    }

    const receiverNotificationSnapshot = await receiverNotificationRef.get();

    if (receiverNotificationSnapshot.exists) {
      console.error("Friend request already exists");
      return;
    }

    await senderNotificationRef.set({
      type: "friend_request_sent",
      sender: currentUserEmail,
      receiver: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });

    await receiverNotificationRef.set({
      type: "friend_request",
      sender: currentUserEmail,
      receiver: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });

    console.log("Friend request sent successfully!");

    setFormData({
      username: ""
    });
  };

  // since when user sign up, the user is the first friend of himself
  // so do not show the current user in the friend list

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
        .onSnapshot((snapshot) => {
          const newUsers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(newUsers);
        });

      return () => unsubscribe();
    }
  }, []);




  return (
    <div className="containers">
      <Heading />
      <div className="padd240">
        <NavMain />
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
          <input type="text" value={searchValue} onChange={handleChange} placeholder="Search friends by name" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username" />
          <button type="submit">Send Friend Request</button>
        </form>
        <div className="card-container">
          <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
          {users.map((user) => CreateCard(user, "friend"))}
        </div>
      </div>
    </div>
  );
}

export default Friends;
