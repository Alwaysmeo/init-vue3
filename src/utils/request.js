import Axios from 'axios'
import { Message } from '@arco-design/web-vue'

const axios = Axios.create({
    baseURL: `http://blog.hello2000.club/api/v1`,
    timeout: 8000,
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        return console.log(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
    (response) => {
        // 抛出异常
        if (response.data.code !== 200) return Message.error(response.data.msg)
        return response.data
    },
    (error) => {
        // 抛出异常
        return Message.error('服务器错误，请稍后再试')
    }
)

export default axios
