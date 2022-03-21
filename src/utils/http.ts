import axios from 'axios';
import session from '@/store/modules/sessionModule';
import store from '@/store';
axios.defaults.withCredentials = true;

const URL  =  'https://api.filicabh.com/api/v1'

const http = axios.create({
  baseURL: URL
});

const https = axios.create({
  baseURL: URL
});



let isAlreadyFetchingAccessToken = false;

http.interceptors.request.use( (config) => {
  store.commit('loading',true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    const token : any = localStorage.getItem('_token');
    const tk  = token?.replaceAll('"',"");
    config.headers.Authorization = `Bearer ${tk}`;
    config.headers['Content-Type'] = 'application/vnd.api+json'
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});
  
https.interceptors.request.use( (config) => {
  store.commit('loading',true);
  // Optional headers
  if (localStorage.getItem('_token')) {
    //const token = localStorage.getItem('_token');
   // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});


http.interceptors.response.use( (response) => {

  store.commit('loading',false);
  store.commit('errors',{});
  store.commit('error',false);
  return response;

}, async (error: any) => {
  console.log('ERROR')
  console.log(error.response.data)
  store.commit('loading',false);
  store.commit('errors',error.response.data || { "none": [error.response.data]  });
  store.commit('error',true);
  const { config, response: { status } } = error;
  const originalRequest = config;
  let isRefreshOk: boolean = false;

  if (status === 401) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      isRefreshOk = await session.getRefreshToken();
      isAlreadyFetchingAccessToken = false;
    }
    if (isRefreshOk) {
      const retryOriginalRequest = new Promise((resolve) => {
          resolve(http(originalRequest));
      });
      return retryOriginalRequest; 
    } else {
      return Promise.reject(error); 
    }
  } else { 
   return Promise.reject(error);
  }
});


export { http, https, URL};



