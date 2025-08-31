import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR NEWS FEED
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}news-feed/`;

const getNewsFeed = () =>
  new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user
      .getIdToken()
      .then((token) => {
        fetch(`${endpoint}`, {
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
      })
      .catch(reject);
  });

export default getNewsFeed;
