import { useState, useEffect } from 'react';
import axios from 'axios';
import { bffUrl } from '../utils/api';
import uamStore from '../store/uamStore';

function useFetchUsers(entityId : string) {
  const {update} = uamStore((state => state))
  const [users, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [searchString, setSearchString] = useState('')
  const [functionalitySearch, setFunctionalitySearch] = useState('')

  const handleSearch = () => {
    setData([])
    fetchData();
  }
  const fetchData = async () => {
    try {
      if (entityId === '') {
        return { roles : [], loading : false }
      }
      const response = await axios.get(`${bffUrl}/user/list/${entityId}?page=${page}&pageSize=10&search=${searchString}&roleName=${functionalitySearch}`);      
      setData(response.data?.data?.userList)
      setPage(response.data?.data?.currentPage);
      // setPageSize(response.data?.data?.totalData)
      setTotalPages(response.data?.data?.totalPages)
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

  return { users, loading, page, pageSize, totalPages, setSearchString, setPage, setFunctionalitySearch , handleSearch}
  
}

export default useFetchUsers;