import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from './Table';
import Listmore from './Listmore';

export const CheckItim = () => {
  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  const [money, setMoney] = useState(0);

  useEffect(() => {

  },[setMoney])

  return (
    <div div="true" className="w-full rounded-lg p-2">
      <div className="text-5xl py-4">
        <h1>Check Bill</h1>
      </div>
      <Table
      />
    </div>
  );
};





