/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetch = (url, refetch = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  useEffect(async () => {
    try {
      setError('');
      const response = await axios.get(url);
      setIsLoading(false);
      setData(response.data);
      setIsSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(err);
    }
  }, [refetch]);
  return {
    isLoading,
    result,
    isSuccess,
    error,
  };
};

export const useActionFetch = (url, config = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const dispatch = async (options = {}) => {
    try {
      setError('');
      setIsSuccess(false);
      setIsLoading(true);
      const response = await axios.get(url, { ...config, ...options });
      setIsLoading(false);
      setData(response.data);
      setIsSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(err);
    }
  };
  return {
    isLoading,
    result,
    isSuccess,
    error,
    dispatch,
  };
};
