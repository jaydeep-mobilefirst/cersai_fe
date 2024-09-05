import axios from 'axios';
import React, { useState } from 'react'
import { bffUrl } from '../../../utils/api';
import Swal from 'sweetalert2';
import sendLink from './../../../assets/images/telegram.svg'
import sent from './../../../assets/images/done.svg'
import LoaderSpin from '../../LoaderSpin';
type Props = {
    email : string
}

const SendActivationLink = ({email}: Props) => {
    const [loader, setLoader ] = useState(false);
    const [logo, setLogo] = useState<any>(sendLink)
    const [disabled, setDisabled ] = useState(false)
    const sendActivationLink = async () => {
        if (logo === sent) {
            return
        }
        try {
            setLoader(true)
            const response = await axios.post(`${bffUrl}/user/send-activation-link`, {username : email});
            const data = response.data;
            Swal.fire({
                title : 'success',
                text : data?.message
            })
            setDisabled(true)
            setLoader(false)
            setLogo(sent)
            setTimeout(() => {
                setLogo(sendLink)
                setDisabled(false)
            }, 3000)
        } catch (error) {
            console.log({error});
            setLoader(false)
        }
    }
  return (
    <div>
        {
            loader ? 
            <LoaderSpin/>
            :
            <img
            title='Send Activation Link to current user'
            src={logo}
            alt="Send"
            className={!disabled ? "cursor-pointer" : ""} 
            onClick={sendActivationLink}
            />

        }
    </div>
  )
}

export default SendActivationLink