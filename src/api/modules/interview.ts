import request from '../request';
import type { Interview } from '../types';

// 轮询间隔(ms)
const POLL_INTERVAL = 3000;

/**
 * 提交语音分析任务
 * @param file 音频文件
 * @param onProgress 进度回调
 */
export const analyzeVoice = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<Interview.AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  // 1. 提交分析任务
  const { taskId } = await request.post<Interview.TaskResponse>(
    '/customer/interview/msrVoice',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  // 2. 启动轮询获取结果
  return pollAnalysisResult(taskId, onProgress);
};

/**
 * 提交视频分析任务
 * @param file 视频/图片文件
 */
export const analyzeFace = async (
  file: File
): Promise<Interview.AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  // 直接获取分析结果（短任务）
  return request.post<Interview.AnalysisResult>(
    '/customer/interview/msrFace',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/**
 * 轮询分析结果（私有方法）
 */
const pollAnalysisResult = async (
  taskId: string,
  onProgress?: (progress: number) => void
): Promise<Interview.AnalysisResult> => {
  return new Promise(resolve => {
    const timer = setInterval(async () => {
      try {
        // 查询任务状态
        const result = await request.get<Interview.AnalysisResult>(
          `/task/status/${taskId}`
        );

        // 更新进度
        if (onProgress && typeof result.progress === 'number') {
          onProgress(result.progress);
        }

        // 完成或失败时终止轮询
        if (result.status === 'completed' || result.status === 'failed') {
          clearInterval(timer);
          resolve(result);
        }
      } catch (error) {
        clearInterval(timer);
        resolve({
          status: 'failed',
          error: '轮询请求失败',
        });
      }
    }, POLL_INTERVAL);
  });
};
