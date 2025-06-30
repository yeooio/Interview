import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosHeaders } from 'axios';
import axios from 'axios';
console.log('[环境变量] VITE_API_URL =', import.meta.env.VITE_API_URL);
// import qs from 'qs';

// 环境配置
const baseURL = import.meta.env.VITE_API_URL;

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器

// 2. 请求拦截器（强制加 Token）
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || new AxiosHeaders();

    // 正式项目应从 localStorage 或 store 获取
    const token =
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA';
    config.headers.set('Authorization', `Bearer ${token}`);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器（保持你的原有逻辑）
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // 错误处理...
    return Promise.reject(error);
  }
);

export default service;