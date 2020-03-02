import axios from 'axios';

export const axiosWithAuth = () => {
   const token = localStorage.getItem('token');
   return axios.create({
      baseURL: 'https://lambda-mud-test.herokuapp.com/',
      headers: {
         Authorization: token
      }
   });
};
