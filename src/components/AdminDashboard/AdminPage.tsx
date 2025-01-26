'use client'
import React from 'react';
import SideBar from './SideBar/SideBar';
// import './adminpage.css';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import AdminBody from './AdminBody/AdminBody';
import useAllOrders from '../../Hooks/useAllOrders';
import useAllCategories from '../../Hooks/useAllCategories';
import useAuthors from '../../Hooks/useAuthors';
import usePublishers from '../../Hooks/usePublishers';
import useAllAdmin from '../../Hooks/useAllAdmin';
import useAllCustomers from '../../Hooks/useAllCustomers';
import useAllUsers from '../../Hooks/useAllUsers';

export default function AdminPage({books}) {
  const [users] = useAllUsers();
  const [customers] = useAllCustomers();
  const [ admins] = useAllAdmin();
  const [totalPublisher] = usePublishers();
  const [totalAuthor] = useAuthors();
  const [totalCategory] = useAllCategories();
  const [totalOrder] = useAllOrders();
  return (
    <>
   <div className="adminpage flex m-0">
  <SideBar />
  <div className="adminpage-container bg-gray-100 flex-1">
    <AdminNavbar />
    <AdminBody 
      books={books} 
      users={users} 
      customers={customers} 
      admins={admins} 
      totalPublisher={totalPublisher} 
      totalAuthor={totalAuthor} 
      totalCategory={totalCategory} 
      totalOrder={totalOrder} 
    />
  </div>
</div>

    </>
  );
}
