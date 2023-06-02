import React, { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Listmore = () => {
    const [dryIceSelected, setDryIceSelected] = useState(false);
    const [homeChecked, setHomeChecked] = useState(false);
    const [carChecked, setCarChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);

    const handleDryIceChange = (event) => {
        setDryIceSelected(event.target.value);
    };

    const handleHomeChange = (event) => {
        setHomeChecked(event.target.checked);
    };

    const handleCarChange = (event) => {
        setCarChecked(event.target.checked);
    };

    const handleOtherInputChange = (event) => {
        setOtherInput(event.target.value);
    };

    const handleSave = () => {
        // ทำสิ่งที่คุณต้องการเมื่อกดปุ่ม Save
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-2 w-full h-20">

                <div className={`rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${homeChecked ? 'bg-lime-400' : 'bg-white'}`}
                    onClick={() => { setHomeChecked(!homeChecked) }}>
                        <div className='pr-8'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex text-7xl font-bold justify-end items-center'>
                                    <label>8</label>
                                </div>
                                <div className='text-2xl pt-2 font-bold text-left'>
                                    <label>DRYICE</label>
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${homeChecked ? 'bg-lime-400' : 'bg-white'}`}
                    onClick={() => { setHomeChecked(!homeChecked) }}>
                    Home
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${carChecked ? 'bg-lime-400' : 'bg-white'}`}
                    onClick={() => { setCarChecked(!carChecked) }}>
                    Car
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${otherChecked ? 'bg-lime-400' : 'bg-white'}`}
                    onClick={() => { setOtherChecked(!otherChecked) }}>
                    Other
                </div>

            </div>

        </>
    );
};

export default Listmore;
