/*
 * @Author: zhangzhenyang 
 * @Date: yyyy-01-dd 10:23:26 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: yyyy-01-dd 10:23:26 
 */
'use strict'

import axios from 'axios';
import qs from 'qs';
import api from './api';

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常',
    s: response && response.status,
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    let msg = `${res.msg}${res.s ? '('+ res.s +')' : '' }`;
    try{
      window.p.$store.commit('showSnackbar', {text: msg});
    } catch(e){
      alert(msg);
    }
  }
  if(res.data && res.data.author) {
    location.href = 'https://oauth.taobao.com/authorize?response_type=code&client_id=12020783&redirect_uri=http://2015.wonbao.net/authorize/web&scope=promotion,item,usergrade&view=web&state=%2Fmain';
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: window.remote,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: window.remote,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}