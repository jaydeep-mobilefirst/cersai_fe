import { useState, useEffect } from 'react';
import axios from 'axios';
import { bffUrl } from '../utils/api';
import uamStore from '../store/uamStore';

function useFetchRoles(entityId : string, perPage ?: number) {  
  const {update} = uamStore((state => state))
  const [roles, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(perPage ? perPage : 10);
  const [totalPages, setTotalPages] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [functionalitySearch, setFunctionalitySearch] = useState('')

  const handleSearch = () => {
    fetchData();
  }
  const fetchData = async () => {
    try {
      if (entityId === '') {
        return { roles : [], loading : false }
      }
      const response = await axios.get(`${bffUrl}/role/list/${entityId}?page=${page}&pageSize=${pageSize}&search=${searchString}&functionality=${functionalitySearch}`);
      setData(response.data?.roles)
      setPage(response.data.currentPage);
      // setPageSize(response.data?.totalData)
      setTotalPages(response.data?.totalPages)
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

  return { roles, loading, page, pageSize, totalPages, setSearchString, setPage, setFunctionalitySearch, searchString, handleSearch}
  
}

export default useFetchRoles;
