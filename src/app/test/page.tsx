"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/34.128.79.147');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.gyro_x}</li>
        ))}
      </ul>
    </div>
  );
}
