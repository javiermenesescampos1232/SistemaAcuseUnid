import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            'Authorization': token
          }
        });
        setMessage(response.data);
      } catch (err) {
        setMessage('Failed to fetch protected route');
      }
    };

    fetchProtected();
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Protected;
