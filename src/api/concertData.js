// API CALLS FOR CONCERTS
const endpoint = 'http://127.0.0.1:8000/concerts';

// CREATE CONCERT
const createConcert = (payload) =>
  new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export { createConcert };
