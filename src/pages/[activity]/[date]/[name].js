import LayoutTet from '@/pages/components/LayoutTest';
import Layout from '@/pages/components/Layout';
import ListItim from '@/pages/components/ListItim';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CheckItim } from '@/pages/components/CheckItim';
import axios from 'axios';

export default function DynamicPage() {

  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const name = router.query.name;

  // const dryicePiece = 25;

  // const [member, setMember] = useState([]);
  
  // const axiosMember = async () => {

  //   try {
  //     //const req = await axios.get('https://important-shrug-bee.cyclic.app/members'
  //     const req = await axios.get('http://localhost:3001/members',{
  //       params: {
  //         name: name
  //       }
  //     })
  //     // console.log('member details:' , req.data)
  //     setMember(req.data)
  //   } catch (error) {
  //     console.log(`Axios List Member : ${error}`);
  //     alert(`Axios List Member : ${error}`);
  //     return
  //   }

  // }

  // useEffect(() => {
  //   axiosMember();
  // })

  return (
    <main className="min-w-screen min-h-screen ">
      <Layout>
        <div div="true w-full h-full">
          {activity === 'AddItim' && (
          <ListItim 

          />)}
          {activity === 'CheckItim' && (
          <CheckItim 

          />)}
        </div>
      </Layout>
    </main>
  );
}