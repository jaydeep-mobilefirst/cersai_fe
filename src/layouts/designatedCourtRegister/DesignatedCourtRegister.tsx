import React from 'react'

import { Outlet } from 'react-router-dom';
import SignUpSideBar from '../../components/userFlow/designatedCourt/SignUpSideBar';

const DesignatedCourtRegister = () => {
  return (
    <div className='flex'>
    <SignUpSideBar/>

    <Outlet/>
    </div>
  )
}

export default DesignatedCourtRegister;