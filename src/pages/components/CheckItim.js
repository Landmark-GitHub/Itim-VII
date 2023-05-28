import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from './Table';

export const CheckItim = () => {
  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  return (
    <div div="true" className="bg-green-500 w-full rounded-lg p-2">
      <div className="text-5xl py-4">
        <h1>Check Bill</h1>
      </div>
      <Table
        date = {date}
        name = {name}
      />
    </div>
  );
};





