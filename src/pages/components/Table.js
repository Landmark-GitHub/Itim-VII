import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const Table = (props) => {
  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  const [typeItim, setTypeItim] = useState([]);
  const [oldItim, setOldItim] = useState([]);
  const [newItim, setNewItim] = useState([]);
  const [balanceItim, setBalanceItim] = useState([]);
  const [moneyTotal, setMoneyTotal] = useState([]);

  const [inputBalance, setInputBalance] = useState([]);
  
  const axiosTypeItim = async () => {
    console.log('start axios List Type Itim');
    try {
      const response = await axios.get('http://localhost:3000/api/itim');
      const itimData = response.data.reduce((acc, item) => {
        const existingIndex = acc.findIndex((obj) => obj.itim_type === item.itim_type);
        if (existingIndex !== -1) {
          acc[existingIndex].itim_piece;
        } else {
          acc.push({ itim_type: item.itim_type, itim_piece: item.itim_piece });
        }
        return acc;
      }, []);
      setTypeItim(itimData);
      console.log('end axios List Type Itim');
    } catch (error) {
      console.log(`Connection to itimDB: ${error}`);
      alert(`Connection to itimDB: ${error}`);
    }
  };

  const axiosNew = async () => {
    console.log('Start Axios New Query');
    try {
      const response = await axios.get(`/api/checkitim/GET/${date}/${name}`, {
        params: {
          date: date,
          name: name,
        },
      });
      setNewItim(response.data);
      console.log('END Axios New Query');
    } catch (error) {
      console.error(error);
    }
  };

  const axiosBalance = async() => {
    console.log('Start Axios Balance Query');
    try {
      // const response = await axios.get(`/api/balance/`, temp);
      const response = await axios.get(`/api/balance/${date}/${name}`);
      setBalanceItim(response.data);
      console.log('END Axios Balance Query');
    } catch (error) {
      console.error(error);
      alert(`Error update balance: ${error}`);
    }
  };

  const axiosOld = async () => {

  }

  const getTypeItimData = (typeItim, data) => {
    const foundItem = data.find((item) => item.typeItim === typeItim);
    return foundItem ? foundItem.total_quantity : 0;
  };


  const handleBalanceChange = (event, typeItim) => {
    const value = event.target.value;
    setInputBalance(event.target.value)
  };  

  const handleSaveBalance = async (typeItim) => {

    const itimDetail = {
      date: date,
      name: name,
      typeitim: typeItim,
      quantity: inputBalance,
    };

    const check = (balanceItim.find((i) => i.typeitim === typeItim)?.quantity || 0);

    if (check != 0){
      try {
        const response = await axios.put('http://localhost:3000/api/balance', itimDetail)
        axiosBalance();
        console.log('Update success')
      }catch(error){
        console.error('Error:', error);
        alert(`Error update balance: ${error}`);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/balance', itimDetail)
        axiosBalance();
        console.log('Save success')
      }catch (error){
        console.error('Error:', error);
        alert(`Error ave balance: ${error}`);
      }
    }
  };

  useEffect(() => {
    axiosTypeItim();
    axiosNew();
    axiosBalance();
  }, [date, name]);

  return (
    <>
      <table className="table-auto w-full bg-white drop-shadow-xl rounded-xl text-2xl text-center">

        <thead>
          <tr className='bg-gray-300'>
            <th className="p-4">TypeItim</th>
            <th className="p-4">Old</th>
            <th className="p-4">New</th>
            <th className="p-4">Total</th>
            <th className="p-4">Balance</th>
            <th className="p-4">SoldOut</th>
            <th className="p-4">Money</th>
          </tr>
        </thead>

        <tbody>
          {typeItim.map((typeItim, index) => (
            <tr key={index}>
              <td className="p-4">{typeItim.itim_type}</td>
              <td className="p-4">0</td>
              <td className="p-4">{getTypeItimData(typeItim.itim_type, newItim)}</td>
              <td className="p-4">{parseInt(getTypeItimData(typeItim.itim_type, newItim))}</td>
              <td className="p-4 grid grid-cols-2">
                <input
                  type="number"
                  placeholder={balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity || 0}
                  className="w-20 h-full border border-gray-400 rounded-lg text-center text-black"
                  defaultValue={balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity || 0}
                  onChange={(event) =>handleBalanceChange(event, typeItim.itim_type)}
                />
                <button className={`rounded-lg text-white ${balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity ?'bg-blue-500' : 'bg-lime-500'}`} 
                onClick={() => {handleSaveBalance(typeItim.itim_type)}}>
                  {balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity ? 'Update' : 'Save'}
                </button>
              </td>
              <td className="p-4">
                {getTypeItimData(typeItim.itim_type, newItim) - (balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity || 0)} * 
                {typeItim.itim_piece}
              </td>
              <td className="p-4">
                {(getTypeItimData(typeItim.itim_type, newItim) - (balanceItim.find((i) => i.typeitim === typeItim.itim_type)?.quantity || 0)) * typeItim.itim_piece}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className='my-2 text-3xl bg-gray-300'>
        <h1>Total : {moneyTotal}</h1>
        <h1> 123 :  </h1>
      </div>

      <div className=' bg-emerald-400'>
        <button className="bg-red-500 m-4 p-4" onClick={() => {console.log()}}>
          Click
        </button>

        <button className="bg-blue-500 m-4 p-4" onClick={() => {console.log()}}>
          Click
        </button>

        <button className="bg-pink-500 m-4 p-4" onClick={() => {console.log(balanceItim)}}>
          Click
        </button>
      </div>

    </>
  );
};
