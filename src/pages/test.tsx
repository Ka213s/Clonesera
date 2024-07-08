import  { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Test = () => {
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    axios.get('https://catfact.ninja/fact')
      .then(response => {
        console.log('Fetched data:', response.data);
        setFact(response.data.fact);
        toast.success('Cat fact fetched successfully!');
      })
      .catch(error => {
        console.error('Error fetching the cat fact:', error);
        toast.error('Failed to fetch cat fact.');
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      {fact ? fact : 'Loading...'}
    </div>
  );
}

export default Test;
