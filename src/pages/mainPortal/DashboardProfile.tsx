import React from 'react'
import DashboardProfileSidebar from '../../components/userFlow/mainPortal/DashboardProfileSidebar'
import { useSearchParams } from 'react-router-dom';
import ProfileEntityDetails from './Edit Profile/ProfileEntityDetails';
import TaskTabs from '../../components/userFlow/mainPortal/TaskTabs';
import ProfileResponsiveTabs from '../../components/userFlow/mainPortal/ProfileResponsiveTabs';
import ProfileNodalDetails from './Edit Profile/ProfileNodalDetails';
import ProfileRegulatorDetails from './Edit Profile/ProfileRegulatorDetails';
import ProfileUploadDocuments from './Edit Profile/ProfileUploadDocuments';
import ProfileBranches from './Edit Profile/ProfileBranches';

type Props = {}

const DashboardProfile = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = searchParams.get("current")
  return (
    <>
    <div className='lg:hidden'>
    <ProfileResponsiveTabs/>
    </div>
    <div className='flex flex-row'>
      <DashboardProfileSidebar />
      {current === "entity" && <ProfileEntityDetails />}
      {current === "nodal" && <ProfileNodalDetails />}
      {current === "regulator" && <ProfileRegulatorDetails />}
      {current === "documents" && <ProfileUploadDocuments />}
      {current === "branches" && <ProfileBranches />}
    </div>
    </>
  )
}

export default DashboardProfile