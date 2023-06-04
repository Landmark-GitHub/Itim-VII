import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function HeaderTest(props) {

    const [date, setDate] = useState(props.date);
    // const [activity, setActivity] = useState('AddItim');
    const [activity, setActivity] = useState(props.activity);
    // const name = props.member.name;
    const name = props.member?.name || 'Select Member';

    const router = useRouter();

    const settingDate = (e) => {
        const temp = e.target.value
        setDate(temp)
        props.setDate(temp)

        if (date && name != 'Select Member'){
            router.push(`${activity}/${date}/${name}`)
        }
    }

    // useEffect(() => {

    // },[])

    return (
        <header className='h-1/6 pb-0.5 bg-white shadow-xl'>

            <div className={`flex justify-between bg-white h-3/4 px-2`}>

                <div className='p-2'>
                    <br></br>
                    <label className={`text-gray-800 text-4xl`}>{name !== 'undefined' ? name : ''}</label>
                    <br></br>
                    <label className='text-2xl'>{date}</label>
                    <label className='text-2xl'>  Status : {activity}</label>
                </div>

                <div className='bg-red-300 flex items-center'>
                    <input type='date' value={date} onChange={settingDate}  />
                </div>

            </div>
            <div className="flex justify-between ">
                <div className={`text-center text-xl w-full ${activity === 'AddItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => {
                        setActivity('AddItim')
                        props.setActivity('AddItim')
                        console.log(activity)
                    }}> Add itim </div>
                <div className={`text-center text-xl w-full ${activity === 'CheckItim' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => {
                        setActivity('CheckItim')
                        props.setActivity('CheckItim')
                        console.log(activity)
                    }}> Check itim </div>
            </div>

        </header>
    );
}

export { HeaderTest };  // เพิ่มบรรทัดนี้เพื่อส่งออกคอมโพเนนต์ 'CheckItim'

