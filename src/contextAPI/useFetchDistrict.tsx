import React, { useEffect, useState } from 'react'
import { axiosTraceIdInstance } from '../utils/axios';

type Props = {
  stateId : number | null | undefined
}

const useFetchDistrict = ({stateId}: Props) => {
  const [statesLoader, setDistrictLoader] = useState(false);
  const [districts, setDistricts] = useState<any>([]);


  useEffect(() => {
    if (stateId) {
      setDistrictLoader(true)
      axiosTraceIdInstance.get(`/location/district/${stateId}?page=1&pagesize=100`)
    .then((res) => {
      let data = res.data;
      if (data?.status === 'success') {
        setDistricts(data?.data?.list);
      }
      else{
        setDistricts([])
      }
      
    })
    .finally(() => {setDistrictLoader(false)})
    }
    else{
      setDistricts([])
      setDistrictLoader(false)
    }
    
  }, [stateId])

  return {districts, setDistrictLoader}
}

export default useFetchDistrict