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
  formData.append('file', data.file);

  return axios.post('/customer/interview/msrFace', formData, {
    params: { sid: data.sid },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 语音分析接口
export const msrVoice = (data: {
  sid: string;
  recordId: string;
  file: Blob;
}): Promise<VoiceAnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);

  return axios.post('/customer/interview/msrVoice', formData, {
    params: {
      sid: data.sid,
      recordId: data.recordId,
    },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 创建WebSocket连接
 * @param type 分析类型 - 'face' | 'voice'
 * @param sid 会话ID
 * @param onMessage 消息回调函数
 * @returns WebSocket实例
 */
export const createAnalysisSocket = (
  type: 'face' | 'voice',
  sid: string,
  onMessage: (analysis: RealTimeAnalysis) => void
): WebSocket => {
  const token = localStorage.getItem('token') || '';
  const url = `ws://${location.host}/customer/msr/${type}/${sid}?token=${token}`;

  const ws = new WebSocket(url);

  ws.onmessage = event => {
    try {
      const data = JSON.parse(event.data);
      onMessage({
        type,
        data:
          type === 'face'
            ? (data as FaceAnalysisResponse)
            : (data as VoiceAnalysisResponse),
      });
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

/**
 * 安全关闭WebSocket连接
 * @param ws WebSocket实例
 */
export const safeCloseSocket = (ws: WebSocket | null) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close(1000, '正常关闭');
  }
};
