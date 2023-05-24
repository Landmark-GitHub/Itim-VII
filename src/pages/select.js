import React, { useState } from 'react'
import LayoutTest from "./components/LayoutTest";
import ListItim from './components/ListItim';

const Requisition = () => {

    

    return (
        <LayoutTest
        >
            <div className={`w-full h-5/6 bg-gray-500 opacity-75 
                    flex text-center items-center justify-center text-5xl`}>
                Select Member and Date Now <br></br>
            </div>
        </LayoutTest>
    )
}

export default Requisition
