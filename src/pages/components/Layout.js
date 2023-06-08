import React, { useEffect, useState } from 'react'
import NavMember from './NavMember';
import Header from './Header';
import { useRouter } from 'next/router';

export default function Layout({ children, ...props }) {

    const router = useRouter();
    const activity = router.query.activity;
    const date = router.query.date;
    const name = router.query.name;
  

    const [openMenu, setOpenMenu] = useState(true);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <main className='flex w-full'>
                <div div="true" className={`${openMenu ? 'w-3/12' : 'w-0 opacity-0 translate-x-(-28)'} overflow-hidden duration-300`}>
                    <NavMember
                    />
                </div>

                <div div="true" className={`${openMenu ? 'w-9/12' : 'w-full'} duration-300`}>
                    <Header
                    >
                    </Header>
                    <div className='h-5/6'>
                        {children}
                    </div>
                    <button onClick={toggleMenu} className={`absolute bottom-2 ${openMenu ? 'left-3/12' : 'left-2 '} duration-300 z-10 px-4 py-2 bg-gray-500 text-white rounded`}>
                        {openMenu ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>
            </main>
        </>
    )
}

