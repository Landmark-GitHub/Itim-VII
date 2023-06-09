import React, { useEffect, useState } from 'react';
import { Select, Option } from "@material-tailwind/react";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';
import axios from 'axios';

const Listmore = () => {

    const router = useRouter();
    const date = router.query.date;
    const name = router.query.name;

    const [dryIceSelected, setDryIceSelected] = useState(false);
    const [homeChecked, setHomeChecked] = useState(false);
    const [carChecked, setCarChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);

    const [titleOther, setTitleOther] = useState(null);
    const [moneyOther, setMoneyOther] = useState(null);

    const [dryice, setDryIce] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [dryicePiece, setDryIcePiece] = useState(25);
    const [dryiceBath, setDryIceBath] = useState((dryice.find((i) => i.name === name)?.quantity || 0) * dryicePiece);

  
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


    const handleSave = () => {
        console.log(titleOther)
        if (titleOther === '') {
            setMoneyOther(null)
            setOtherChecked(null)
        } else {
            // console.log({title: titleOther,
            //              money: moneyOther})
        }
        setOtherChecked(!otherChecked)
    };

    const axiosDryice = async () => {
        try {
            //https://important-shrug-bee.cyclic.app/
            const req = await axios.get('https://important-shrug-bee.cyclic.app/getDryice/',{
                params: {
                    date: date,
                    name: name
                }
            })
            if (req.status === 200){
                // console.log(req.data)
                setDryIce(req.data);
            }
        }catch(err){
            console.log(err);
        }
    }

    const saveDryice = async () => {
        const data = {
            date: date,
            name: name,
            quantity: quantity,
        }

        // setDryIceBath((quantity)*(dryicePiece))

        if (dryice) {

            try {
                const req = await axios.put('https://important-shrug-bee.cyclic.app/putDryice',data)
                if(req.status === 200){
                    axiosDryice();
                    setDryIceSelected(!dryIceSelected);
                }
            } catch (err){
    
            }

        } else {

            try {
                const req = await axios.post('https://important-shrug-bee.cyclic.app/postDryice',data)
                if(req.status === 200){
                    axiosDryice();
                    setDryIceSelected(!dryIceSelected);
                }
            }catch(err){
    
            }
        }

    }

    useEffect(() => {
        axiosDryice();
    }, [date, name])



    return (
        <>
            <div className="grid grid-cols-4 gap-2 w-full h-20">

                <div className={`rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${(dryice.find((i) => i.name === name)?.quantity || 0) > 0? 'ring-2 ring-gray-700' : 'bg-white'}`}
                    onClick={() => { setDryIceSelected(!dryIceSelected) }}
                    // onClick={() => { console.log(dryice) }}
                    >
                        <div className='pr-8'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex text-7xl font-bold justify-end items-center'>
                                    <label>{dryice.find((i) => i.name === name)?.quantity || 0}</label>
                                </div>
                                <div className='text-2xl pt-2 font-bold text-left'>
                                    <label>DRYICE</label>
                                    <p>{(dryice.find((i) => i.name === name)?.quantity || 0) * dryicePiece}</p>
                                    {/* <p>{dryiceBath}</p> */}
                                </div>
                            </div>
                        </div>
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${homeChecked ? 'ring-2 ring-gray-700' : 'bg-white'}`}
                    onClick={() => { setHomeChecked(!homeChecked) }}>
                    Home
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center px-3 rounded-xl drop-shadow-xl ring-2 ring-gray-300  ${carChecked ? 'ring-2 ring-gray-700' : 'bg-white'}`}
                    onClick={() => { setCarChecked(!carChecked) }}>
                    Car
                </div>

                <div className={`inline-flex text-center text-4xl font-bold items-center p-1 rounded-xl drop-shadow-xl ring-2 ring-gray-300 ${titleOther != null || '' ? 'ring-2 ring-gray-700':''} `}
                    onClick={() => {
                        setOtherChecked(!otherChecked);
                    }}
                    >
                    {titleOther === '' || null ? 
                    <>
                        Other
                    </>
                    :
                    <><div className='w-full grid grid-cols-2 items-center'>
                            <h1>{titleOther}</h1>
                            <p>{moneyOther}</p>
                        </div></>}
                </div>

            </div>

            {dryIceSelected && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4">
                        <h1 className="text-4xl font-bold mb-4">DRYICE</h1>
                        <p>{dryicePiece}</p>
                        <div className="flex flex-col gap-4 text-xl">
                            <label className=' font-bold'>Quantity</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-md p-2"
                                placeholder={dryice.find((i) => i.name === name)?.quantity || 0}
                                // value={dryice.find((i) => i.name === name)?.quantity || 0}
                                onChange={(event) => { setQuantity(event.target.value) }}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
                                onClick={() => {
                                    setDryIceSelected(!dryIceSelected);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-400 text-white rounded-md"
                                onClick={saveDryice}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
