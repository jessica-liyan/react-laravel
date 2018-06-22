import axios from 'axios'

const getData = function(url){
  return axios({
    method: 'get',
    url: url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

const postData = function (url, data) {
  return axios({
    method: 'post',
    url: url,
    data: data
  })
}

// 注册
export function register (name, email, password, captcha, key) {
  return getData(`http://localhost/api/public/api/register?name=${name}&email=${email}&password=${password}&captcha=${captcha}&key=${key}`)
}

// 登录
export function login (name, password, captcha, key) {
  return getData(`http://localhost/api/public/api/login?name=${name}&password=${password}&captcha=${captcha}&key=${key}`)
}

// 获取验证码
export function fetchCaptcha () {
  return getData(`http://localhost/api/public/api/captcha?theme=flat`)
}

// 文章列表
export function fetchArticle () {
  return getData(`http://localhost/api/public/api/articles`)
}

// 添加文章
export function addArticle (data) {
  return postData(`http://localhost/api/public/api/article/add`, data)
}

// 获取文章详情
export function fetchArticleDetail (id) {
  return getData(`http://localhost/api/public/api/article/${id}`)
}

// 获取服务器图片存储目录
export function getStorageUrl(){
  return 'http://localhost/api/storage/app/'
}

// 上传文件
export function uploadFile (files) {
  return postData(`http://localhost/api/public/api/upload/file`, {
    files: files
  })
}

