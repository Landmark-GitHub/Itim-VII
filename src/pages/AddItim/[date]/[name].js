import LayoutTet from '@/pages/components/LayoutTest';
import Layout from '@/pages/components/Layout';
import ListItim from '@/pages/components/ListItim';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DynamicPage() {

  const router = useRouter();
  const [activity, setActivity] = useState(router.query.activity || 'Uco');
  const [date, setDate] = useState(router.query.date || '');
  const [name, setName] = useState(router.query.name || '');

  return (
    <>
      <Layout
        name = {router.query.name}
        setName = {setName}
        date = {router.query.date}
        setDate = {setDate}
        activity = {router.query.activity }
      >
          <div className=''>
            <h1>AddItim Page </h1>
            <h1>status : {activity}</h1>
          </div>
      </Layout>
    </>
  );
}