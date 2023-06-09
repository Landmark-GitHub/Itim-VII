import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Listmore } from './Listmore';

export default function Table() {
  const router = useRouter();
  const { activity, date, name } = router.query;

  const [typeItim, setTypeItim] = useState([]);
  const [oldItim, setOldItim] = useState([]);
  const [newItim, setNewItim] = useState([]);
  const [balanceItim, setBalanceItim] = useState([]);

  const [selectType, setSelectType] = useState([]);
  const [inputCheck, setinputCheck] = useState(false);
  const [inputBalance, setInputBalance] = useState('');

  const axiosTypeItim = async () => {
    console.log('start axios List Type Itim');
    try {
      const response = await axios.get('https://important-shrug-bee.cyclic.app/itim/');
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
      console.log('SHOW TYPEITIM');
      console.log(itimData);
      console.log('end axios List Type Itim');
    } catch (error) {
      console.log(`Connection to itimDB: ${error}`);
      alert(`Connection to itimDB: ${error}`);
    }
  };

  const axiosNew = async () => {
    console.log('Start Axios New Query');

    try {
      //http://localhost:3001//newItim?date=2023-06-08&name=landmark
      // const response = await axios.get(`http://localhost:3001/newItim`
      const response = await axios.get(`https://important-shrug-bee.cyclic.app/newItim`
      , {
        params: {
          date: date,
          name: name,
        },
      });
      console.log('SHOW NEWITIM')
      console.log(response.data)
      setNewItim(response.data);
      console.log('END Axios New Query');
    } catch (error) {
      console.error(error);
    }
  };

  const axiosBalance = async () => {
    console.log('Start Axios Balance Query');
    try {
      const response = await axios.get(`https://important-shrug-bee.cyclic.app/balanceItim`, {
      // const response = await axios.get(`/api/balance/`,{
        params: {
          date: date,
          name: name
        }
      });
      console.log('SHOW BALANCE')
      console.log(response.data)
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
      //https://important-shrug-bee.cyclic.app
      const response = await axios.get(`https://important-shrug-bee.cyclic.app/oldItim`, {
        params: {
          date: date,
          name: name,
        },
      });
      console.log('SHOW OLDITIM')
      console.log(response.data)
      setOldItim(response.data);
      console.log('End Axios Old Query');
    } catch (err) {
      console.error(err);
      alert(`Error Axios balance: ${err}`);
    }
  };

  // const getTypeItimData = (typeItim, data) => {
  //   const foundItem = data.find((item) => item.typeItim === typeItim);
  //   return foundItem ? foundItem.total_quantity : 0;
  // };

  const handleSaveBalance = async (typeItim) => {

    const itimDetail = {
      date: date,
      name: name,
      typeitim: typeItim,
      quantity: inputBalance,
    };

    if (inputBalance === null) {
      setInputBalance(null);
      console.log('Addsdasd success' + inputBalance );
      setinputCheck(!inputCheck)
    } else {
      let check = balanceItim.find((i) => i.typeitim === typeItim )? true : false

      console.log(check)

      if (check) {

        try {
              const addBalance = await axios.put('https://important-shrug-bee.cyclic.app/putBalance', itimDetail);
              if (addBalance.status === 200) {
                axiosBalance();
                setInputBalance(null);
                console.log('Add success');
                setinputCheck(!inputCheck)
              } else {
                console.log('Error');
              }
            } catch (error) {
              console.error('Error:', error);
              alert(`Error update balance: ${error}`);
            }

      } else {

        try {
          const addBalance = await axios.post('https://important-shrug-bee.cyclic.app/postBalance', itimDetail);
          if (addBalance.status === 200) {
            axiosBalance();
            setInputBalance(null);
            console.log('Add success');
            setinputCheck(!inputCheck)
          } else {
            console.log('Error');
          }
        } catch (error) {
          console.error('Error:', error);
          alert(`Error update balance: ${error}`);
        }
      }
    }
  };

  const sumMoney = () => {
    let total = 0;
    for (let i = 0; i < typeItim.length; i++) {
      const itim = typeItim[i].itim_type;
      const oldQuantity = oldItim.find((o) => o.typeitim === itim)?.quantity || 0;
      const newQuantity = newItim.find((n) => n.typeItim === itim)?.quantity || 0;
      const totalQuantity = parseInt(oldQuantity) + parseInt(newQuantity)
      const balanceQuantity = balanceItim.find((i) => i.typeitim === itim)?.quantity || 0;
      const soldOut = parseInt(totalQuantity) - parseInt(balanceQuantity)
      const piece = parseFloat(typeItim[i].itim_piece)
      const money = (parseInt(soldOut) * piece)
      total += money;
    }
    return total;
  }

  const quantityBalance = (itim) => {
    const valume = balanceItim.find((i) => i.typeitim === itim)? true : false;
    return valume;
  }

  useEffect(() => {
    axiosTypeItim();
    axiosNew();
    axiosOld();
    axiosBalance();
    sumMoney();

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
            const newQuantity = newItim.find((i) => i.typeItim === typeItim)?.quantity || 0;
            const balanceQuantity = balanceItim.find((i) => i.typeitim === typeItim)?.quantity || 0;
            const totalQuantity = parseInt(newQuantity) + parseInt(oldQuantity);
            const soldOut = totalQuantity - balanceQuantity;
            const money = soldOut * type.itim_piece;

            return (
              <tr key={index}>
                <td className="p-4">{typeItim}</td>
                <td className="p-4">{oldQuantity}</td>
                <td className="p-4">{newQuantity}</td>
                <td className="p-4">{totalQuantity}</td>
                <td className="p-4">
                  <div className='flex justify-center'>
                    {inputCheck && typeItim === selectType ?  
                    <>                 
                      <input className='border p-2 w-14 border-gray-400 rounded-lg h-full text-center'
                        type= "number"
                        placeholder= {balanceQuantity}
                        onChange={(event) => {setInputBalance(event.target.value)}}
                      />
                      <button className={`rounded-lg p-2 w-28 ml-2 text-white ${quantityBalance(typeItim) === true ? 'bg-blue-500' : 'bg-lime-500'}`}
                      onClick={() => handleSaveBalance(typeItim)}
                      >
                        {quantityBalance(typeItim) === true ? 'Update' : 'Save'}
                      </button>
                    </>
                    :
                    <>
                    <label className='border p-2 w-14 border-gray-400 rounded-lg h-full'
                    onClick={() => { setinputCheck(!inputCheck)
                                      setSelectType(typeItim)}}>
                      {balanceQuantity}
                    </label>
                    <button className={` bg-gray-300 p-2 w-28 rounded-lg ml-2 text-black`}
                      onClick={() => { setinputCheck(!inputCheck)
                                      setSelectType(typeItim)}}>
                      edit
                    </button>
                    </>
                    }
                  </div>  
                </td>
                <td className="p-4">{soldOut} * {type.itim_piece}</td>
                <td className="p-4">{money}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='bg-gray-300 text-4xl p-3 mt-3 rounded-xl'>
        <h1 className='text-right '>Total : {sumMoney()} </h1>
      </div>

      <div className="h-full grid grid-cols-3 gap-2 my-2 p-2 rounded-xl bg-gray-300">

        <div className='col-span-2 w-full'>
          <table class="tabl-auto w-full text-3xl text-left">
            <thead className='bg-white'>
              <tr>
                <th>Title</th>
                <th>Option</th>
                <th>Money</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ITIM</td>
                <td>-</td>
                <td>{sumMoney()}</td>
              </tr>
              <tr>
                <td>DRYICE</td>
                <td>4 * 25</td>
                <td>100</td>
              </tr>
              <tr>
                <td>HOME</td>
                <td>-</td>
                <td>25</td>
              </tr>
              <tr>
                <td>CAR</td>
                <td>-</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Other</td>
                <td>ยางใน ยางนอก</td>
                <td>160</td>
              </tr>
              <tr>
                <td>Overdue</td>
                <td>ยอดค้างชำระ</td>
                <td>160</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='grid gap-2 text-3xl'>
          <label className='bg-white p-2 rounded-xl'>Total : {sumMoney()}</label>
          <input 
          type='number'
          placeholder='Payment '
          className='rounded-xl p-2 w-full'
          onChange={(event) => {se}}
          />
          <label className=''>Overdue : 0</label>
          <button className='bg-red-500 hover:bg-red-800 rounded-xl p-2'
          onClick={()=>{console.log(sumMoney())}}>
            Click balance
          </button>
        </div>

      </div>
    </>
  );
};