/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

export const useRecursiveRef = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = async (data, key) => {
    try {
      setIsLoading(true);
      setError('');
      setIsSuccess(false);
      const dataset = data;
      setTotal(dataset.length);
      for (let i = 0; i < dataset.length; i += 1) {
        const str = dataset[i][key].trim();
        setIndex(i + 1);
        const obj = {
          index: i + 1,
          ...dataset[i],
        };
        try {
          if (!str) {
            obj.failed = 'Empty Reference';
          } else {
            const response = await axios.post(`${url}`, {
              consent: false,
              project: 'XIAOMI_EU',
              jobNumber: str,
              partnerId: '1487701',
              repairStatus: '80',
            });
            if (response.data.status && response.data.status === 200) {
              obj.data = response.data;
            } else {
              obj.error = response.data;
              obj.failed = 'Some error occurred';
            }
          }
        } catch (loopError) {
          obj.error = loopError.response.data;
          obj.failed = 'Some error occurred';
        }
        setData((state) => [...state, obj]);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (dispatchError) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(dispatchError);
    }
  };
  return {
    isLoading,
    result,
    isSuccess,
    error,
    dispatch,
    total,
    index,
  };
};

export default {};
