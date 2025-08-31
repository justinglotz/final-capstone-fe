import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR FOLLOWERS
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}follow`;

const followUser = (targetUsername) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}`, {
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

// eslint-disable-next-line import/prefer-default-export
export { followUser };
