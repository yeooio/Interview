// 人脸分析响应
export interface FaceAnalysisResponse {
  requestId: string;
  face: {
    round: {
      smile: number; // 微笑程度 (0-100)
      appearance: number; // 整体仪容 (0-100)
      confidence: number; // 自信程度 (0-100)
    };
    frame: {
      eye: number; // 眼神交流 (0-100)
      nature: string; // 手势自然度 (高等/中等/较差)
    };
  };
}

// 语音分析响应
export interface VoiceAnalysisResponse {
  requestId: string;
  voice: {
    round: {
      fluency: number; // 表达流畅度 (0-100)
      logic: number; // 逻辑性 (0-100)
      words: number; // 词汇丰富度 (0-100)
    };
    frame: {
      speed: number; // 语速 (字/分钟)
      filler: number; // 语气词频率 (次数)
    };
  };
  word: {
    // 新增文本分析部分
    round: {
      complete: number; // 回答完整性 (0-100)
      match: number; // 岗位匹配度 (0-100)
      accurate: number; // 技术准确性 (0-100)
    };
    frame: {
      star: number; // STAR结构应用 (0-100)
      comprehend: number; // 问题理解度 (0-100)
    };
  };
  keyword: Record<string, number>; // 关键词统计
}

// WebSocket 实时分析消息
export type RealTimeAnalysis =
  | { type: 'face'; data: FaceAnalysisResponse }
  | { type: 'voice'; data: VoiceAnalysisResponse };
