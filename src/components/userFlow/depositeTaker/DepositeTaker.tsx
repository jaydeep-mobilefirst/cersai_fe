import SignUpSideBar from "./SignUpSideBar";
import NodalDetails from "../../../pages/depositeTaker/NodalDetails";

const DepositeTaker=()=>{
    return(
        <div className="flex flex-row">
            <SignUpSideBar/>
            <NodalDetails/>
        </div>
    )
}

export default DepositeTaker;