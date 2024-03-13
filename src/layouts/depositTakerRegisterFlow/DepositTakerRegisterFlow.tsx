import React from 'react'
import SignUpSideBar from '../../components/userFlow/depositeTaker/SignUpSideBar';

interface LayoutProps {
    children: React.ReactNode;
  }

const DepositTakerRegisterFlow = ({children}: LayoutProps) => {
  return (
    <div className='flex'>
    <SignUpSideBar/>
    {children}
    </div>
  )
}

export default DepositTakerRegisterFlow