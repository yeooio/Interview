// 面试模块类型
export namespace Interview {
  /** 文件分析基础参数 */
  export interface AnalysisParams {
    recordId?: string; // 可选关联记录ID
    file: File; // 文件对象
  }

  /** 分析任务响应 */
  export interface TaskResponse {
    taskId: string; // 任务唯一ID
    estimatedTime: number; // 预估耗时(秒)
  }

  /** 分析结果结构 */
  export interface AnalysisResult {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number; // 进度百分比(0-100)
    data?: {
      text?: string; // 语音转文字结果
      emotions?: {
        // 视频情绪分析
        type: string; // 情绪类型（happy/sad/angry/surprise/neutral）
        confidence: number; // 置信度(0-1)
      }[];
    };
    error?: string; // 失败信息
  }
}
