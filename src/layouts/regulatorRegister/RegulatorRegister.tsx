import React from 'react'

import { Outlet } from 'react-router-dom';
import SignUpSideBar from '../../components/userFlow/regulatorCourt/SignUpSideBar';

const RegulatorRegister = () => {
  return (
    <div className='flex'>
    <SignUpSideBar/>

    <Outlet/>
    </div>
  )
}

export default RegulatorRegister;