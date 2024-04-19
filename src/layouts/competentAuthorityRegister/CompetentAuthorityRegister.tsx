import React from 'react'

import { Outlet } from 'react-router-dom';
import SignUpSideBar from '../../components/userFlow/competentAuthority/SignUpSideBar';

const CompetentAuthorityRegister = () => {
  return (
    <div className='flex'>
    <SignUpSideBar/>

    <Outlet/>
    </div>
  )
}

export default CompetentAuthorityRegister