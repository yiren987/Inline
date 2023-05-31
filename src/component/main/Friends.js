import React, { useState, useEffect } from "react";
import Card from "./Card";
import { NavMain } from "./NavMain";
import Heading from "./Header";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

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
    username: "",
  });

  const [showNotifications, setShowNotifications] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userRef = firebase
      .firestore()
      .collection("users")
      .where("username", "==", formData.username);
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
      status: "unread",
    });

    await receiverNotificationRef.set({
      type: "friend_request",
      sender: currentUserEmail,
      receiver: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread",
    });

    // console.log("Friend request sent successfully!");
    setShowNotifications(true);

    setTimeout(() => {
      setShowNotifications(false);
    }, 3000);

    setFormData({
      username: "",
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
        .doc(currentUser.uid)
        .collection("friends")
        .where("status", "==", "accepted")
        .onSnapshot((snapshot) => {
          const newFriends = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(newFriends);
        });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="containers">
      <Heading />
      <div className="padd240">
        <NavMain />
        <form onSubmit={handleFormSubmit} style={{ padding: "10px 5px" }}>
          <input
            type="text"
            style={{ border: "solid 1px rgb(46, 73, 81)", marginRight: "10px" }}
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            placeholder="Username"
          />
          <button
            type="submit"
            style={{
              paddingLeft: "10px",
              backgroundColor: "#87cbe6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Send Friend Request
          </button>
        </form>
        <div className="card-container">
          <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
          {users.map((user) => CreateCard(user, "friend"))}
        </div>
      </div>
      {showNotifications && (
        <div
          className="alert alert-success mt-3"
          style={{
            position: "fixed",
            left: "50%",
            opacity: "0.5",
          }}
          role="alert"
        >
          <p>Friend request sent successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Friends;
