'use client';

import { useEffect, useState } from 'react';
// import { url } from '@/app/page'; // Ensure `url` is exported correctly from this path.

export default function useAllUsers() {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
      const url = process.env.NEXT_PUBLIC_URL;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${url}/api/user/`);
        const data = await res.json();
        setUsers(data.results);
        console.log("usersss",data.results);
        setPageCount(data.count);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once after the component mounts.

  return [users, pageCount];
}
