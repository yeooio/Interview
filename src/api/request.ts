// request.ts
import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || ''; // 确保使用正确的基础URL

const service = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器 - 修复认证问题
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};

    // 使用默认令牌作为后备
    const token =
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA';

    // 确保使用正确的授权格式
    config.headers.Authorization = token;

    // 为每个请求添加唯一ID
    config.headers['X-Request-ID'] = generateRequestId();

    // 对于文件上传请求，删除Content-Type头，让浏览器自动设置
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 改进错误处理
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  
  (error: AxiosError) => {
    const status = error.response?.status || 500;
    const errorMap: Record<number, string> = {
      400: '请求参数错误',
      401: '认证失败，请检查您的令牌',
      403: '访问被拒绝',
      413: '文件大小超过限制',
      415: '不支持的媒体格式',
      500: '服务器内部错误',
    };

    const message = errorMap[status] || '请求失败';
    const errorData = error.response?.data || {};

    console.error(`[${status}] ${message}`, errorData);

    // 对于401错误，显示用户友好的消息
    if (status === 401) {
      alert('认证失败：您的会话可能已过期，请刷新页面重试');
    }

    return Promise.reject({ ...error, message });
  }
);




// 生成唯一请求ID
function generateRequestId(): string {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

export default service;

// 在您的request.ts文件中添加这个方法
export const getCareerByRegionId = (params: { regionId: string }) => {
  return service({
    url: '/customer/career/getByRegionId',
    method: 'GET',
    params: {
      regionId: params.regionId
    },
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA'
    }
  })
}
