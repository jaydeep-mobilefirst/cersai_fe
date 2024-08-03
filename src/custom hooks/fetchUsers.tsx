import { useState, useEffect } from 'react';
import uamStore from '../store/uamStore';
import { axiosTokenInstance } from '../utils/axios';

function useFetchUsers(entityId : string) {
  const {update} = uamStore((state => state))
  const [users, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    try {
      if (entityId === '') {
        setLoading(false)
        return { roles : [], loading : false }
      }
      const response = await axiosTokenInstance.get(`/user/list/${entityId}?page=${page}&pageSize=10&search=${searchString}&roleName=${functionalitySearch}`);      
      setData(response.data?.data?.userList)
      setPage(response.data?.data?.currentPage);
      setTotal(response.data?.data?.userList?.length)
      // setPageSize(response.data?.data?.totalData)
      setTotalPages(response.data?.data?.totalPages)
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

  return { users, loading, page, pageSize, total, totalPages, setSearchString, setPage, setFunctionalitySearch , handleSearch}
  
}

export default useFetchUsers;