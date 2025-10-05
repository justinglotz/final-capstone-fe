import firebase from 'firebase/app';
import 'firebase/auth';

// API CALLS FOR CONCERTS
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}concerts`;

// Function to get Firebase Token
const getFirebaseToken = async () => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  return currentUser.getIdToken();
};

// Create Concert
const createConcert = async (payload) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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

// Get Concerts by Username
const getConcerts = async (username) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}?username=${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to get concerts');
    }

    return await response.json();
  } catch (error) {
    console.error('getConcerts error: ', error);
    throw error;
  }
};

// Delete Concert
const deleteConcert = async (concertId) => {
  try {
    const response = await fetch(`${endpoint}/${concertId}`, {
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

// Add concert to profile (copy concert)
const addConcertToProfile = async (concertId) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/${concertId}/add-to-profile/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error('addConcertToProfile error:', error);
    throw error;
  }
};

// Get usernames of users who liked that concert
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

// Pin concert to profile
const pinConcert = async (userConcertId) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/pin_concert`, {
      method: 'POST',
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
    console.error('pinConcert error:', error);
    throw error;
  }
};

// Unpin concert from profile
const unpinConcert = async (userConcertId) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/unpin_concert`, {
      method: 'DELETE',
      body: JSON.stringify({
        user_concert: userConcertId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('unpinConcert error:', error);
    throw error;
  }
};

export { createConcert, getConcerts, deleteConcert, addConcertToProfile, getConcertLikes, pinConcert, unpinConcert, getFirebaseToken };
