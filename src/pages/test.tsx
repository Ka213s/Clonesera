import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface CatFact {
  fact: string;
  length: number;
}

const Test = () => {
  const [data, setData] = useState<CatFact[]>([]);

  useEffect(() => {
    axios.get('https://catfact.ninja/fact')
      .then(response => {
        console.log('Fetched data:', response.data);
        setData([response.data]);
        toast.success('Cat facst fetched successfully!');
      })
      .catch(error => {
        console.error('Error fetching the cat fact:', error);
        toast.error('Failed to fetch cat fact.');
      });
  }, []);

  const columns = [
    {
      title: 'Fact',
      dataIndex: 'fact',
      key: 'fact',
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
    },
  ];

  return (
    <div>
      <ToastContainer />
      <Table dataSource={data} columns={columns} rowKey="fact" />
    </div>
  );
}

export default Test;
