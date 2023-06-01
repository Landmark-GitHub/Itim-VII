import React, { useState } from 'react';

export const Listmore = () => {
    const [dryIceSelected, setDryIceSelected] = useState('');
    const [homeChecked, setHomeChecked] = useState(false);
    const [carChecked, setCarChecked] = useState(false);
    const [otherInput, setOtherInput] = useState('');

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
        <div className="grid grid-cols-4 gap-2 w-full h-20">

            <div className={`bg-white rounded-xl drop-shadow-xl ${dryIceSelected  != 0 ? 'bg-lime-400' : '' }`}>
                <select className='bg-r' value={dryIceSelected} onChange={handleDryIceChange}>
                    <option value="0">Please select</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={String(index + 1)}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                DryICE
            </div>

            <div className={`bg-white rounded-xl drop-shadow-xl hover:bg-lime-400 ${homeChecked ? 'bg-lime-400' : ''}`} 
                onClick={() => {setHomeChecked(!homeChecked)}}>
                Home
            </div>

            <div className={`bg-white rounded-xl drop-shadow-xl  ${carChecked ? 'bg-lime-400' : ''    }`} 
                onClick={() => {setCarChecked(!carChecked)}}>
                Car
            </div>

            <div className={`bg-white rounded-xl drop-shadow-xl  ${otherInput && otherInput !== '0' ? 'bg-lime-400' : ''}`}>
                <input
                    type="number"
                    value={otherInput}
                    onChange={handleOtherInputChange}/>
                Other
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};
