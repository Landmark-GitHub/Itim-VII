import LayoutTet from '@/pages/components/LayoutTest';
import Layout from '@/pages/components/Layout';
import ListItim from '@/pages/components/ListItim';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DynamicPage() {

  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  return (
    <>
      <Layout
      >
        {activity === 'AddItim' && (
          <ListItim/>
        )}

        {activity === 'CheckItim' && (
          <div div className=''>
            <h1>CheckItim Page </h1>
            <h1>Date : {router.query.date}</h1>
            <h1>Name : {router.query.name}</h1>
            <h1>status : {router.query.activity}</h1>
          </div>
        )}


    </Layout >
    </>
  );
}