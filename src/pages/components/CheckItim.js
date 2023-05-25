// import { useRouter } from 'next/router';
// import React from 'react';

// export const CheckItim = () => {
//   const router = useRouter();
//   const activity = router.query.activity;
//   const date = router.query.date;
//   const name = router.query.name;
  
//   return (
// //     // <div div={true} className=''>
// //     //     <h1>CheckItim Page JA </h1>
// //     //     <h1>Date : {router.query.date}</h1>
// //     //     <h1>Name : {router.query.name}</h1>
// //     //     <h1>status : {router.query.activity}</h1>
// //     // </div>
// //     <>
//     <div className='bg-purple-800 h-full w-full rounded-lg p-2'>
//       <div className='text-5xl p-5'>
//         <h1>Check Bill</h1>
//       </div>

//       <div className='bg-gray-300 font-bold p-1'>
//         <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center'>
//             <div className="bg-white h-full flex justify-center items-center p-4">TypeItim</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">Old</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">New</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">Total</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">Balance</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">SoldOut</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">Money</div>
//         </div>
//         <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
//             <div className="bg-white h-full flex justify-center items-center p-4">Strick XL</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">5</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">15</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">20</div>
//             <div className="bg-white border-4 border-red-500 h-full flex justify-center items-center p-4">10</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">10 * 6</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">60</div>
//         </div>
//         <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
//             <div className="bg-white h-full flex justify-center items-center p-4">Strick S</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">5</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">15</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">20</div>
//             <div className="bg-white border-4 border-red-500 h-full flex justify-center items-center p-4">10</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
//             <div className="bg-white h-full flex justify-center items-center p-4">50</div>
//         </div>
//       </div>

// {/* 
//       <div className='bg-gray-300 flex rounded-lg text-3xl text-center items-center justify-between p-1 my-2'>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Strick XL</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Old</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">New</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Total</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Balance</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Sold out</div>
//         <div className="bg-white h-full rounded-lg flex justify-center items-center p-4">Money</div>
//       </div> */}

//     </div>
//   );
// };


import { useRouter } from 'next/router';
import React from 'react';

export const CheckItim = () => {
  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;
  
  return (
    <div className='h-full w-full rounded-lg'>
      <div className='text-5xl p-5'>
        <h1>Check Bill</h1>
      </div>

      <div className='bg-gray-300 font-bold p-1'>
        {/* Tital */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center'>
          <div className="bg-white h-full flex justify-center items-center p-4">TypeItim</div>
          <div className="bg-white h-full flex justify-center items-center p-4">Old</div>
          <div className="bg-white h-full flex justify-center items-center p-4">New</div>
          <div className="bg-white h-full flex justify-center items-center p-4">Total</div>
          <div className="bg-white h-full flex justify-center items-center p-4">Balance</div>
          <div className="bg-white h-full flex justify-center items-center p-4">SoldOut</div>
          <div className="bg-white h-full flex justify-center items-center p-4">Money</div>
        </div>
        {/* Stick XL */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Stick XL</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white" />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 6</div>
          <div className="bg-white h-full flex justify-center items-center p-4">60</div>
        </div>
        {/* Stick S */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Stick S</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white border-4 border-red-500 hover:border-gray-300  " />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">50</div>
        </div>
        {/* Coffee */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Coffee</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white border-4 border-red-500 hover:border-gray-300  " />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">50</div>
        </div>
        {/* Sandwind */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Sandwind</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white border-4 border-red-500 hover:border-gray-300  " />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">50</div>
        </div>
        {/* Cups */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Cup</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white border-4 border-red-500 hover:border-gray-300  " />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">50</div>
        </div>
        {/* Cone */}
        <div className='bg-gray-300 grid grid-cols-7 gap-1 text-xl text-center items-center mt-1'>
          <div className="bg-white h-full flex justify-center items-center p-4">Cone</div>
          <div className="bg-white h-full flex justify-center items-center p-4">5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">15</div>
          <div className="bg-white h-full flex justify-center items-center p-4">20</div>
          <div className="bg-white h-full flex justify-center items-center ">
            <input type="text" className="w-full h-full bg-gray-300 hover:bg-white border-4 border-red-500 hover:border-gray-300  " />
          </div>
          <div className="bg-white h-full flex justify-center items-center p-4">10 * 5</div>
          <div className="bg-white h-full flex justify-center items-center p-4">50</div>
        </div>
      </div>
    </div>
  );
};


