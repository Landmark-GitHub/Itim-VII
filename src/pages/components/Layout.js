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
        <main className="flex w-full justify-center">

            <div className={`duration-300 ${openMenu ? 'w-3/12 ' : 'w-0 opacity-0 translate-x-(-28)'}`}>
                <NavMember />
            </div>

            <div className={`duration-300 h-screen ${openMenu ? 'w-9/12' : 'w-full'}`}>
                <div className='h-1/6 overflow-y-hidden'>
                    <Header />
                </div>
                <div className="h-5/6 w-full overflow-y-auto">
                    {children}
                </div>
            </div>

            <button className={`absolute bottom-2 ${openMenu ? 'left-72 ml-4' : 'left-2'} duration-300 z-10 px-4 py-2 bg-gray-500 text-white rounded`}
                    onClick={toggleMenu}
            >
                {openMenu ? 'Close Menu' : 'Open Menu'}
            </button>
        </main>
    )
}

