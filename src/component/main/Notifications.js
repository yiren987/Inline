import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Heading from "./Header";
import { NavMain } from "./NavMain";

function Notifications() {
  // inside the notifications collection, -> document -> friend_request collections
  // -> document -> sender, receiver, timestamp, status

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const currentUserEmail = firebase.auth().currentUser.email;
    const unsubscribe = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests").onSnapshot((snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  const handleAcceptFriendRequest = async (notification) => {
    const currentUserID = firebase.auth().currentUser.uid;
    const currentUserRef = firebase.firestore().collection("users").doc(currentUserID);
    const currentUserSnapshot = await currentUserRef.get();
    const currentUserData = currentUserSnapshot.data();
    const currentUserEmail = currentUserData.email;

    // Update the status of the friend request to "accepted" in the currentUser's friend_requests collection
    const currentUserNotificationRef = firebase
      .firestore()
      .collection("notifications")
      .doc(currentUserEmail)
      .collection("friend_requests")
      .doc(notification.sender);

    await currentUserNotificationRef.update({
      status: "accepted",
    });

    const senderUserRef = firebase.firestore().collection("users").where("email", "==", notification.sender);
    const senderUserSnapshot = await senderUserRef.get();

    if (senderUserSnapshot.empty) {
      console.log("Sender user not found");
      return; // or handle the case when the sender user is not found
    }

    const senderUserData = senderUserSnapshot.docs[0].data();
    // console.log("Sender User Data", senderUserData);
    const senderUserID = senderUserSnapshot.docs[0].id;

    // console.log("receiverUserID", currentUserID);
    // console.log("Sender User ID", senderUserID);

    // Add the sender as a friend in the currentUser's friends collection
    const currentUserFriendsRef = currentUserRef.collection("friends").doc(notification.sender);
    await currentUserFriendsRef.set({
      email: notification.sender,
      status: "accepted",
      username: senderUserData.username || "",
      portraitURL: senderUserData.portraitURL || "",
    });

    // Add the currentUser as a friend in the sender's friends collection
    const senderFriendsRef = firebase.firestore().collection("users").doc(senderUserID).collection("friends").doc(currentUserEmail);

    await senderFriendsRef.set({
      email: currentUserEmail,
      status: "accepted",
      username: currentUserData.username || "",
      portraitURL: currentUserData.portraitURL || "",
    });

    // Notify the sender that the friend request was accepted
    const senderNotificationRef = firebase
      .firestore()
      .collection("notifications")
      .doc(notification.sender)
      .collection("friend_requests")
      .doc(currentUserEmail);

    await senderNotificationRef.set({
      type: "friend_request_accepted",
      sender: currentUserEmail,
      receiver: notification.sender,
      username: currentUserData.username || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread",
    });
  };







  const handleDenyFriendRequest = async (notification) => {
    // Remove the friend_requests document instead of updating its status
    const currentUserEmail = firebase.auth().currentUser.email;
    const currentUserNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests").doc(notification.sender);
    await currentUserNotificationRef.delete();

    // Notify the sender that the request was denied
    const senderNotificationRef = firebase.firestore().collection("notifications").doc(notification.sender).collection("friend_requests").doc(currentUserEmail);
    await senderNotificationRef.set({
      type: "friend_request_denied",
      sender: firebase.auth().currentUser.email,
      receiver: notification.sender,
      username: notification.username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });
  };


  const handleNotificationClick = async (notification) => {
    // Update the status of the notification to "read", so it will no longer be bold, and keep that display on the screen
    const currentUserEmail = firebase.auth().currentUser.email;
    const currentUserNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests").doc(notification.sender);
    await currentUserNotificationRef.update({
      status: "read"
    });

    // Update the status for sender if receiver has read the notification
    const senderNotificationRef = firebase.firestore().collection("notifications").doc(notification.sender).collection("friend_requests").doc(currentUserEmail);
    await senderNotificationRef.update({
      status: "read"
    });

  };

  const handleClearNotifications = async () => {
    // delete all notifications from the notifications collection
    const currentUserEmail = firebase.auth().currentUser.email;
    const currentUserNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests");
    const snapshot = await currentUserNotificationRef.get();
    snapshot.forEach((doc) => {
      doc.ref.delete();
    }
    );

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
                                <strong>{notification.sender}</strong> wants to be your friend.
                              </div>
                            ) : notification.type === "friend_request_sent" ? (
                              <div>
                                You sent a friend request to <strong>{notification.receiver}</strong>.
                              </div>
                            )
                              : notification.type === "friend_request_accepted" ? (
                                <div>
                                  <strong>{notification.sender}</strong> accepted your friend request.
                                </div>
                              ) : notification.type === "friend_request_denied" ? (
                                <div>
                                  <strong>{notification.sender}</strong> denied your friend request.
                                </div>
                              ) : (
                                <div>Unknown notification type</div>
                              )}
                          </td>

                          <td>{notification.timestamp && notification.timestamp.toDate().toLocaleString()}</td>
                          <td>{notification.status}</td>
                          <td>
                            {notification.type === "friend_request" && (
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
                            )}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4">No notifications</td>
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