import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const service = axios.create({
  baseURL,
  timeout: 30000, // 文件上传需要更长的超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token') || 'default_token_here';
    config.headers.Authorization = `Bearer ${token}`;

    // 为每个请求添加唯一ID
    config.headers['X-Request-ID'] = generateRequestId();

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 校验数据结构
    if (response.config.url?.includes('msrFace') && !response.data.face) {
      console.error('Invalid face analysis response structure');
    }
    if (response.config.url?.includes('msrVoice') && !response.data.voice) {
      console.error('Invalid voice analysis response structure');
    }
    return response.data;
  },
  (error: AxiosError) => {
    // 统一错误处理
    const errorMap: Record<number, string> = {
      400: '请求参数错误',
      401: '认证失败',
      413: '文件大小超过限制',
      415: '不支持的媒体格式',
      500: '服务器内部错误',
    };

    const message = errorMap[error.response?.status || 500] || '请求失败';
    console.error(`[${error.response?.status}] ${message}`);
    return Promise.reject(error);
  }
);

// 生成唯一请求ID
function generateRequestId(): string {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export default service;
