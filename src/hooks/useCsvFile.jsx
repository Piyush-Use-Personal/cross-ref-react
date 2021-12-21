import { useState } from 'react';
import * as XLSX from 'xlsx';

const useCSVFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setData] = useState([]);
  const [columns, setColumn] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/,
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i += 1) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/,
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j += 1) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columnsL = headers.map((c) => ({
      name: c,
      selector: c,
    }));

    setIsLoading(false);
    setData(list);
    setColumn(columnsL);
    setIsSuccess(true);
  };
  const dispatch = async (file) => {
    try {
      setError('');
      setIsSuccess(false);
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(err);
    }
  };
  return {
    isLoading,
    result,
    columns,
    isSuccess,
    error,
    dispatch,
  };
};

export default useCSVFile;
