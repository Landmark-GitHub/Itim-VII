import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const NavMember = () => {

  const router = useRouter();
  const activity = router.query.activity;
  const date = router.query.date;
  const nname = router.query.name;

  const [listMember, setListMember] = useState([]);
  const [detailMember, setDetailMember] = useState([]);

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idcard, setIdcard] = useState('');


  
  const selectMember = (id, name, phone, idcard) => {
    setDetailMember({
      id: id,
      name: name,
      phone: phone,
      idcard: idcard,
    })
    router.push(`/${activity}/${date}/${name}`)
  };

  const axiosMember = async () => {

    try {
      //https://important-shrug-bee.cyclic.app/members
      const req = await axios.get('https://important-shrug-bee.cyclic.app/members')
      setListMember(req.data)
    } catch (error) {
      console.log(`Axios List Member : ${error}`);
      alert(`Axios List Member : ${error}`);
    }

  }

  const openModaledit = (id) => {
    try {
      if (id === detailMember.id) {
        console.log('Edit Member')
        setModalEdit(!modalEdit)
      } else {
        swal("Select the member you want to edit first.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const editMember = async (event) => {
    event.preventDefault();
    const newDetail = {
      member_id: detailMember.id,
      member_name: name === '' ? detailMember.name : name,
      member_phone: phone === '' ? detailMember.phone : phone,
      member_idcard: idcard === '' ? detailMember.idcard : idcard,
    };
    try {
      const response = await axios.put('http://localhost:3000/api/member/', newDetail);
      if (response.status === 200) {
        axiosMember();
        setModalEdit(!modalEdit)
      } else {
        console.error(`HTTP error ${response.status}`);
        alert(`มีข้อผิดพลาดเกิดขึ้น Member: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`มีข้อผิดพลาดเกิดขึ้น Member: ${error}`);
    }
  }

  const removeMember = async (id) => {
    try {
      if (id === detailMember.id) {
        const willDelete = await swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this member!",
          icon: "warning",
          buttons: {
            cancel: {
              text: "Cancel",
              value: false,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "Yes",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            }
          },
          dangerMode: true,
        });
  
        if (willDelete) {
          // Perform the delete operation
          const response = await axios.delete(`http://localhost:3000/api/member/${id}`);
          axiosMember();
          swal("Remove Member Success", "The member has been deleted.", "success");
        }
      } else {
        swal("Select Member");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const addMember = async (event) => {
    event.preventDefault();
    const newMember = {
      member_name: name,
      member_phone: phone,
      member_idcard: idcard,
    };

    try {
      const response = await axios.post('https://important-shrug-bee.cyclic.app/members/', newMember)
      axiosMember();
      setModalAdd(!modalAdd);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error Add Member: ${error}`);
    }
  }

  useEffect(() => {
    axiosMember();
  }, [])


  return (
    <>
      <nav className='h-full w-1/10 drop-shadow-xl'>
        <div className={`h-1/6 drop-shadow-xl flex text-center items-center justify-center cursor-pointer bg-white`}>
          <h1 className={`text-3xl text-gray-800`}>Member</h1>
        </div>
        <div className={`bg-white overflow-x-auto h-5/6 w-full`}>
          {Array.isArray(listMember) && listMember.map((member) => (
            <div key={member.member_id} className={`bg-gray-200 m-2 p-2 text-center rounded-lg ${detailMember.id === member.member_id || nname === member.member_name ? 'bg-gray-500' : ''}`}
              onClick={() => selectMember(member.member_id, member.member_name, member.member_phone, member.member_idcard)}>
              <div className="text-lg whitespace-pre duration-700">
                <h2 className={`text-xl font-bold`}>
                  {member.member_name}
                </h2>
                <span>
                  {member.member_phone}
                </span>
              </div>
              <div className="flex justify-between pt-0" onClick={(e) => e.stopPropagation()}>

                <button className="bg-blue-500 m-1 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openModaledit(member.member_id)}>
                  Edit
                </button>

                <button className="bg-red-500 m-1 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeMember(member.member_id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}


          <div className={`bg-gray-200 hover:bg-gray-400 m-2 h-10 justify-center text-center rounded-lg`}
            onClick={() => setModalAdd(!modalAdd)}>
            <button className={`m-2 text-center rounded-lg text-lg`}>+ Add Member</button>
          </div>

        </div>
      </nav>

      {modalAdd && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75' onClick={() => setModalAdd(!modalAdd)}></div>
            </div>
            <div className='bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2' onClick={(e) => e.stopPropagation()}>
              <div className='p-4'>
                <h1 className='text-2xl mb-4'>Add Member</h1>
                <form onSubmit={addMember}>
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2 '>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='phone' className='block text-gray-700 font-bold mb-2'>
                      Phone
                    </label>
                    <input
                      type='text'
                      id='phone'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='idcard' className='block text-gray-700 font-bold mb-2'>
                      ID Card
                    </label>
                    <input
                      type='text'
                      id='idcard'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setIdcard(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75' onClick={() => { setModalEdit(!modalEdit) }}></div>
            </div>
            <div className='bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2' onClick={(e) => e.stopPropagation()}>
              <div className='p-4'>
                <h1 className='text-2xl mb-4'>Setting Member ID: {detailMember.id} </h1>
                <form onSubmit={editMember}>
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2 '>
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={detailMember.name} />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='phone' className='block text-gray-700 font-bold mb-2'>
                      Phone
                    </label>
                    <input
                      type='text'
                      id='phone'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setPhone(e.target.value)}
                      defaultValue={detailMember.phone} />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='idcard' className='block text-gray-700 font-bold mb-2'>
                      ID Card
                    </label>
                    <input
                      type='text'
                      id='idcard'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      onChange={(e) => setIdcard(e.target.value)}
                      defaultValue={detailMember.idcard} />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default NavMember
