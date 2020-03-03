import axios from 'axios';

export const axiosWithAuth = () => {
   const token = localStorage.getItem('token');
   return axios.create({
      baseURL: 'https://cs-bw1-mud.herokuapp.com/',
      headers: {
         Authorization: `Token ${token}`
      }
   });
};
