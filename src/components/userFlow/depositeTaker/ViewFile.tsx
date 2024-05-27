import axios from 'axios';
import React, { useState } from 'react'
import { bffUrl } from '../../../utils/api';
import Swal from 'sweetalert2';
import { getMimeTypeFromArrayBuffer } from '../../../utils/commonFunction';
import LoaderSpin from '../../LoaderSpin';

type Props = {
    uploadFileId : string
}

const ViewFile = ({uploadFileId}: Props) => {

 const [viewLoader, setViewLoader] = useState(false);
 const getFileDatafromBuffer = async (arrayBuffer : any) => {    
    const buffer = new Uint8Array(arrayBuffer);
    const type = await getMimeTypeFromArrayBuffer(buffer);
    const blob = new Blob([buffer], { type: type ?? "" });
    const imageUrl = URL.createObjectURL(blob);
    window.open(imageUrl, '_blank', 'noopener')
}

  const handleOnClikcView = async () => {
    try {
      setViewLoader(true)
      const response = await axios.get(`${bffUrl}/openkm/get/${uploadFileId}`);
      const data = await response.data;
      if (data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon : "error",
          title : "Internal Server Error",
          text : "Unable to Open File"
        })
        setViewLoader(false);
        return;
      }
      const arrayBuffer = data?.data?.data
      await getFileDatafromBuffer(arrayBuffer); 
      setViewLoader(false)
    } catch (error) {
      setViewLoader(false);
    }
    
  }
  return (
    <div 
        className='absolute py-1 px-5 rounded'
        role='button' 
        aria-disabled={viewLoader} 
        onClick={handleOnClikcView}>
            {viewLoader ? <LoaderSpin/> : "View"}
    </div>
  )
}

export default ViewFile