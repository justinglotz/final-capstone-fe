import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR LIKES
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}likes`;

const likeConcert = (userConcertId) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}`, {
          method: 'POST',
          body: JSON.stringify({
            user_concert: userConcertId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });

const unlikeConcert = (userConcertId) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}/unlike_concert`, {
          method: 'DELETE',
          body: JSON.stringify({
            user_concert: userConcertId,
          }),
          headers: {
            'Content-Type': 'application/json',
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

export { likeConcert, unlikeConcert };
