import { useEffect } from 'react';
// import axios from 'axios';
// import md5 from 'blueimp-md5';
// import { timestamp } from '../utils/common';

const NoName = () => {
  // const authString = md5(`${import.meta.env.VITE_API_PASSWORD}_${timestamp}`);

  // const headers = {
  //   'X-Auth': authString,
  // };

  // const requestOptions = {
  //   method: 'POST',
  //   url: import.meta.env.VITE_API_URL,
  //   headers,
  // data: {
  //   action: 'get_fields',
  //   params: { field: 'brand', offset: 3, limit: 5 },
  // },
  // };

  useEffect(() => {
    // axios(requestOptions).then((response) => {
    //   if (response.ok) {
    //     console.log(response, 'good');
    //   } else {
    //     if (response.status === 401) {
    //       console.error('Неверный X-Auth токен');
    //     } else {
    //       console.error('Ошибка запроса:', response.statusText);
    //     }
    //   }
    // });
    // axios
    //   .post(
    //     'http://api.valantis.store:40000/',
    //     {
    //       action: 'filter',
    //       params: { price: 175000.0 },
    //     },
    //     {
    //       headers: {
    //         'X-Auth': 'md5("Valantis_20240222")',
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);
  return <div>NoName</div>;
};

export default NoName;
