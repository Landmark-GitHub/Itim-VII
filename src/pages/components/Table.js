import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const Table = (props) => {
  const router = useRouter();
  const { activity, date, name } = router.query;

  const [typeItim, setTypeItim] = useState([]);
  const [oldItim, setOldItim] = useState([]);
  const [newItim, setNewItim] = useState([]);
  const [balanceItim, setBalanceItim] = useState([]);
  const [inputBalance, setInputBalance] = useState('');

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

  const axiosBalance = async () => {
    console.log('Start Axios Balance Query');
    try {
      const response = await axios.get(`/api/balance/${date}/${name}`);
      setBalanceItim(response.data);
      console.log('END Axios Balance Query');
    } catch (error) {
      console.error(error);
      alert(`Error Axios balance: ${error}`);
    }
  };

  const axiosOld = async () => {
    console.log('Start Axios Old Query');
    try {
      const response = await axios.get(`/api/itimold`, {
        params: {
          date: date,
          name: name,
        },
      });
      setOldItim(response.data);
      console.log('End Axios Old Query');
    } catch (err) {
      console.error(err);
      alert(`Error Axios balance: ${err}`);
    }
  };

  const getTypeItimData = (typeItim, data) => {
    const foundItem = data.find((item) => item.typeItim === typeItim);
    return foundItem ? foundItem.total_quantity : 0;
  };

  const handleBalanceChange = (event, typeItim) => {
    setInputBalance(event.target.value);
  };

  const handleSaveBalance = async (typeItim) => {
    const itimDetail = {
      date: date,
      name: name,
      typeitim: typeItim,
      quantity: inputBalance,
    };

    const check = balanceItim.find((i) => i.typeitim === typeItim)?.quantity || 0;

    if (check !== 0) {
      try {
        await axios.put('http://localhost:3000/api/balance', itimDetail);
        axiosBalance();
        console.log('Update success');
      } catch (error) {
        console.error('Error:', error);
        alert(`Error update balance: ${error}`);
      }
    } else {
      try {
        await axios.post('http://localhost:3000/api/balance', itimDetail);
        axiosBalance();
        console.log('Save success');
      } catch (error) {
        console.error('Error:', error);
        alert(`Error save balance: ${error}`);
      }
    }
  };

  const sumMoney = () => {
    let total = 0;
    for (let i = 0; i < typeItim.length; i++) {
      const itim = typeItim[i].itim_type;
      const oldQuantity = oldItim.find((o) => o.typeitim === itim)?.quantity || 0;
      const newQuantity = newItim.find((n) => n.typeItim === itim)?.total_quantity || 0;
      const totalQuantity = parseInt(oldQuantity) + parseInt(newQuantity)
      const balanceQuantity = balanceItim.find((i) => i.typeitim === itim)?.quantity || 0;
      const soldOut = parseInt(totalQuantity) - parseInt(balanceQuantity)
      const piece = parseFloat(typeItim[i].itim_piece)
      const money = (parseInt(soldOut) * piece)
      total += money;
    }
    return total;
  }

  useEffect(() => {
    axiosTypeItim();
    axiosNew();
    axiosOld();
    axiosBalance();
    // sumMoney();

  }, [date, name]);

  return (
    <>
      <table className="table-auto w-full bg-white drop-shadow-xl rounded-xl text-2xl text-center">
        <thead>
          <tr className="bg-gray-300">
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
          {typeItim.map((type, index) => {

            const typeItim = type.itim_type;
            const oldQuantity = oldItim.find((i) => i.typeitim === typeItim)?.quantity || 0;
            const newQuantity = getTypeItimData(typeItim, newItim);
            const balanceQuantity = balanceItim.find((i) => i.typeitim === typeItim && i.name === name)?.quantity || 0;
            const totalQuantity = parseInt(newQuantity) + parseInt(oldQuantity);
            const soldOut = totalQuantity - balanceQuantity;
            const money = soldOut * type.itim_piece;

            return (
              <tr key={index}>
                <td className="p-4">{typeItim}</td>
                <td className="p-4">{oldQuantity}</td>
                <td className="p-4">{newQuantity}</td>
                <td className="p-4">{totalQuantity}</td>
                <td className="p-4 grid grid-cols-2">
                  <input
                    type="number"
                    placeholder={balanceQuantity}
                    className="w-20 h-full border border-gray-400 rounded-lg text-center text-black"
                    defaultValue={balanceQuantity}
                    onChange={(event) => handleBalanceChange(event, typeItim)}
                  />
                  <button
                    className={`rounded-lg text-white ${balanceQuantity ? 'bg-blue-500' : 'bg-lime-500'}`}
                    onClick={() => handleSaveBalance(typeItim)}
                  >
                    {balanceQuantity ? 'Update' : 'Save'}
                  </button>
                </td>
                <td className="p-4">
                  {soldOut} * {type.itim_piece}
                </td>
                <td className="p-4">{money}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="my-2 py-2 justify-items-end text-3xl bg-gray-300">
        <h1>Total : {sumMoney()}</h1>
      </div>

      <div className="flex flex-rows w-full">
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Home</span>
      </label>
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Car</span>
      </label>
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Money</span>
      </label>
      <label className="flex items-center">
        <input type="checkbox" className="form-checkbox" />
        <input type="text" className="ml-2 p-1 border border-gray-300 rounded" placeholder="Input" />
      </label>
    </div>

      {/* <div className="bg-emerald-400">
        <button className="bg-pink-500 m-4 p-4" onClick={() => console.log(balanceItim)}>
          Click
        </button>
        <button className="bg-red-500 m-4 p-4" onClick={() => console.log(oldItim)}>
          Old
        </button>
        <button className="bg-red-500 m-4 p-4" onClick={() => console.log(newItim)}>
          New
        </button>
        <button className="bg-red-500 m-4 p-4" onClick={() => console.log(balanceItim)}>
          Click
        </button>
        <button className="bg-red-500 m-4 p-4" onClick={sumMoney}>
          Money
        </button>
      </div> */}
    </>
  );
};
