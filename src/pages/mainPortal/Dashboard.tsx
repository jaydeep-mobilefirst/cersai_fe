import React from 'react'
import TaskTabs from '../../components/userFlow/mainPortal/TaskTabs'
import { Outlet } from 'react-router-dom'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='relative xl:ml-[40px]'>
      <div className="mt-6">
        <TaskTabs />
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard