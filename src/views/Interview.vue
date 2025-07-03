<template>
  <div class="interview">
    <div v-if="showPermissionPopup" class="permission-popup">
      <div class="popup-content">
        <div class="popup-header">
          <i class="fas fa-shield-alt"></i>
          <h2>需要访问您的摄像头和麦克风</h2>
        </div>
        
        <div class="permission-message">
          <p>为了提供完整的面试模拟体验，我们需要访问您的：</p>
          <ul>
            <li><i class="fas fa-video"></i> 摄像头 - 用于分析您的表情和肢体语言</li>
            <li><i class="fas fa-microphone"></i> 麦克风 - 用于录制和分析您的回答</li>
          </ul>
          <p class="privacy-note">
            <i class="fas fa-lock"></i> 您的隐私受到保护，所有数据仅用于面试分析，不会保存或共享
          </p>
        </div>
        
        <div class="permission-options">
          <div class="option allow-always" @click="handlePermission('allow')">
            <i class="fas fa-check-circle"></i>
            <span>允许访问</span>
            <p>本次及以后访问时允许</p>
          </div>
          <div class="option allow-once" @click="handlePermission('allow-once')">
            <i class="fas fa-check"></i>
            <span>仅本次允许</span>
            <p>仅在此次面试中允许</p>
          </div>
          <div class="option deny" @click="handlePermission('deny')">
            <i class="fas fa-times-circle"></i>
            <span>不允许</span>
            <p>无法提供完整面试体验</p>
          </div>
        </div>
      </div>
    </div>
    <div class="page-header">
      <div class="header-left"></div>
      <div class="header-nav">
        <img src="../assets//images/avator.png" alt="User Avatar" />
      </div>
    </div>
    
    <div class="interview-container">
      <div class="panel">
        <div class="left-panel">
          <!-- 面试实况 -->
          <div class="video-area">
            <div class="panel-header">
              <img src="../assets/images/interview-live.png" alt="Interview Live">
              <el-button type="primary" class="timer-button">
                <img src="../assets/images/timer.png" alt="Timer" class="img">
                {{ formattedTime }}
              </el-button>
            </div>
            <div class="video-container">
              <video ref="videoElement" autoplay muted playsinline></video>
              <canvas ref="canvasElement" style="display: none;"></canvas>
            </div>
          </div>
          
          <!-- 面试问题 -->
          <div class="question-section">
            <img src="../assets/images/question-icon.png" alt="Question">
            <div class="question">
              <h4>{{ currentQuestion }}</h4>
              <el-button type="danger" class="origin-button">2023年字节真题</el-button>
            </div>
          </div>
          
          <!-- 回答建议 -->
          <div class="advice-section">
            <img src="../assets/images/advice-icon.png" alt="Advice">
            <div class="advice-list">
              <li v-for="(tip, index) in adviceTips" :key="index">
                <img :src="`../assets/images/number-${index+1}.png`" alt=""> {{ tip }}
              </li>
            </div>
          </div>
          
          <div class="button-group">
            <el-button 
              type="primary" 
              @click="startInterview"
              :disabled="isInterviewing"
              class="action-button"
            >
              <img src="../assets/images/start-icon.png" alt="Start">开始回答
            </el-button>
            <el-button 
              type="danger" 
              @click="stopInterview"
              :disabled="!isInterviewing"
              class="action-button"
            >
              <img src="../assets/images/stop-icon.png" alt="Stop">停止回答
            </el-button>
          </div>
        </div>
        
        <!-- 右侧面板 - 仪表盘 -->
        <div class="right-panel">
          <div class="dashboard-container">
            <div class="dashboard-header">
              <h3>面试表现分析</h3>
              <div class="real-time-indicator">
                <div class="pulse"></div>
                <span>实时更新</span>
              </div>
            </div>
            <div ref="chart" class="chart-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { msrFace, msrVoice } from '@/api/interview'
import type { 
  FaceAnalysisResponse, 
  VoiceAnalysisResponse
} from '@/types'

// 权限弹窗控制
const showPermissionPopup = ref(true)
const videoElement = ref<HTMLVideoElement | null>(null)
const canvasElement = ref<HTMLCanvasElement | null>(null)
const chart = ref<HTMLElement | null>(null)

// 媒体流和录制控制
const mediaStream = ref<MediaStream | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])

// 定时器和WebSocket
let audioInterval: number | null = null
let videoInterval: number | null = null
let faceSocket: WebSocket | null = null
let voiceSocket: WebSocket | null = null

// 分析数据
const chartInstance = ref<echarts.ECharts | null>(null)
const faceScores = ref<number[]>([])
const voiceScores = ref<number[]>([])
const timestamps = ref<string[]>([])

// 面试状态
const isInterviewing = ref(false)
const formattedTime = ref('00:00')
const currentQuestion = ref('请描述一次你解决复杂技术问题的经历，重点说明你的思考过程和解决方案')
const adviceTips = ref([
  '从问题背景入手，说明问题的复杂性和挑战',
  '详细描述你的解决思路和技术选型原因',
  '说明最终方案的效果和你从中学到了什么',
  '可以提及团队协作和沟通方面的经验'
])

// 初始化图表
const initChart = () => {
  if (!chart.value) return
  
  chartInstance.value = echarts.init(chart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const faceParam = params.find(p => p.seriesName === '表情分析')
        const voiceParam = params.find(p => p.seriesName === '语音分析')
        return `
          <div>时间: ${faceParam?.data?.time || voiceParam?.data?.time}</div>
          <div>表情得分: ${faceParam?.value || 0}%</div>
          <div>语音得分: ${voiceParam?.value || 0}%</div>
        `
      }
    },
    legend: { 
      data: ['表情分析', '语音分析'],
      bottom: 10
    },
    grid: { 
      left: '3%', 
      right: '4%', 
      bottom: '15%', 
      top: '10%',
      containLabel: true 
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps.value
    },
    yAxis: { 
      type: 'value', 
      min: 0, 
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      { 
        name: '表情分析', 
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#5470C6' },
        data: faceScores.value.map((score, index) => ({
          value: score,
          time: timestamps.value[index]
        }))
      },
      { 
        name: '语音分析', 
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#91CC75' },
        data: voiceScores.value.map((score, index) => ({
          value: score,
          time: timestamps.value[index]
        }))
      }
    ]
  }
  
  chartInstance.value.setOption(option)
}

// 更新图表数据
const updateChart = () => {
  if (!chartInstance.value) return
  
  chartInstance.value.setOption({
    xAxis: {
      data: timestamps.value
    },
    series: [
      {
        name: '表情分析',
        data: faceScores.value.map((score, index) => ({
          value: score,
          time: timestamps.value[index]
        }))
      },
      {
        name: '语音分析',
        data: voiceScores.value.map((score, index) => ({
          value: score,
          time: timestamps.value[index]
        }))
      }
    ]
  })
}

// 添加数据点
const addDataPoint = (type: 'face' | 'voice', score: number) => {
  const now = new Date()
  const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  // 添加新数据点
  if (type === 'face') {
    faceScores.value.push(score)
  } else {
    voiceScores.value.push(score)
  }
  
  // 只保留最近10个数据点
  if (faceScores.value.length > 10) faceScores.value.shift()
  if (voiceScores.value.length > 10) voiceScores.value.shift()
  
  // 添加时间戳（如果两个系列共享时间轴）
  timestamps.value.push(timeStr)
  if (timestamps.value.length > 10) timestamps.value.shift()
  
  updateChart()
}

// 处理权限选择
const handlePermission = async (choice: string) => {
  showPermissionPopup.value = false;
  
  if (choice === 'deny') {
    console.log('用户拒绝了权限请求');
    return;
  }

  try {
    // 请求摄像头和麦克风权限
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true,
      audio: true 
    });
    
    mediaStream.value = stream;
    
    // 如果权限获取成功，将视频流绑定到video元素
    if (videoElement.value) {
      videoElement.value.srcObject = stream;
    }
    
    // 初始化音频录制
    setupAudioRecorder(stream);
    
    // 创建WebSocket连接
    createWebSockets();
    
  } catch (error) {
    console.error('获取媒体设备权限失败:', error);
  }
}

// 创建WebSocket连接
const createWebSockets = () => {
  const token = localStorage.getItem('token') || '';
  
  // 视频分析WebSocket
  faceSocket = new WebSocket(
    `ws://${location.host}/customer/msr/face/123?token=${token}`
  );
  
  faceSocket.onmessage = (event) => {
    try {
      const data: FaceAnalysisResponse = JSON.parse(event.data);
      console.log('WebSocket 人脸分析:', data);
      
      // 计算综合得分 (示例计算)
      const score = Math.round((
        data.face.round.smile + 
        data.face.round.confidence + 
        data.face.frame.eye
      ) / 3);
      
      addDataPoint('face', score);
    } catch (error) {
      console.error('解析人脸分析数据失败:', error);
    }
  };
  
  // 语音分析WebSocket
  voiceSocket = new WebSocket(
    `ws://${location.host}/customer/msr/voice/234?token=${token}`
  );
  
  voiceSocket.onmessage = (event) => {
    try {
      const data: VoiceAnalysisResponse = JSON.parse(event.data);
      console.log('WebSocket 语音分析:', data);
      
      // 计算综合得分 (示例计算)
      const score = Math.round((
        data.voice.round.fluency + 
        data.voice.round.logic + 
        data.voice.round.words
      ) / 3);
      
      addDataPoint('voice', score);
    } catch (error) {
      console.error('解析语音分析数据失败:', error);
    }
  };
}

// 设置音频录制
const setupAudioRecorder = (stream: MediaStream) => {
  try {
    mediaRecorder.value = new MediaRecorder(stream, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 128000
    });
    
    audioChunks.value = [];
    
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };
    
  } catch (error) {
    console.error('初始化音频录制失败:', error);
  }
}

// 获取视频帧
const getVideoFrame = (): Promise<Blob> => {
  return new Promise((resolve) => {
    if (!canvasElement.value || !videoElement.value) {
      resolve(new Blob());
      return;
    }
    
    const canvas = canvasElement.value;
    const video = videoElement.value;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else resolve(new Blob());
      }, 'image/jpeg', 0.85);
    } else {
      resolve(new Blob());
    }
  });
}

// 开始面试
const startInterview = async () => {
  if (!mediaStream.value) {
    console.error('媒体流未初始化');
    return;
  }
  
  isInterviewing.value = true;
  
  // 初始化图表
  initChart();
  
  // 开始录制音频
  if (mediaRecorder.value) {
    mediaRecorder.value.start(4000); // 每4秒生成一个片段
  }
  
  // 立即发送第一帧视频
  try {
    const videoFrame = await getVideoFrame();
    const response = await msrFace({ sid: '123', file: videoFrame });
    console.log('HTTP 视频分析响应:', response);
  } catch (error) {
    console.error('视频分析请求失败:', error);
  }
  
  // 立即发送第一段语音
  if (audioChunks.value.length > 0) {
    try {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' });
      audioChunks.value = []; // 清空已发送的片段
      
      const response = await msrVoice({ 
        sid: '234', 
        recordId: '8', 
        file: audioBlob 
      });
      console.log('HTTP 语音分析响应:', response);
    } catch (error) {
      console.error('语音分析请求失败:', error);
    }
  }
  
  // 设置视频定时器（每3秒）
  videoInterval = window.setInterval(async () => {
    try {
      const videoFrame = await getVideoFrame();
      const response = await msrFace({ sid: '123', file: videoFrame });
      console.log('HTTP 视频分析响应:', response);
    } catch (error) {
      console.error('视频分析请求失败:', error);
    }
  }, 3000);
  
  // 设置音频定时器（每4秒）
  audioInterval = window.setInterval(async () => {
    if (audioChunks.value.length > 0) {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' });
      audioChunks.value = []; // 清空已发送的片段
      
      try {
        const response = await msrVoice({ 
          sid: '234', 
          recordId: '8', 
          file: audioBlob 
        });
        console.log('HTTP 语音分析响应:', response);
      } catch (error) {
        console.error('语音分析请求失败:', error);
      }
    }
  }, 4000);
}

// 停止面试
const stopInterview = () => {
  isInterviewing.value = false;
  
  // 停止媒体录制
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    mediaRecorder.value.stop();
  }
  
  // 清除定时器
  if (videoInterval) clearInterval(videoInterval);
  if (audioInterval) clearInterval(audioInterval);
  
  videoInterval = null;
  audioInterval = null;
  
  // 发送最后的音频片段
  if (audioChunks.value.length > 0) {
    const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' });
    audioChunks.value = [];
    
    msrVoice({ 
      sid: '234', 
      recordId: '8', 
      file: audioBlob 
    }).catch(error => {
      console.error('最终语音分析请求失败:', error);
    });
  }
}

// 组件卸载时清理
onBeforeUnmount(() => {
  stopInterview();
  
  // 关闭WebSocket连接
  if (faceSocket) faceSocket.close();
  if (voiceSocket) voiceSocket.close();
  
  // 释放媒体资源
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop());
  }
});
</script>



<style scoped>
.permission-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.popup-content {
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: popup-appear 0.5s ease-out;
}

@keyframes popup-appear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.popup-header {
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  color: white;
  padding: 25px;
  text-align: center;
}

.popup-header i {
  font-size: 36px;
  margin-bottom: 15px;
  color: #4dabf7;
}

.popup-header h2 {
  font-weight: 600;
  font-size: 24px;
}

.permission-message {
  padding: 25px;
  line-height: 1.6;
  color: #333;
  border-bottom: 1px solid #eee;
}

.permission-message p {
  margin-bottom: 15px;
}

.permission-message ul {
  margin: 20px 0;
  padding-left: 20px;
}

.permission-message li {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.permission-message li i {
  color: #1a2a6c;
  font-size: 18px;
}

.privacy-note {
  background: #e6f7ff;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #1890ff;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.privacy-note i {
  color: #1890ff;
}

.permission-options {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.option {
  padding: 20px 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid #eee;
}

.option:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.option i {
  font-size: 32px;
  margin-bottom: 10px;
}

.option span {
  display: block;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 5px;
}

.option p {
  font-size: 14px;
  color: #666;
}

.allow-always {
  background: rgba(46, 204, 113, 0.1);
  border-color: rgba(46, 204, 113, 0.3);
}

.allow-always i {
  color: #2ecc71;
}

.allow-once {
  background: rgba(52, 152, 219, 0.1);
  border-color: rgba(52, 152, 219, 0.3);
}

.allow-once i {
  color: #3498db;
}

.deny {
  background: rgba(231, 76, 60, 0.1);
  border-color: rgba(231, 76, 60, 0.3);
}

.deny i {
  color: #e74c3c;
}

.right-panel {
  height: 100%;
}
.chart-container {
  width: 100%;
  height: calc(100% - 60px); /* 减去标题高度 */
  min-height: 300px;
}
/* 样式保持不变 */
</style>
<style lang="scss" scoped>
.interview{
  width: 99vw;
  height: 100vh;
}
.page-header {
  width: 100%;
  height: 70px;
  // background-color: red;
  // background-color: red;
  box-sizing: border-box;
  // margin-left:40px  ;
  padding-left: 40px;
  padding-right: 71px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #1a1a1c;
  // background-color:red;
  // box-shadow: 2px;
  border-bottom: 2px solid #f5f5f5;
  .header-left {
    width: 160px;
    height: 54px;
    background-color: #d9d9d9;
  }
  
}
.interview-container{
  // gap: 20px;
  width: 100%;
  padding-top: 18px;
  padding: 18px 7px 0 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #F9FCFF;
  // background-color: ;
  // gap: 20px;
  align-items: center;
  // background-color: #1a1a1c;
  height: 762px;
  .panel{
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  .left-panel{
    width: 740px;
    background-color: #F9FCFF;
    height: 100%;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 16px 20px;
    display: flex;                                  
    flex-direction: column;
    align-items: space-around;

  }
  .right-panel{
    width: 594px;
    background-color: #F9FCFF;
    height: 100%;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
  }
}
.panel-header{
  display: flex;
  justify-content: space-between;
  .el-button{
    border-radius: 12px;
 width: 90px;
 display: flex;
 justify-content: space-evenly;
 align-items: center;
text-align:center;
// font-size: 14px;
   img{
    margin-right: 5px;
    // width: 130px;
    // height: 50px;

   }
  
  }
}
.video{
video{
  width:680px ; 
  margin-left: 10px;
  height: 344px;
  background-color: #d1d1e2  ;
  border-radius: 8px;
  border: 1px solid #40B0FF;
  margin-top: 10px;
}
}
.question-section{
  // margin-top: 15px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  img{
    width: 122px;
    height: auto;
  }
  .question{
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 680px;
    height: 40px;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
    margin-left: 15px;
    padding: 0PX 20px;
    box-sizing: border-box;
    .el-button{
      background-color: #FF4444;
      width:110px ;
      height: 22px;
      font-size: 12px;
      padding: 12px 30px;

    }
  }
}
.advice-section{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  img{
    width: 122px;
    height: auto;
    margin-bottom: 8px;
  }
  .advice-list{
    // width: 680px;
    width: 370px;
    margin-left: 15px;
    height: 122px;
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 8px;
    
    border: 1.5px solid #68b0d1;
    li{
      list-style: none;
      display: flex;
      // align-items: center;
      align-items: flex-start;
      font-size: 14px;
    }
    img{
      margin-top: -3px;
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
.button-group{
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
  .el-button{
    background-clip: #00aeff;
    border-radius: 18px;
    width: 122px;
    box-sizing: border-box;
    // display: flex;
    padding: 18px 20px;
    margin-bottom: 10px;
    img{
      // width: 28px;
      margin-right: 3px;
    // flex-shrink: 16;
    font-size: 16px;
    font-weight: bold;
    }
  }
  
}
.footer{
  margin-top: 20px;
  height: 200px;
  width: 100%;
  background-color: #1a1a1c;
}

</style>