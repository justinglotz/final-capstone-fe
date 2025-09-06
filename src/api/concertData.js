import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR CONCERTS
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}concerts`;

// CREATE CONCERT
const createConcert = async (payload) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create concert');
    }

    return await response.json();
  } catch (error) {
    console.error('createConcert error:', error);
    throw error;
  }
};

// const getConcerts = async (username) => {
//   try {
//     firebase.auth().currentUser.getIdToken();
//     const response = await fetch(`${endpoint}?username=${username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to get concerts for ${username}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('getConcerts error:', error);
//     throw error;
//   }
// };

const getConcerts = (username) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        fetch(`${endpoint}?username=${username}`, {
          method: 'GET',
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

const deleteConcert = async (concertId, username) => {
  try {
    const response = await fetch(`${endpoint}/${concertId}/?username=${username}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete concert`);
    }
    return true;
  } catch (error) {
    console.error('deleteConcert error:', error);
    throw error;
  }
};

const addConcertToProfile = async (concertId, username) => {
  try {
    const response = await fetch(`${endpoint}/${concertId}/add-to-profile/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    return await response.json();
  } catch (error) {
    console.error('addConcertToProfile error:', error);
    throw error;
  }
};

const getConcertLikes = async (userConcertId) => {
  try {
    const response = await fetch(`${endpoint}/${userConcertId}/get_likes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error('getConcertLikes error:', error);
    throw error;
  }
};

export { createConcert, getConcerts, deleteConcert, addConcertToProfile, getConcertLikes };
