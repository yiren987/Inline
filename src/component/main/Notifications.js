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

    // users collection contains users with their email address, 
    // and that conatins some fields such as email, username, portraitURL, and contains another friends collection
    // inside that friends collection, there is a document for each friend, and that document contains the status of the friend request
    // such email, username, portraitURL, and status
    // status can be "pending", "accepted", or "denied"
    // if the status is "pending", then the friend request is still pending
    // if the status is "accepted", then the friend request is accepted
    // if the status is "denied", then the friend request is denied

    // add the friend to the friends collection inside the users collection
    const currentUserEmail = firebase.auth().currentUser.email;
    const currentUserDoc = await firebase.firestore().collection("users").doc(currentUserEmail).get();
    const currentUserFriends = currentUserDoc.data().friends;
    const updatedCurrentUserFriends = [...currentUserFriends, notification.sender];
    await firebase.firestore().collection("users").doc(currentUserEmail).update({
      friends: updatedCurrentUserFriends
    });

    // update friend_requests collection inside the notifications collection, which update the status for that request to "accepted"
    const currentUserNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests").doc(notification.sender);
    await currentUserNotificationRef.update({
      status: "accepted"
    });

    // update both the sender and receiver notifications to reflect that the request was accepted
    const senderNotificationRef = firebase.firestore().collection("notifications").doc(notification.sender);
    await senderNotificationRef.set({
      type: "friend_request_accepted",
      sender: firebase.auth().currentUser.email,
      receiver: notification.sender,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });

    const receiverNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail);
    await receiverNotificationRef.set({
      type: "friend_request_accepted",
      sender: firebase.auth().currentUser.email,
      receiver: currentUserEmail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });

  };


  const handleDenyFriendRequest = async (notification) => {
    // update friend_requests collection inside the notifications collection, which update the status for that request to "denied"
    const currentUserEmail = firebase.auth().currentUser.email;
    const currentUserNotificationRef = firebase.firestore().collection("notifications").doc(currentUserEmail).collection("friend_requests").doc(notification.sender);
    await currentUserNotificationRef.update({
      status: "denied"
    });

    // only update the sender notification to reflect that the request was denied
    const senderNotificationRef = firebase.firestore().collection("notifications").doc(notification.sender);
    await senderNotificationRef.set({
      type: "friend_request_denied",
      sender: firebase.auth().currentUser.email,
      receiver: notification.sender,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread"
    });
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