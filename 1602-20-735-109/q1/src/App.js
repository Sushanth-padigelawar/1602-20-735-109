import React, { useState, useEffect } from 'react';

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urls = urlParams.getAll('url');

    const fetchNumbers = async () => {
      const promises = urls.map(async (url) => {
        try {
          const response = await fetch(url, { timeout: 500 });
          if (response.ok) {
            const data = await response.json();
            return data.numbers;
          }
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
        }
        return [];
      });

      const results = await Promise.all(promises);
      const mergedNumbers = Array.from(new Set(results.flat())).sort((a, b) => a - b);
      setNumbers(mergedNumbers);
    };

    fetchNumbers();
  }, []);

  const response = { numbers };

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
}

export default App;