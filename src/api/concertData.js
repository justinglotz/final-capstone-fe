// API CALLS FOR CONCERTS
const endpoint = 'http://127.0.0.1:8000/concerts';

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

const getConcerts = async (username) => {
  try {
    const response = await fetch(`${endpoint}?username=${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to get concerts for ${username}`);
    }
    return await response.json();
  } catch (error) {
    console.error('getConcerts error:', error);
    throw error;
  }
};

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

// eslint-disable-next-line import/prefer-default-export
export { createConcert, getConcerts, deleteConcert, addConcertToProfile };
