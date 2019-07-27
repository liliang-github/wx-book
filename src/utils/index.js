import config from './config'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function get (url, data) {
  return request(config.baseUrl + url, data)
}
export function post (url, data) {
  return request(config.baseUrl + url, data, 'post')
}

export function request (url, data, method = 'get') {
  return new Promise((resolve, reject) => {
    mpvue.request({
      url,
      method,
      data,
      success: resolve,
      fail: reject
    })
  })
}
export function loading (msg) {
  mpvue.showLoading({ title: msg })
}
export function loaded () {
  mpvue.hideLoading()
}

export function success (msg, duration = 2000) {
  setTimeout(() => {
    mpvue.showToast({
      title: msg,
      duration
    })
  }, 300)
}

export function info (msg, duration = 2000) {
  setTimeout(() => {
    mpvue.showToast({
      title: msg,
      duration,
      icon: 'none'
    })
  }, 300)
}

export function chooseImage () {
  return new Promise((resolve, reject) => {
    mpvue.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: (res) => {
        resolve(res.tempFiles[0])
      },
      fail: reject
    })
  })
}

export function scanCode () {
  return new Promise((resolve, reject) => {
    mpvue.scanCode({
      success: resolve,
      fail: reject
    })
  })
}

export function toUrlSearch (obj) {
  let search = ''
  for (let key in obj) {
    search += `${key}=${obj[key]}`
  }
  return search
}

export function chunk (arr, size) {
  let res = []
  arr.forEach((el, index) => {
    let i = Math.floor((index / size))
    if (!res[i]) {
      res[i] = []
    }
    res[i].push(el)
  })
  return res
}

export default {
  formatNumber,
  formatTime,
  get,
  post,
  request
}
