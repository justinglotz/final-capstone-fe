import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useSearch(url, initialQuery = '', delay = 300) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${url}?q=${query}`);
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, delay);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutId);
  }, [query, url, delay]);

  return { query, setQuery, results, loading };
}
