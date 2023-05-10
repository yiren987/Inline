import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Heading from "./Header";
import { NavMain } from "./NavMain";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notifications")
      .where("receiver", "==", firebase.auth().currentUser.email)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const newNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(newNotifications);
      });

    return () => unsubscribe();
  }, []);

const handleAcceptFriendRequest = async (notification) => {

    // // Add the sender to the current user's friends list
    // const currentUserEmail = firebase.auth().currentUser.email;
    // await firebase.firestore().collection("users").doc(currentUserEmail).update({
    //   friends: firebase.firestore.FieldValue.arrayUnion(notification.sender)
    // });

    // // Update the friend request notification to reflect that it was accepted
    // await firebase.firestore().collection("notifications").doc(notification.id).update({
    //   status: "accepted"
    // });

    // // Add the current user to the sender's friends list
    // await firebase.firestore().collection("users").doc(notification.sender).update({
    //     friends: firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
    // });

  // Add the sender to the current user's friends list
  const currentUserEmail = firebase.auth().currentUser.email;
  await firebase.firestore().collection("users").doc(currentUserEmail).update({
    friends: firebase.firestore.FieldValue.arrayUnion(notification.sender)
  });

  // Update the friend request notification to reflect that it was accepted
  await firebase.firestore().collection("notifications").doc(notification.id).update({
    status: "accepted"
  });

  // Add the current user to the sender's friends list
  const senderDoc = await firebase.firestore().collection("users").doc(notification.sender).get();
  if (senderDoc.exists) {
    await firebase.firestore().collection("users").doc(notification.sender).update({
      friends: firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
    });
  } else {
    await firebase.firestore().collection("users").doc(notification.sender).set({
      email: notification.sender,
      friends: [currentUserEmail]
    });
  }
};


  const handleDenyFriendRequest = async (notification) => {
    // Update the friend request notification to reflect that it was denied
    await firebase.firestore().collection("notifications").doc(notification.id).update({
        status: "denied"
    });

    // delete so that user are able to resend friend request
    await firebase.firestore().collection("notifications").doc(notification.id).delete();
    
  };

  const handleNotificationClick = async (notification) => {
    // Update the status of the notification to "read", so it will no longer be bold, and keep that display on the screen
    if (notification.status === "unread") {
      await firebase.firestore().collection("notifications").doc(notification.id).update({
        status: "read"
      });
    }      

  };

  const handleClearNotifications = async () => {
    const currentUserEmail = firebase.auth().currentUser.email;
    const notificationsRef = firebase.firestore().collection("notifications")
      .where("receiver", "==", currentUserEmail);
    
    const notificationsSnapshot = await notificationsRef.get();

    const batch = firebase.firestore().batch();
    notificationsSnapshot.forEach((doc) => {
      batch.update(doc.ref, {status: "read"});
    });

    await batch.commit();
  };

  return (
    <div className="containers">
      <Heading />
      <NavMain />
      <div className="padd240">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Notification</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.length > 0 ? notifications.map((notification) => (
                        <tr
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`notification-row ${notification.status}`}
                        >
                          <td>
                            {notification.type === "friend_request" ? (
                              <div>
                                <
                                    strong>{notification.sender}</strong> sent you a friend request.
                                </div>
                            ) : null}
                            </td>
                            <td>{notification.timestamp ? notification.timestamp
                                .toDate()
                                .toLocaleDateString() : null}</td>
                            <td>{notification.status}</td>
                            <td>
                                {notification.type === "friend_request" ? (
                                    <div>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleAcceptFriendRequest(notification)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDenyFriendRequest(notification)}
                                        >
                                            Deny
                                        </button>
                                    </div>
                                ) : null}
                            </td>
                        </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No notifications to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                    <div className="card-footer">
                        <button
                            className="btn btn-danger"
                            onClick={handleClearNotifications}
                        >
                            Clear Notifications
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default Notifications;