import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR FOLLOWERS
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}`;

const followUser = (targetUsername) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}follow`, {
          method: 'POST',
          body: JSON.stringify({
            firebase_token: token,
            target_username: targetUsername,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });

const unfollowUser = (targetUsername) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}follow/unfollow?username=${targetUsername}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);
            return resp;
          })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });

const getFollowStatus = (username) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}follow/follow_status?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            if (!resp.ok) throw new Error(`HTTP error! Status: ${resp.status}`);
            return resp.json();
          })
          .then(resolve)
          .catch(reject);
      });
  });

export { followUser, getFollowStatus, unfollowUser };
