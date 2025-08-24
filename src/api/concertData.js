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
// eslint-disable-next-line import/prefer-default-export
export { createConcert };
