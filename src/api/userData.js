// API CALLS FOR USER INFO
// const endpoint = 'http://127.0.0.1:8000/users';
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}users`;

// CREATE USER
const createUser = async (payload) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  } catch (error) {
    console.error('createUser error:', error);
    throw error;
  }
};

// CHECK USERNAME AVAILABILITY
const checkUsername = async (searchQuery) => {
  try {
    const response = await fetch(`${endpoint}/availability?username=${searchQuery}`);

    if (!response.ok) {
      throw new Error('Failed to check username availability');
    }

    return await response.json();
  } catch (error) {
    console.error('checkUsername error:', error);
    throw error;
  }
};

const searchUsername = async (searchQuery) => {
  try {
    const response = await fetch(`${endpoint}/search?username=${searchQuery}`);

    if (!response.ok) {
      throw new Error('Failed to search for usernames');
    }

    return await response.json();
  } catch (error) {
    console.error('searchUsername error:', error);
    throw error;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createUser, checkUsername, searchUsername };
