import 'firebase/auth';
import { getFirebaseToken } from './concertData';

// API CALLS FOR FOLLOWERS
const dbURL = process.env.NEXT_PUBLIC_DATABASE_URL;
const endpoint = `${dbURL}`;

const followUser = async (targetUsername) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/follow?username=${targetUsername}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('followUser error: ', error);
    throw error;
  }
};

const unfollowUser = async (targetUsername) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/follow/unfollow?username=${targetUsername}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('unfollowUser error: ', error);
    throw error;
  }
};

const getFollowStatus = async (username) => {
  try {
    const token = await getFirebaseToken();
    const response = await fetch(`${endpoint}/follow/follow_status?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('getFollowStatus error: ', error);
    throw error;
  }
};

export { followUser, getFollowStatus, unfollowUser };
