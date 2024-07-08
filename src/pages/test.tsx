import  { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    axios.get('https://catfact.ninja/fact')
      .then(response => {
        console.log('Fetched data:', response.data);
        setFact(response.data.fact);
      })
      .catch(error => {
        console.error('Error fetching the cat fact:', error);
      });
  }, []);

  return (
    <div>{fact ? fact : 'Loading...'}</div>
  );
}

export default Test;
