import React, { useState } from 'react'
import Header from './Header';

const LayoutAddItim = ({ children, ...props }) => {

    const date = props.date;
    const setDate = props.setDate
    const name = props.name;
    const setName = props.setName;
    const [openMenu, setOpenMenu] = useState(true);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <main className='flex h-screen w-screen'>
            <div className={`${openMenu ? 'w-3/12' : 'w-0 opacity-0 translate-x-(-28)'} overflow-hidden duration-300`}>
                NavMember
                {name}
            </div>

            <div className={`${openMenu ? 'w-9/12' : 'w-full'} duration-300 h-screen`}>
                <Header
                    date = {date}
                    setDate = {setDate}
                    name = {name}
                    
                >
                </Header>
                {children}
                <button onClick={toggleMenu} className={`absolute bottom-2 ${openMenu ? 'left-3/12' : 'left-2 '} duration-300 z-10 px-4 py-2 bg-gray-500 text-white rounded`}>
                    {openMenu ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>
        </main>
    )
}

export default LayoutAddItim
