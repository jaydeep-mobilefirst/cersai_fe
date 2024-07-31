import { useState, useEffect } from 'react';
import axios from 'axios';
import { bffUrl } from '../utils/api';
import uamStore from '../store/uamStore';
import { axiosTokenInstance } from '../utils/axios';

function useFetchRoles(entityId : string, perPage ?: number) {  
  const {update} = uamStore((state => state))
  const [roles, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(perPage ? perPage : 10);
  const [totalPages, setTotalPages] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [functionalitySearch, setFunctionalitySearch] = useState('')

  const handleSearch = () => {
    setData([])
    fetchData();
  }
  const fetchData = async () => {
    try {
      setLoading(true)
      if (entityId === '') {
        setLoading(false)
        return { roles : [], loading : false }
      }
      const response = await axiosTokenInstance.get(`/role/list/${entityId}?page=${page}&pageSize=${pageSize}&search=${searchString}&functionality=${functionalitySearch}`);
      setData(response.data?.roles)
      // console.log(response.data?.roles?.length)
      setTotal(response.data?.roles?.length)
      setPage(response.data.currentPage);
      // setPageSize(response.data?.totalData)
      setTotalPages(response.data?.totalPages)
      setLoading(false)
    } catch (err : any) {
      console.log({err});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([])
    fetchData();
  }, [entityId, page, update]);

  return { roles, loading, page, pageSize, total, totalPages, setSearchString, setPage, setFunctionalitySearch, searchString, handleSearch}
  
}

export default useFetchRoles;
