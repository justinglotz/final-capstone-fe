import { useState, useEffect } from 'react';
import { checkUsername } from '../../api/userData';

export default function useUsernameAvailability(username, delay = 300) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    if (!username) {
      setAvailable(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      const fetchAvailability = async () => {
        try {
          const res = await checkUsername(username);
          setAvailable(res.available);
        } catch (err) {
          console.error(err);
          setAvailable(null);
        }
      };

      fetchAvailability();
    }, delay);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutId);
  }, [username, delay]);

  return available;
}
