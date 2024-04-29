import MainPortalSidebar from '../../components/userFlow/mainPortal/MainPortalSidebar'
import { Outlet } from 'react-router-dom'
import Header from '../../components/userFlow/mainPortal/Header'

type Props = {}

const MainPortalLayout = (props: Props) => {
    return (
        <div >
            <MainPortalSidebar  layout={<Outlet/>}/>   
        </div>
    )
}

export default MainPortalLayout