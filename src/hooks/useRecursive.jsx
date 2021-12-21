/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';

export const useRecursive = (url) => {
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
          const response = await axios.get(`${url}/${str}`);
          const { abstract, URL } = response.data.message;
          if (abstract) {
            obj.ABSTRACT = abstract;
          } else if (str.startsWith('10.1002/') || str.startsWith('10.1037/')) {
            obj.ABSTRACT = 'Blocked';
            obj.failed = 'DOI is blocked';
          } else {
            const other = await axios.get(
              `${process.env.REACT_APP_API_URL}/fallback?URL=${URL}`,
            );
            obj.ABSTRACT = other.data.abstract;
          }
        } catch (loopError) {
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
