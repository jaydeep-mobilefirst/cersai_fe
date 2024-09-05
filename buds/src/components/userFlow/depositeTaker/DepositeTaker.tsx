import SignUpSideBar from "./SignUpSideBar";
import NodalDetails from "../../../pages/depositeTaker/NodalDetails";
import React from "react";

const DepositeTaker=()=>{
    return(
        <div className="flex flex-row">
            <SignUpSideBar/>
            <NodalDetails/>
        </div>
    )
}

export default DepositeTaker;