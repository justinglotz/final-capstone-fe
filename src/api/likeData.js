import 'firebase/auth';
import { getFirebaseToken } from './concertData';

// API CALLS FOR LIKES
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}likes`;

const likeConcert = async (userConcertId) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      body: JSON.stringify({
        user_concert: userConcertId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('likeConcert error: ', error);
    throw error;
  }
};

const unlikeConcert = async (userConcertId) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/unlike_concert`, {
      method: 'DELETE',
      body: JSON.stringify({
        user_concert: userConcertId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('unlikeConcert error: ', error);
    throw error;
  }
};

export { likeConcert, unlikeConcert };
