import React, { useEffect, useState } from 'react'
import { axiosTraceIdInstance } from '../utils/axios';

type Props = {}

const useFetchStates = (props: Props) => {
  const [statesLoader, setStateLoader] = useState(false);
  const [states, setStates] = useState<any>([]);


  useEffect(() => {
    setStateLoader(true)
    axiosTraceIdInstance.get(`/location/state/95?page=1&pagesize=100`)
    .then((res) => {
      let data = res.data;
      if (data?.status === 'success') {
        setStates(data?.data?.list);
      }
      else{
        setStates([])
      }
      
    })
    .finally(() => {setStateLoader(false)})
  }, [])

  return {states, statesLoader}
}

export default useFetchStates