import React from 'react'
import SignUpSideBar from '../../components/userFlow/depositeTaker/SignUpSideBar';
import { Outlet } from 'react-router-dom';

const DepositTakerRegisterFlow = () => {
  return (
    <div className='flex'>
    <SignUpSideBar/>
    <Outlet/>
    </div>
  )
}

export default DepositTakerRegisterFlow