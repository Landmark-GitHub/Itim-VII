import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Table = (props) => {
  const { date, name } = props;
  const [data, setData] = useState([]);

  const axiosNew = async () => {
    console.log('Start Axios New Query');
    try {
      const response = await axios.get(`/api/checkitim/GET/${date}/${name}`, {
        params: {
          date: date,
          name: name,
        },
      });
      setData(response.data);
      console.log({ name });
      console.log({ data });
      console.log('END Axios New Query');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosNew();
  }, [date, name]);

  const getTypeItimData = (typeItim) => {
    const foundItem = data.find((item) => item.typeItim === typeItim);
    return foundItem ? foundItem.total_quantity : 0;
  };

  const typeItimList = [
    'StickXL',
    'StickS',
    'Coffee',
    'Sandwich',
    'Cup',
    'Clone',
  ];

  return (
    <>
      <table className="table-auto w-full bg-gray-300 text-2xl text-center">
        <thead>
          <tr>
            <th className="bg-white p-4">TypeItim</th>
            <th className="bg-white p-4">Old</th>
            <th className="bg-white p-4">New</th>
            <th className="bg-white p-4">Total</th>
            <th className="bg-white p-4">Balance</th>
            <th className="bg-white p-4">SoldOut</th>
            <th className="bg-white p-4">Money</th>
          </tr>
        </thead>
        <tbody>
          {typeItimList.map((typeItim, index) => (
            <tr key={index}>
              <td className="bg-white p-4">{typeItim}</td>
              <td className="bg-white p-4">0</td>
              <td className="bg-white p-4">{getTypeItimData(typeItim)}</td>
              <td className="bg-white p-4">0</td>
              <td className="bg-white p-4">
                <input
                  type="text"
                  className="w-20 h-full border border-gray-400 rounded-lg"
                />
              </td>
              <td className="bg-white p-4">{getTypeItimData(typeItim)}</td>
              <td className="bg-white p-4">{getTypeItimData(typeItim)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-red-500 m-4 p-4" onClick={axiosNew}>
        Click
      </button>
    </>
  );
};
