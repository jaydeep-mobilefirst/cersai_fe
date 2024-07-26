import { useState, useEffect } from 'react';
import axios from 'axios';
import { bffUrl } from '../utils/api';

function useFetchFunctionalityForUAM(entityType : string) {
  const maxRetries = 5
  const [uamFunctionalities, setData] = useState<any[]>([]);
  const [functionalityLoading, setLoading] = useState(true);
  const [uamFuncError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (attempt = 1) => {
      try {
        const response = await axios.get(`${bffUrl}/role/basicfunctionalities/${entityType}`);
        setData(response.data.map((f : any) => ({value : f.id, label : f.functionality, roleName : f.roleName})));
        setError(null);
      } catch (err : any) {
        if (attempt <= maxRetries) {
          fetchData(attempt + 1);
        } else {
          console.error('Max retries reached:', err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maxRetries]);

  return { uamFunctionalities, functionalityLoading, uamFuncError };
}

export default useFetchFunctionalityForUAM;
