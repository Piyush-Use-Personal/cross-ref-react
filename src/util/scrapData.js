/* eslint-disable no-async-promise-executor */
import axios from 'axios';
// import jsdom from 'jsdom';

// const { JSDOM } = jsdom;

const scrapData = (url) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios(url);
      //   const doiMessage = new JSDOM(response.data);
      //   console.log({
      //     doiMessage,
      //   });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export default scrapData;
