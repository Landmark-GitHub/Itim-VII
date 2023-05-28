import LayoutTet from '@/pages/components/LayoutTest';
import Layout from '@/pages/components/Layout';
import ListItim from '@/pages/components/ListItim';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CheckItim } from '@/pages/components/CheckItim';

export default function DynamicPage() {

  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  return (
    <>
      <Layout>
        <div div="true">
          {activity === 'AddItim' && (
            <ListItim/>
          )}

          {activity === 'CheckItim' && (
            <CheckItim/>
          )}
        </div>
      </Layout >
    </>
  );
}