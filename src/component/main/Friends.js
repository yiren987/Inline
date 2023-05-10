import React, { useState, useEffect } from "react";
import Card from "./Card";
import { NavMain } from "./NavMain";
import Heading from "./Header";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

function CreateCard(contact, status) {
  const { name, imgURL, phone, email, profileURL } = contact;

  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={name}
      img={imgURL}
      email={email}
      tel={phone}
      profile={profileURL}
      status={status}
    />
  );
}

function Friends() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    imgURL: "",
    phone: "",
    email: "",
    profileURL: "",
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
    const friendRef = firebase.firestore().collection("friends").doc(user.email);
    const friendSnapshot = await friendRef.get();
  
    if (friendSnapshot.exists) {
      console.error("Friend already added");
      return;
    }
  
    await friendRef.set({ ...user, status: "pending" });
    console.log("Friend request sent successfully!");
  
    const notificationRef = firebase.firestore().collection("notifications").doc(user.email);
    await notificationRef.set({
      type: "friend_request",
      sender: firebase.auth().currentUser.email,
      receiver: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });
    console.log("Notification sent successfully!");
  
    setFormData({
      name: "",
      imgURL: "",
      phone: "",
      email: "",
      profileURL: "",
      username: ""
    });
  };
  
  

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("name", ">=", searchValue)
      .onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(newUsers);
      });
  
    return () => unsubscribe();
  }, [searchValue]);  

  return (
    <div className="containers">
      <Heading />
      <div className="padd240">
        <NavMain />
        <h1 style={{ textAlign: "center", margin: "5px" }}>Friends</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input type="text" value={searchValue} onChange={handleChange} placeholder="Search friends by name" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username" />
          <button type="submit">Add Friend</button>
        </form>
        <div className="cards">
          {users.map((user) => CreateCard(user, "add"))}
        </div>
      </div>
    </div>
  );
}

export default Friends;
