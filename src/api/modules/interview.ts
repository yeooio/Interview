// interview.ts
import axios from '../request';
import type {
  FaceAnalysisResponse,
  VoiceAnalysisResponse,
  RealTimeAnalysis,
} from '../types';

// 人脸分析接口
export const msrFace = (data: {
  sid: string;
  file: Blob;
}): Promise<FaceAnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', data.file, `frame-${Date.now()}.jpg`); // 添加文件名

  return axios.post('/customer/interview/msrFace', formData, {
    params: { sid: data.sid },
  });
};

// 语音分析接口
export const msrVoice = (data: {
  sid: string;
  recordId: string;
  file: Blob;
}): Promise<VoiceAnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', data.file, `audio-${Date.now()}.webm`);

  return axios.post('/customer/interview/msrVoice', formData, {
    params: {
      sid: data.sid,
      recordId: data.recordId,
    },
  });
};

// 创建WebSocket连接
export const createAnalysisSocket = (
  type: 'face' | 'voice',
  sid: string,
  onMessage: (analysis: RealTimeAnalysis) => void
): WebSocket => {
  const token =
    localStorage.getItem('token') ||
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA';

  // 使用正确的WebSocket URL
  const url = `ws://8.136.127.46:8080/customer/msr/${type}/${sid}?token=${token}`;

  const ws = new WebSocket(url);

  ws.onmessage = event => {
    try {
      const parsedData = JSON.parse(event.data);

      if (type === 'face') {
        onMessage({ type: 'face', data: parsedData as FaceAnalysisResponse });
      } else {
        onMessage({ type: 'voice', data: parsedData as VoiceAnalysisResponse });
      }
    } catch (error) {
      console.error(`解析${type}分析数据失败:`, error);
    }
  };

  ws.onerror = error => {
    console.error(`${type} WebSocket错误:`, error);
  };

  ws.onclose = event => {
    console.log(`${type} WebSocket连接关闭:`, event.reason);
  };

  return ws;
};

// 安全关闭WebSocket连接
export const safeCloseSocket = (ws: WebSocket | null) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close(1000, '正常关闭');
  }
};
