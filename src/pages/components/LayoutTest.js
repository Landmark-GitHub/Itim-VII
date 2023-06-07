import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import HeaderTest from './HeaderTest';
import ListItim from './ListItim';

export default function Layout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);
  const [member, setMember] = useState({ name: 'Select Member' });
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [activity, setActivity] = useState('AddItim');

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {

  }, [member, activity])

  return (
    <>
      <main className='flex h-screen w-screen'>
        <div className={`${openMenu ? 'w-3/12' : 'w-0 translate-x-(-28)'} overflow-hidden duration-300`}>
          <Navbar
            date={date}
            setMember={setMember}
            activity={activity}
          />
        </div>
        <div className={`${openMenu ? 'w-9/12' : 'w-full'} duration-300`}>
          <HeaderTest
            date={date}
            setDate={setDate}
            member={member}
            activity={activity}
            setActivity={setActivity}
          />
          {children}
          <button onClick={toggleMenu} className={`absolute bottom-2 ${openMenu ? 'left-3/12' : 'left-2 '} duration-300 z-10 px-4 py-2 bg-gray-500 text-white rounded`}>
            {openMenu ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
      </main>
    </>
  );
}
