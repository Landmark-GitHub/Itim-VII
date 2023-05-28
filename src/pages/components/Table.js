import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Table = (props) => {
  const { date, name } = props;
  const [typeItim, setTypeItim] = useState([]);
  const [newItim, setNewItim] = useState([]);
  const [balanceValues, setBalanceValues] = useState([]);
  
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
      // console.log(typeItim);
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
      // console.log( name );
      // console.log( newValues );
      console.log('END Axios New Query');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosTypeItim();
    axiosNew();
  }, [date, name]);

  const getTypeItimData = (typeItim, data) => {
    const foundItem = data.find((item) => item.typeItim === typeItim);
    return foundItem ? foundItem.total_quantity : 0;
  };

  const handleBalanceChange = (event, typeitim) => {
    const value = event.target.value;
    setBalanceValues(value);
  };  

  return (
    <>
      <table className="table-auto w-full bg-white rounded-lg text-2xl text-center">

        <thead>
          <tr>
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
              <td className="p-4">0</td>
              <td className="p-4">
                <input
                  type="number"
                  placeholder={0}
                  className="w-20 h-full border border-gray-400 rounded-lg text-center"
                  value={balanceValues}
                  onChange={(event) =>handleBalanceChange(event, typeItim.itim_type)}
                />
              </td>
              <td className="p-4">{typeItim.itim_piece}</td>
              <td className="p-4">0</td>
            </tr>
          ))}
        </tbody>

      </table>

      <button className="bg-red-500 m-4 p-4" onClick={() => {console.log(balanceValues)}}>
        Click
      </button>

    </>
  );
};
