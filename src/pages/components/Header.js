import { useRouter } from 'next/router';
import React, { useState } from 'react';

const HeaderAddItim = () => {

  const router = useRouter();
  const [status, setStatus] = useState(router.query.activity);
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  const settingDate = (e) => {
    const temp = e.target.value;
    router.push(`/${activity}/${temp}/${name}`)
  };

  const settingStatus = (text) => {
    const temp = text
    router.push(`/${temp}/${date}/${name}`)
  };

  return (
    // <>
    //   <header className='bg-red-300 shadow-xl'>
    //     <div className={`flex justify-between bg-white h-3/4 px-2`}>
    //       <div className='p-2'>
    //         <label className={`text-gray-800 text-4xl`}>{name}</label>
    //         <br />
    //         <label className='text-2xl'>{date}</label>
    //         <label className='text-2xl'>  Status : {activity}</label>
    //       </div>

    //       <input type='date' value={date} onChange={settingDate} />
    //     </div>
    //     <div className="flex justify-between h-full">
    //       <div
    //         className={`text-center text-xl w-full ${
    //           activity === 'AddItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'
    //         }`}
    //         onClick={() => settingStatus('AddItim')}
    //       >
    //         Add itim
    //       </div>
    //       <div
    //         className={`text-center text-xl w-full ${
    //           activity === 'CheckItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'
    //         }`}
    //         onClick={() => settingStatus('CheckItim')}
    //       >
    //         Check itim
    //       </div>
    //     </div>
    //   </header>
    // </>
    <header>
      <div className="flex justify-between bg-white shadow-xl h-full">
        <div className="p-2">
          <label className="text-gray-800 text-4xl">{name}</label>
          <br />
          <label className="text-2xl">{date}</label>
          <label className="text-2xl"> Status : {activity}</label>
        </div>
        <div className='flex items-center'>
          <input type="date" value={date} onChange={settingDate} />
        </div>
      </div>
      <div className="flex justify-betweenp h-full p-1">
          <div className={`text-center text-xl w-full h-full ${activity === 'AddItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
            onClick={() => settingStatus('AddItim')}>
            Add itim
          </div>
          <div
            className={`text-center text-xl w-full h-full ${activity === 'CheckItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'
              }`}
            onClick={() => settingStatus('CheckItim')}
          >
            Check itim
          </div>
      </div>

    </header>

  );
};

export default HeaderAddItim;
