import md5 from "blueimp-md5";

export const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');

const authString = md5(`${import.meta.env.VITE_API_PASSWORD}_${timestamp}`);
export const fetchHeader = {
  headers: {
    'X-Auth': authString,
  }
};