'use client';

import React, { useState } from 'react';
import useCompetitiveChild from '../../../Hooks/SubCategory/useCompetitiveChild';
import useBCSChild from '../../../Hooks/SubCategory/useBCSChild';
import useMedicalChild from '../../../Hooks/SubCategory/useMedicalChild';
import useEngineeringChild from '../../../Hooks/SubCategory/useEngineeringChild';
import useLawChild from '../../../Hooks/SubCategory/useLawChild';
import useBBAMBAChild from '../../../Hooks/SubCategory/useBBAMBAChild';
import useEnglishMediumChild from '../../../Hooks/SubCategory/useEnglishMediumChild';
import useNovelChild from '../../../Hooks/SubCategory/useNovelChild';
import Link from 'next/link';

const MegaMenu = () => {
  // const [openDropdown, setOpenDropdown] = useState(null);
  const [bcsChilds] = useBCSChild();
  const [competitiveChilds] = useCompetitiveChild();
  const [medicalNursingChilds] = useMedicalChild();
  const [engineeringChilds] = useEngineeringChild();
  const [lawChilds] = useLawChild();
  const [bbaMbaChilds] = useBBAMBAChild();
  const [novelChilds] = useNovelChild();
  const [englishMediumChilds] = useEnglishMediumChild();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const renderDropdown = (items) => (
    <div className={`absolute bg-white shadow-lg mt-2 rounded z-50 min-w-[300px] ${openDropdown ? 'block' : 'hidden'}`}>
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-gray-200">
          {items?.map((child) => (
            <tr key={child.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">
                <Link
            key={child.id}
            className="block p-2 text-gray-700 hover:bg-gray-100"
            href={`/categories/${child.name}`}
          >
                {child.name}
                </Link>
              </td>
              <td className="px-4 py-2" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const NavigationItem = ({ title, items, id }) => (
    <li className="relative">
      <button
        onClick={() => toggleDropdown(id)}
        className="text-gray-700 font-medium hover:text-blue-500 focus:outline-none"
      >
        {title}
      </button>
      {openDropdown === id && renderDropdown(items)}
    </li>
  );

  return (
    <div className="container mx-auto shadow p-1 border-0 rounded mb-3 flex items-center justify-center">
      <nav className="bg-white">
        <div className="flex justify-between items-center p-4">
          <div className="hidden lg:flex space-x-4" id="navbarNavDropdown">
            <ul className="flex space-x-4">
              <NavigationItem 
                id="bcs"
                title="বিসিএস-ব্যাংক"
                items={bcsChilds}
              />
              <NavigationItem 
                id="competitive"
                title="কম্পিটিটিভ-এক্সাম"
                items={competitiveChilds}
              />
              <NavigationItem 
                id="medical"
                title="মেডিকেল-নার্সিং"
                items={medicalNursingChilds}
              />
              <NavigationItem 
                id="engineering"
                title="ইঞ্জিনিয়ারিং"
                items={engineeringChilds}
              />
              <NavigationItem 
                id="law"
                title="আইন"
                items={lawChilds}
              />
              <NavigationItem 
                id="bba"
                title="বিবিএ-এমবিএ"
                items={bbaMbaChilds}
              />
              <NavigationItem 
                id="novel"
                title="গল্প-উপন্যাস-কবিতা"
                items={novelChilds}
              />
              <NavigationItem 
                id="english"
                title="ইংলিশ-মিডিয়াম"
                items={englishMediumChilds}
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MegaMenu;
