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

    const [titleOther, setTitleOther] = useState(null);
    const [moneyOther, setMoneyOther] = useState(null);
  
    const handleOtherInputChange = (event) => {
      setTitleOther(event.target.value);
    };
  
    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

    const handleDryIceChange = (event) => {
        setDryIceSelected(event.target.value);
    };

    const handleHomeChange = (event) => {
        setHomeChecked(event.target.checked);
    };

    const handleCarChange = (event) => {
        setCarChecked(event.target.checked);
    };

    // const handleOtherInputChange = (event) => {
    //     setOtherInput(event.target.value);
    // };

    const handleSave = () => {
        console.log(titleOther)
        if (titleOther === '') {
            setMoneyOther(null)
            setOtherChecked(null)
            // console.log({title: titleOther,
            //     money: moneyOther})
        } else {
            // console.log({title: titleOther,
            //              money: moneyOther})
        }
        setOtherChecked(!otherChecked)
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-2 w-full h-20">

                <div className={`rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${homeChecked ? 'bg-lime-400' : 'bg-white'}`}
                    onClick={() => { setDryIceSelected(!homeChecked) }}>
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

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${
                        titleOther != '' ? 'bg-lime-400' : 'bg-white'
                    }`}
                    onClick={() => {
                        setOtherChecked(!otherChecked);
                    }}
                    >
                    {titleOther != '' ? 
                    <>
                        <div>
                            <h1>{titleOther}</h1>
                            <h1>{moneyOther}</h1>
                        </div>
                    </>
                    :
                    <>Other</>}
                </div>

            </div>

            {otherChecked && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4">
                        <h1 className="text-4xl font-bold mb-4">Other Details</h1>
                        <div className="flex flex-col gap-4 text-xl">
                            <label className=' font-bold'>Title</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-2"
                                placeholder="Title"
                                value={titleOther}
                                onChange={(event) => {
                                    setTitleOther(event.target.value)
                                }}
                            />
                            <label className=' font-bold'>Money</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-md p-2"
                                placeholder="Amount"
                                value={moneyOther}
                                onChange={(event) => {
                                    if (titleOther === '') {
                                        setMoneyOther(null)
                                    }else{
                                        setMoneyOther(event.target.value)
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            {titleOther === '' ? 
                            <>
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                                    onClick={() => {
                                        setOtherChecked(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-400 text-white rounded-md"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </>
                            :
                            <>
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                                    onClick={() => {
                                        setOtherChecked(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                
                                <button
                                    className="px-4 py-2 bg-green-400 text-white rounded-md"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Listmore;
