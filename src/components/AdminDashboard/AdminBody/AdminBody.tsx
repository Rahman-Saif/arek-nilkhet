import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { FiBookOpen } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { FiVolume2 } from 'react-icons/fi';
import { FaUsers, FaBookOpen, FaShoppingCart, FaBars, FaPenNib, FaBullhorn } from 'react-icons/fa';

export default function AdminBody({books, users, customers, admins, totalPublisher, totalAuthor, totalCategory, totalOrder}) {
 
  return (
    <>
    <div className="container mx-auto my-5">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-4 border-none rounded-full bg-blue-50 text-blue-500">
          <FiUsers size={28} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{users?.length}</h5>
          <p className="font-bold text-gray-600">Total users</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-primary">
          <FiUsers size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{admins?.length}</h5>
          <p className="font-bold text-gray-600">Total Admins</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-primary">
          <FiUsers size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{customers?.length}</h5>
          <p className="font-bold text-gray-600">Total Customers</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-yellow-500">
          <FiBookOpen size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{books?.length}</h5>
          <p className="font-bold text-gray-600">Total books</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-red-500">
          <FiShoppingCart size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{totalOrder?.length}</h5>
          <p className="font-bold text-gray-600">Total orders</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-green-500">
          <FiMenu size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{totalCategory?.length}</h5>
          <p className="font-bold text-gray-600">Total categories</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-yellow-500">
          <FiEdit size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{totalAuthor?.length}</h5>
          <p className="font-bold text-gray-600">Total authors</p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="p-5 rounded-lg shadow-lg bg-white flex justify-around items-center min-h-[200px] min-w-[340px] hover:shadow-xl transition-shadow">
        <div className="p-3 text-3xl border rounded-full text-blue-500">
          <FiVolume2 size={24} />
        </div>
        <div className="text-center">
          <h5 className="text-2xl font-semibold text-blue-500">{totalPublisher?.length}</h5>
          <p className="font-bold text-gray-600">Total Publishers</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
