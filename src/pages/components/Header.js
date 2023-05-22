import { useRouter } from 'next/router';
import React from 'react';

const HeaderAddItim = (props) => {
  const { date, name } = props;
  const activity = 'AddItim';
  const router = useRouter();

  const settingDate = (e) => {
    const temp = e.target.value;
    props.setDate(temp);

    if (date && name) {
      router.push({
        pathname: `/AddItim/[date]/[name]`,
        query: { date: temp, name },
      });
    }
  };

  return (
    <header className='h-1/6 bg-white shadow-xl'>
      <div className={`flex justify-between bg-white h-3/4 px-2`}>
        <div className='p-2'>
          <label className={`text-gray-800 text-4xl`}>{name}</label>
          <br />
          <label className='text-2xl'>{date}</label>
          <label className='text-2xl'>  Status : {activity}</label>
        </div>

        <input type='date' value={date} onChange={settingDate} />
      </div>
      <div className="flex justify-between">
        <div
          className={`text-center text-xl w-full ${
            activity === 'AddItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            // setActivity('AddItim')
            // console.log(activity)
          }}
        >
          Add itim
        </div>
        <div
          className={`text-center text-xl w-full ${
            activity === 'CheckItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => {
            // setActivity('CheckItim')
            // console.log(activity)
          }}
        >
          Check itim
        </div>
      </div>
    </header>
  );
};

export default HeaderAddItim;
