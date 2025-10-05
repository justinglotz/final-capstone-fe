import 'firebase/auth';
import { getFirebaseToken } from './concertData';

// API CALLS FOR NEWS FEED
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}news-feed/`;

const getNewsFeed = async () => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('News feed error: ', error);
    throw error;
  }
};

export default getNewsFeed;
