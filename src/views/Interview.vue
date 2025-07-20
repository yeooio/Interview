<template>
  <div v-if="generatingReport" class="report-loading-overlay">
  <div class="loading-content">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <h3>正在生成模拟报告...</h3>
    <p>请稍候，系统正在分析您的面试表现并生成详细报告</p>
    <div class="progress">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="countdown">页面将在 {{ countdown2 }} 秒后自动跳转</p>
  </div>
</div>
  <div class="interview">
    <div v-if="showPermissionPopup || !mediaStream" class="permission-popup">
      <div class="popup-content">
        <div class="popup-header">
          <i class="fas fa-shield-alt"></i>
          <h2>需要访问您的摄像头和麦克风</h2>
        </div>

        <div class="permission-message">
          <p>为了提供完整的面试模拟体验，我们需要访问您的：</p>
          <ul>
            <li>
              <i class="fas fa-video"></i> 摄像头 - 用于分析您的表情和肢体语言
            </li>
            <li>
              <i class="fas fa-microphone"></i> 麦克风 - 用于录制和分析您的回答
            </li>
          </ul>
          <p class="privacy-note">
            <i class="fas fa-lock"></i>
            您的隐私受到保护，所有数据仅用于面试分析，不会保存或共享
          </p>
        </div>

        <div class="permission-options">
          <div class="option allow-always" @click="handlePermission('allow')">
            <i class="fas fa-check-circle"></i>
            <span>允许访问</span>
            <p>本次及以后访问时允许</p>
          </div>
          <div
            class="option allow-once"
            @click="handlePermission('allow-once')"
          >
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
      <div class="header-left">
        <a href="#" class="logo">
         <img src="../assets/images/logo.png" alt="">
        </a>
      </div>

     <div class="header-nav">
      <div class="nav-items">
        <router-link 
          to="/" 
          class="nav-item"
          :class="{ active: $route.path === '/home' }"
        >
          首页
        </router-link>
        <router-link 
          to="/choice" 
          class="nav-item"
          :class="{ active: $route.path === '/choice' }"
        >
          选择岗位
        </router-link>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/Prepare1' }"
        
        >
          设备调试
        </div>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/guide' }"
          
        >
          备战指南
        </div>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/interview' }"
          
        >
          面试实况
        </div>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/report' }"
         
        >
          测试报告
        </div>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/path' }"
        
        >
          提升路径
        </div>
        <div 
          class="nav-item"
          :class="{ active: $route.path === '/history' }"
     
        >
          历史表现分析
        </div>
      </div>
    </div>
      <div class="header-right">
        <button class="start-button2" >
          免费开始 <span>&nbsp;→</span>
        </button>
      </div>
    </div>

    <div class="interview-container">
      <div class="panel">
        <div class="left-panel">
          <!-- 面试实况 -->
          <div class="video-area">
            <div class="panel-header">
              <img
                src="../assets/images/interview-live.png"
                alt="Interview Live"
              />
              <el-button type="primary" class="timer-button">
                <img src="../assets/images/timer.png" alt="Timer" class="img" />
                {{ formattedTime }}
              </el-button>
            </div>
            <div class="video-container">
              <video ref="videoElement" autoplay muted playsinline></video>
              <canvas ref="canvasElement" style="display: none"></canvas>
            </div>
          </div>

          <!-- 面试问题 -->
          <div class="question-section">
            <img src="../assets/images/question-icon.png" alt="Question" />
            <div class="question">
              <h4>{{ currentQuestion }}</h4>
              <el-button class="origin-button" :type="questionSources[currentSourceIndex].color"  
                >{{ questionSources[currentSourceIndex].text }}</el-button
              >
            </div>
          </div>

          <!-- 回答建议 -->
          <div class="advice-section">
            <img src="../assets/images/回答建议.png" alt="Advice" />
            <div class="advice-list">
              <li v-for="(tip, index) in adviceTips" :key="index">
                <img :src="`/src/assets/images/${index + 1}.png`" alt="tip" />
                {{ tip }}
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
      <img src="../assets/images/start-icon.png" alt="Start" />开始回答
    </el-button>

    <el-button
      :type="interviewFinished ? 'primary' : 'danger'"
      @click="interviewFinished ? generateReport() : stopInterview()"
      :disabled="interviewFinished ? !canGenerateReport : !isInterviewing"
      class="action-button"
    >
      <img v-if="!interviewFinished"  src="../assets/images/stop-icon.png" alt="Stop" />
      {{ stopButtonText }}
    </el-button>
  </div>
        </div>
        <div class="circle">
          <DIV class="IMFO">
            <img src="../assets/images/Component 3.png" alt="" />
          </DIV>
          <div class="right-panel">
            <div class="analyse">
              <div class="key">
                <img src="../assets/images/Component 1.png" alt="" />
              </div>
              <div class="card-container">
                <div class="guage-card">
                  <img src="../assets/images/Component 4.png" alt="" />
                  <!-- 仪表盘 -->
                  <div class="gauge1" ref="gauge1Ref"></div>
                  <div class="line">
                    <div class="line1">
                      <div></div>
                      表达流程
                    </div>
                    <div class="line2">
                      <div></div>
                      前后逻辑
                    </div>
                    <div class="line3">
                      <div></div>
                      词汇丰富
                    </div>
                  </div>
                  <div class="card">
                    <div class="card1">
                      <span class="fluer">平均语速</span>
                      <span class="number">{{ Math.round(avgSpeed)  }}字/分</span>
                      <span
                        class="notice"
                        :data-status="
                          getFillerStatus(fillerFreq) === '良好'
                            ? 'good'
                            : getFillerStatus(fillerFreq) === '需注意'
                              ? 'normal'
                              : 'danger'
                        "
                        >{{ getSpeedStatus(avgSpeed) }}</span
                      >
                    </div>
                    <div class="card2">
                      <span class="fluer">语气词频率</span>
                      <span class="number">{{  Math.round(fillerFreq)  }}次/分</span>
                      <span
                        class="notice"
                        :data-status="
                          getFillerStatus(fillerFreq) === '良好'
                            ? 'good'
                            : getFillerStatus(fillerFreq) === '需注意'
                              ? 'normal'
                              : 'danger'
                        "
                        >{{ getFillerStatus(fillerFreq) }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="guage-card">
                  <img src="../assets/images/Component 5.png" alt="" />
                  <div class="gauge2" ref="gauge2Ref"></div>
                  <div class="line">
                    <div class="line1">
                      <div></div>
                      微笑程度
                    </div>
                    <div class="line2">
                      <div></div>
                      整体仪容
                    </div>
                    <div class="line3">
                      <div></div>
                      自信程度
                    </div>
                  </div>
                  <div class="card">
                    <div class="card1">
                      <span class="fluer">眼神交流</span>
                      <span class="number">{{ Math.round(eyeContact) }}%</span>
                      <span class="notice">{{
                        getEyeContactStatus(eyeContact)
                      }}</span>
                    </div>
                    <div class="card2">
                      <span class="fluer">手势自然度 </span>
                      <span class="number">{{ Math.round(gestureNature) }}%</span>
                      <span
                        class="notice"
                        :data-status="
                          getFillerStatus(fillerFreq) === '良好'
                            ? 'good'
                            : getFillerStatus(fillerFreq) === '需注意'
                              ? 'normal'
                              : 'danger'
                        "
                        >{{ getNatureStatus(gestureNature) }}</span
                      >
                    </div>
                  </div>

                  <!-- <img src="../assets/images/Component 8.png" alt="" /> -->
                </div>
                <div class="guage-card">
                  <img src="../assets/images/Component 6.png" alt="" />

                  <div class="gauge3" ref="gauge3Ref"></div>
                  <div class="line">
                    <div class="line1">
                      <div></div>
                      回答完整
                    </div>
                    <div class="line2">
                      <div></div>
                      岗位匹配
                    </div>
                    <div class="line3">
                      <div></div>
                      技术准确
                    </div>
                  </div>
                  <div class="card">
                    <div class="card1">
                      <span class="fluer">STAR结构应用</span>
                      <span class="number">{{ Math.round(starApplication) }}%</span>
                      <span class="notice">{{
                        getStarStatus(starApplication)
                      }}</span>
                    </div>
                    <div class="card2">
                      <span class="fluer">问题理解度</span>
                      <span class="number">{{ Math.round(problemComprehension) }}%</span>
                      <span class="notice">{{
                        getComprehendStatus(problemComprehension)
                      }}</span>
                    </div>
                  </div>

                  <!-- <img src="../assets/images/Component 9.png" alt="" /> -->
                </div>
              </div>
            </div>
          <div class="key-word">
    <div class="key">
      <img src="../assets/images/Component 2.png" alt="" />
    </div>
    <div class="bar-charts-container">
      <div class="bar-chart-box">
        <div ref="barChart1" class="bar-chart"></div>
      </div>
      <div class="bar-chart-box">
        <div ref="barChart2" class="bar-chart"></div>
      </div>
    </div>
  </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'






const avgSpeed = ref(0); 
const fillerFreq = ref(0); 
const eyeContact = ref(0); 
const gestureNature = ref(0); 
const starApplication = ref(0); 
const problemComprehension = ref(0);

// 新增定时器
let metricsTimer: number | null = null;
let declineTimer: number | null = null;

// 初始化指标值
const initMetrics = () => {
  avgSpeed.value = 98;
  fillerFreq.value = 5;
  eyeContact.value = 62;
  gestureNature.value = 75;
  starApplication.value = 65;
  problemComprehension.value = 78;
};

// 开始动态变化
const startMetricsAnimation = () => {
  // 清除可能存在的旧定时器
  if (metricsTimer) clearInterval(metricsTimer);
  if (declineTimer) clearInterval(declineTimer);
  
  // 初始化指标值
  initMetrics();
  
  // 启动随机变化定时器
  metricsTimer = setInterval(() => {
    // 随机波动 - 在合理范围内变化
    avgSpeed.value = Math.max(58, Math.min(220, avgSpeed.value + getRandomChange(-5, 5)));
    fillerFreq.value = Math.max(0, Math.min(8, fillerFreq.value + getRandomChange(-0.5, 0.5)));
    eyeContact.value = Math.max(22, Math.min(95, eyeContact.value + getRandomChange(-3, 3)));
    gestureNature.value = Math.max(18, Math.min(95, gestureNature.value + getRandomChange(-20 ,20)));
    starApplication.value = Math.max(25, Math.min(95, starApplication.value + getRandomChange(-3, 3)));
    problemComprehension.value = Math.max(45, Math.min(95, problemComprehension.value + getRandomChange(-3, 3)));
  }, 2000) as unknown as number;
};

// 停止后指标递减
const startMetricsDecline = () => {
  // 清除变化定时器
  if (metricsTimer) {
    clearInterval(metricsTimer);
    metricsTimer = null;
  }
  
  // 启动递减定时器
  declineTimer = setInterval(() => {
    // 所有指标逐渐变差
    avgSpeed.value = Math.max(20, avgSpeed.value - getRandomChange(1, 3));
    fillerFreq.value = Math.min(10, fillerFreq.value + getRandomChange(0.2, 0.5));
    eyeContact.value = Math.max(30, eyeContact.value - getRandomChange(1, 3));
    gestureNature.value = Math.max(40, gestureNature.value - getRandomChange(1, 3));
    starApplication.value = Math.max(30, starApplication.value - getRandomChange(1, 3));
    problemComprehension.value = Math.max(40, problemComprehension.value - getRandomChange(1, 3));
    
    // 当指标下降到一定程度时停止递减
    if (avgSpeed.value <= 100 && fillerFreq.value >= 8) {
      if (declineTimer) {
        clearInterval(declineTimer);
        declineTimer = null;
      }
    }
  }, 1500) as unknown as number;
};

// 获取随机变化值
const getRandomChange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

















// 柱形图
import { nextTick } from 'vue';

const barChart1 = ref<HTMLElement | null>(null);
const barChart2 = ref<HTMLElement | null>(null);
let barChartInstance1: echarts.ECharts | null = null;
let barChartInstance2: echarts.ECharts | null = null;

// 柱状图数据
const barData1 = ref([85, 92, 78]); // 专业知识水平、技能匹配度、表达语言能力
const barData2 = ref([90, 82, 88]); // 逻辑思维能力、创新能力、应变抗压能力

// 初始化柱状图
const initBarCharts = () => {
  if (!barChart1.value || !barChart2.value) return;
  
  // 销毁旧的图表实例
  if (barChartInstance1) barChartInstance1.dispose();
  if (barChartInstance2) barChartInstance2.dispose();
  
  // 创建新的图表实例
  barChartInstance1 = echarts.init(barChart1.value);
  barChartInstance2 = echarts.init(barChart2.value);
  
  // 第一个柱状图配置
  const option1 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['专业知识', '技能匹配', '表达能力'],
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '能力值',
      type: 'bar',
      barWidth: '40%',
      data: barData1.value,
      itemStyle: {
        color: (params: any) => {
          const colors = ['#3A82FF', '#FFDD36', '#4EFF8F'];
          return colors[params.dataIndex];
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#333',
        fontSize: 10
      }
    }]
  };
  
  // 第二个柱状图配置
  const option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['逻辑思维', '创新能力', '应变能力'],
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '能力值',
      type: 'bar',
      barWidth: '40%',
      data: barData2.value,
      itemStyle: {
        color: (params: any) => {
          const colors = ['#FF6B6B', '#FFA36C', '#6B5B95'];
          return colors[params.dataIndex];
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#333',
        fontSize: 10
      }
    }]
  };
  
  barChartInstance1.setOption(option1);
  barChartInstance2.setOption(option2);
  
  // 立即渲染
  barChartInstance1.resize();
  barChartInstance2.resize();
};

// 更新柱状图数据（随机变化）
const updateBarCharts = () => {
  if (!barChartInstance1 || !barChartInstance2) return;
  
  // 随机更新数据（使用整数，无小数）
  barData1.value = barData1.value.map(val => 
    Math.max(60, Math.min(100, val + Math.floor(Math.random() * 10) - 5))
  );
  
  barData2.value = barData2.value.map(val => 
    Math.max(60, Math.min(100, val + Math.floor(Math.random() * 10) - 5))
  );
  
  // 应用新数据
  barChartInstance1.setOption({
    series: [{
      data: [
        {value: barData1.value[0], itemStyle: {color: '#3A82FF'}},
        {value: barData1.value[1], itemStyle: {color: '#FFDD36'}},
        {value: barData1.value[2], itemStyle: {color: '#4EFF8F'}}
      ]
    }]
  });
  
  barChartInstance2.setOption({
    series: [{
      data: [
        {value: barData2.value[0], itemStyle: {color: '#FF6B6B'}},
        {value: barData2.value[1], itemStyle: {color: '#FFA36C'}},
        {value: barData2.value[2], itemStyle: {color: '#6B5B95'}}
      ]
    }]
  });
};

// 递减柱状图数据（无小数）
const declineBarCharts = () => {
  if (!barChartInstance1 || !barChartInstance2) return;
  
  barData1.value = barData1.value.map(val => 
    Math.max(0, Math.floor(val * 0.8)) // 使用整数
  );
  
  barData2.value = barData2.value.map(val => 
    Math.max(0, Math.floor(val * 0.8)) // 使用整数
  );
  
  barChartInstance1.setOption({
    series: [{
      data: [
        {value: barData1.value[0], itemStyle: {color: '#3A82FF'}},
        {value: barData1.value[1], itemStyle: {color: '#FFDD36'}},
        {value: barData1.value[2], itemStyle: {color: '#4EFF8F'}}
      ]
    }]
  });
  
  barChartInstance2.setOption({
    series: [{
      data: [
        {value: barData2.value[0], itemStyle: {color: '#FF6B6B'}},
        {value: barData2.value[1], itemStyle: {color: '#FFA36C'}},
        {value: barData2.value[2], itemStyle: {color: '#6B5B95'}}
      ]
    }]
  });
};

// 启动柱状图动画
let barChartTimer: number | null = null;
const startBarChartsAnimation = () => {
  if (barChartTimer) clearInterval(barChartTimer);
  barChartTimer = setInterval(updateBarCharts, 2000) as unknown as number;
};

// 停止柱状图动画并递减
const stopBarChartsAnimation = () => {
  if (barChartTimer) {
    clearInterval(barChartTimer);
    barChartTimer = null;
  }
  
  const declineTimer = setInterval(() => {
    declineBarCharts();
    
    // 当所有值都接近0时停止
    if (barData1.value.every(val => val <= 10) && 
        barData2.value.every(val => val <= 10)) {
      clearInterval(declineTimer);
    }
  }, 200) as unknown as number;
};









const generatingReport = ref(false);
const progress = ref(0);
const countdown2 = ref(5);
// const totalQuestions = 5; // 总共5个问题

// const route = useRoute()
const stopCount = ref(0);
const questionSources = ref([
  { text: '2024年字节题库', color: 'danger' }, // 红色
  { text: '2023年腾讯题库', color: 'danger' }, // 红色
  { text: '2025年阿里题库', color: 'danger' }, // 红色
  { text: '2024年网易题库', color: 'danger' }, // 红色
  { text: '2025年滴滴题库', color: 'danger' }, // 红色
  // { text: '2023年腾讯真题', color: 'warning' }, // 黄色
  // { text: '2025年阿里真题', color: 'success' }  // 绿色
]);
const currentSourceIndex = ref(0);

// 只需要这6个变量

import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import * as echarts from 'echarts';
// import { msrFace, msrVoice } from '../api/modules/interview';
import type { FaceAnalysisResponse, VoiceAnalysisResponse } from '../api/types';
import service from '@/api/request';

// 定时器和倒计时相关
const countdown = ref(45);
const countdownInterval = ref<number | null>(null); 
const formattedTime = ref('00:00');

// 临时存储面试问题和建议
const tempQuestion = ref('');
const tempAdviceTips = ref<string[]>([]);

// 权限弹窗和媒体元素
const showPermissionPopup = ref(true);
const videoElement = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const chart = ref<HTMLElement | null>(null);
const isInterviewing = ref(false);

// 媒体相关状态
const mediaStream = ref<MediaStream | null>(null);
const audioChunks = ref<Blob[]>([]);
const audioData = ref<Float32Array[]>([]);

// 图表数据
const chartInstance = ref<echarts.ECharts | null>(null);
const faceScores = ref<number[]>([]);
const voiceScores = ref<number[]>([]);
const timestamps = ref<string[]>([]);

// 面试内容

const canGenerateReport = ref(false);
// 定时器和WebSocket
let audioInterval: number | null = null;
let videoInterval: number | null = null;
let faceSocket: WebSocket | null = null;
let voiceSocket: WebSocket | null = null;

// 音频录制相关变量
let audioRecorder: MediaRecorder | null = null;
let audioProcessor: ScriptProcessorNode | null = null;
let audioContext: AudioContext | null = null;

// 格式化时间
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 右边仪表盘变化

const voiceData = ref({
  words: 75,
  fluency: 90,
  logic: 85,
  speed: 180,
  filler: 3,
});
const fixedQuestions = [
  'Spring Boot的核心优势是什么？',
  '如何优化Java应用内存使用？',
  'RESTful API设计的关键原则？',
  '如何处理数据库事务并发问题？',
  'Java多线程同步常用机制？'
];

const fixedAdvice = [
  ['自动配置简化开发', '内嵌容器便于部署', '丰富的Starter库'],
  ['使用对象池减少创建', '优化数据结构选择', '及时释放无用引用'],
  ['资源URI使用名词', 'HTTP方法表达操作', '无状态通信设计'],
  ['合理设置事务隔离级别', '使用乐观锁机制', '避免长事务'],
  ['synchronized关键字', 'ReentrantLock可重入锁', 'Semaphore信号量']
];
const totalQuestions = 5; // 总共5个问题
const currentQuestionIndex = ref(0); // 当前问题索引
const interviewFinished = ref(false); // 面试是否完成


// const currentQuestionIndex = ref(0);

// 面试内容
const currentQuestion = ref(fixedQuestions[0]);
const adviceTips = ref(fixedAdvice[0]);













// 计算整体得分（三个指标的平均值）
const overallScore = computed(() => {
  const { words, fluency, logic } = voiceData.value;
  return Math.round((words + fluency + logic) / 3);
});

// 环形图表实例
const ringsChart = ref<HTMLElement | null>(null);
let ringsChartInstance: echarts.ECharts | null = null;

// 初始化环形图表
const initRingsChart = () => {
  if (!ringsChart.value) return;

  ringsChartInstance = echarts.init(ringsChart.value);

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: { borderWidth: 1, borderColor: '#464646' },
        },
        axisLine: { lineStyle: { width: 10 } },
        splitLine: { show: false, distance: 0, length: 10 },
        axisTick: { show: false },
        axisLabel: { show: false, distance: 50 },
        data: [
          {
            value: voiceData.value.fluency,
            name: '表达流畅',
            title: { offsetCenter: ['0%', '-30%'] },
            // 隐藏百分比数字
            detail: {
              show: false, // 直接隐藏
              valueAnimation: true,
              offsetCenter: ['0%', '-20%'],
              formatter: '', // 或设为空字符串
            },
            itemStyle: { color: '#5470C6' },
            radius: '60%', // 调整半径
          },
          {
            value: voiceData.value.logic,
            name: '前后逻辑',
            title: { offsetCenter: ['0%', '0%'] },
            detail: {
              show: false,
              valueAnimation: true,
              offsetCenter: ['0%', '10%'],
              formatter: '',
            },
            itemStyle: { color: '#91CC75' },
            radius: '70%', // 调整半径
          },
          {
            value: voiceData.value.words,
            name: '词汇丰富',
            title: { offsetCenter: ['0%', '30%'] },
            detail: {
              show: false,
              valueAnimation: true,
              offsetCenter: ['0%', '40%'],
              formatter: '',
            },
            itemStyle: { color: '#FAC858' },
            radius: '80%', // 调整半径
          },
        ],
        title: { fontSize: 14 },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 0,
        },
      },
    ],
  };

  ringsChartInstance.setOption(option);
};
// 更新的部分
// 更新环形图表
const updateRingsChart = () => {
  if (!ringsChartInstance) return;
  console.log('VALIE', voiceData.value.fluency);

  const option = {
    series: [
      {
        data: [
          { value: voiceData.value.fluency },
          { value: voiceData.value.logic },
          { value: voiceData.value.words },
        ],
      },
    ],
  };

  ringsChartInstance.setOption(option);
};

// 处理WebSocket消息
// 语音消息处理
const handleVoiceMessage = (data: any) => {
  console.log('voice.data', data);

  if (data.data?.vocie?.frame) {
    avgSpeed.value = data.data.vocie.frame.speed || 0;
    fillerFreq.value = data.data.vocie.frame.filler || 0;
  }

  if (data.data?.word?.frame) {
 starApplication.value = parseInt(data.data.word.frame.star) || 0; // STAR 结构应用：数字转字符串并拼接 %
    problemComprehension.value = parseInt(data.data.word.frame.comprehend) || 0; // 问题理解度：同上
  }
};

// 人脸消息处理
const handleFaceMessage = (event: MessageEvent) => {
  try {
    const data = event.data;
    console.log('face.data', data);

    if (data.face.frame) {
      console.log('1111');

      eyeContact.value = parseInt(data.face.frame.eye) || 0;
      console.log('eye', eyeContact.value);

      // eyeContact.value = parseInt(data.data.face.frame.eye) || '0%';
      gestureNature.value = data.face.frame.nature || '无';
    }
  } catch (error) {
    console.error('解析人脸数据失败:', error);
  }
};

// 不需要返回状态类名，直接返回文本
const getSpeedStatus = (speed: number) => {
  if (speed < 150) return '语速较慢';
  if (speed <= 180) return '正常范围';
  return '语速过快';
};

const getFillerStatus = (filler: number) => {
  if (filler <= 2) return '良好';
  if (filler <= 5) return '需注意';
  return '过多';
};

const getEyeContactStatus = (eye: number) => {
 if (eye >= 80) return '优秀';
  if (eye >= 60) return '可提升';
  return '需加强';
};

const getNatureStatus = (nature: number) => {
  if (nature >= 80) return '优秀';
  if (nature >= 60) return '可提升';
  return '需加强';
};

// STAR结构应用状态
const getStarStatus = (star: number) => {
  if (star >= 80) return '优秀';
  if (star >= 60) return '需加强';
  return '需提升';
};

// 问题理解度状态
const getComprehendStatus = (comprehend: number) => {
  if (comprehend >= 90) return '优秀';
  if (comprehend >= 75) return '良好';
  return '需提升';
};
// 初始化图表

// 更新图表

// 设置音频录制器 - 修复MIME类型问题
const setupAudioRecorder = (stream: MediaStream) => {
  try {
    if (typeof MediaRecorder === 'undefined') {
      console.warn('浏览器不支持MediaRecorder API，使用备选方案');
      setupFallbackAudioRecorder(stream);
      return;
    }

    // 优先检查浏览器支持的MIME类型
    const supportedTypes = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/ogg;codecs=opus',
      '',
    ].filter(type => !type || MediaRecorder.isTypeSupported(type));

    const options: MediaRecorderOptions = {};
    if (supportedTypes.length > 0) {
      // 优先选择非空的有效类型，如果没有明确支持的类型，则使用空字符串让浏览器选择默认值
      options.mimeType = supportedTypes.find(type => type !== '') || '';
    }

    audioRecorder = new MediaRecorder(stream, options);
    audioChunks.value = [];

    audioRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    audioRecorder.onerror = event => {
      console.error('媒体录制错误:', event);
    };

    // 添加状态监控
    console.log(`音频录制器创建成功，MIME类型: ${options.mimeType || '默认'}`);
  } catch (error) {
    console.error('MediaRecorder初始化失败:', error);
    setupFallbackAudioRecorder(stream);
  }
};

// 设置备选音频录制器
const setupFallbackAudioRecorder = (stream: MediaStream) => {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.error('浏览器不支持AudioContext API');
      return;
    }

    audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    audioProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    source.connect(audioProcessor);
    audioProcessor.connect(audioContext.destination);

    audioProcessor.onaudioprocess = event => {
      const channelData = event.inputBuffer.getChannelData(0);
      audioData.value.push(new Float32Array(channelData));
    };

    console.log('备选音频录制方案已启用');
  } catch (error) {
    console.error('备选音频录制方案失败:', error);
  }
};

// 获取视频帧
const getVideoFrame = (): Promise<Blob> => {
  return new Promise(resolve => {
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
      canvas.toBlob(
        blob => {
          if (blob) resolve(blob);
          else resolve(new Blob());
        },
        'image/jpeg',
        0.85
      );
    } else {
      resolve(new Blob());
    }
  });
};

// 处理权限选择
const handlePermission = async (choice: string) => {
  showPermissionPopup.value = false;

  if (choice === 'deny') {
    console.log('用户拒绝了权限请求');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    mediaStream.value = stream;

    if (videoElement.value) {
      videoElement.value.srcObject = stream;
    }

    setupAudioRecorder(stream);
    createWebSockets();
  } catch (error) {
    console.error('获取媒体设备权限失败:', error);
    showPermissionPopup.value = true;
    alert('无法访问摄像头和麦克风，请检查权限设置');
  }
};

// 释放媒体流
const releaseMediaStream = () => {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop());
    mediaStream.value = null;
  }
};

// 创建WebSocket连接
const createWebSockets = () => {
  const token =
    localStorage.getItem('token') ||
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA';

  // 视频分析WebSocket
  faceSocket = new WebSocket(
    `ws://8.136.127.46:8080/customer/msr/face/123?token=${token}`
  );

  faceSocket.onopen = () => console.log('人脸分析WebSocket连接已建立');
  faceSocket.onerror = error =>
    console.error('人脸分析WebSocket连接错误:', error);
  faceSocket.onclose = event =>
    console.log('人脸分析WebSocket连接关闭:', event.reason);

  faceSocket.onmessage = event => {
    try {
      const data = JSON.parse(event.data);
      console.log('face.date:', data);
      handleFaceMessage(data);

      console.log('收到人脸分析结果:', event.data);
    } catch (error) {
      console.error('解析人脸分析数据失败:', error);
    }
  };

  // 语音分析WebSocket
  voiceSocket = new WebSocket(
    `ws://8.136.127.46:8080/customer/msr/voice/234?token=${token}`
  );

  voiceSocket.onopen = () => console.log('语音分析WebSocket连接已建立');
  voiceSocket.onerror = error =>
    console.error('语音分析WebSocket连接错误:', error);
  voiceSocket.onclose = event =>
    console.log('语音分析WebSocket连接关闭:', event.reason);

  voiceSocket.onmessage = event => {
    try {
      const data = JSON.parse(event.data);
      console.log('收到语音分析结果:', data);
      console.log('仪表盘：data：', data);

      handleVoiceMessage(data);
    } catch (error) {
      console.error('解析语音分析数据失败:', error);
    }
  };
};
const getSpeedStatusClass = (speed: number) => {
  if (speed < 150) return 'speed-slow';
  else if (speed <= 180) return 'speed-normal';
  else return 'speed-fast';
};

const getSpeedStatusText = (speed: number) => {
  if (speed < 150) return '语速较慢';
  else if (speed <= 180) return '正常范围';
  else return '语速过快';
};

// 语气词频率状态分类
const getFillerStatusClass = (filler: number) => {
  if (filler <= 2) return 'filler-good';
  else if (filler <= 5) return 'filler-normal';
  else return 'filler-bad';
};

const getFillerStatusText = (filler: number) => {
  if (filler <= 2) return '良好';
  else if (filler <= 5) return '需注意';
  else return '过多';
};

// 开始面试
const startInterview = async () => {
  isInterviewing.value=true
 nextTick(() => {
    startBarChartsAnimation();
  });
   if (interviewFinished.value) {
    canGenerateReport.value = true;
    return;
  }
    // isInterviewing.value=true
    setTimeout(()=>{
  startMetricsAnimation();
    },2000)

  startGaugesAnimation();
  try {
    console.log('开始面试流程...');
    isInterviewing.value = true;

    countdown.value = 45;
    formattedTime.value = formatTime(countdown.value);

    // 启动倒计时
    if (countdownInterval.value) clearInterval(countdownInterval.value);
    countdownInterval.value = setInterval(() => {
      countdown.value--;
      formattedTime.value = formatTime(countdown.value);

      // 当倒计时达到15秒时获取新问题
      if (countdown.value === 30) {
        getInterviewQuestion();
      }

      // 倒计时结束自动停止
      if (countdown.value <= 0) {
        stopInterview();
      }
    }, 1000) as unknown as number;

    if (!mediaStream.value) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        mediaStream.value = stream;

        if (videoElement.value) {
          videoElement.value.srcObject = stream;
        }

        setupAudioRecorder(stream);
        createWebSockets();
      } catch (error) {
        console.error('获取媒体设备失败:', error);
        showPermissionPopup.value = true;
        alert('无法访问摄像头和麦克风，请检查设备权限');
        return;
      }
    }

    if (!mediaStream.value || mediaStream.value.getTracks().length === 0) {
      console.error('媒体流初始化失败');
      showPermissionPopup.value = true;
      return;
    }

    // 检查媒体轨道状态
    const audioTracks = mediaStream.value.getAudioTracks();
    const videoTracks = mediaStream.value.getVideoTracks();

    if (audioTracks.length === 0 || videoTracks.length === 0) {
      console.error('缺少必要的音视频轨道');
      alert('无法获取音视频输入，请检查设备连接');
      return;
    }

    if (
      audioTracks[0].readyState !== 'live' ||
      videoTracks[0].readyState !== 'live'
    ) {
      console.error('音视频轨道未处于活动状态');
      alert('音视频设备未准备好，请重新授权');
      return;
    }

    // 1. 发送第一帧视频
    try {
      const videoBlob = await getVideoFrame();

      // 添加固定 requestId: '8'
      // const faceResponse = await msrFace({
      //   sid: '123',
      //   // requestId: '8', // 添加固定requestId
      //   file: videoBlob,
      // });

      // console.log('第一帧视频发送成功:', faceResponse);
    } catch (error: any) {
      console.error('第一帧视频发送失败:', error);
      if (error?.response?.status === 401) {
        alert('视频认证失败: ' + error.message);
      }
    }

    // 2. 发送第一段语音
    if (audioRecorder) {
      try {
        // 确保录音器处于可启动状态
        if (audioRecorder.state === 'inactive') {
          audioRecorder.start(4000);
        }
      } catch (error) {
        console.error('启动音频录制器失败:', error);
        setupFallbackAudioRecorder(mediaStream.value);
      }
    }

    if (audioProcessor && audioData.value.length > 0) {
      try {
        const wavBlob = encodeToWav(audioData.value);
        audioData.value = [];

        // 添加固定 requestId: '8'
        // const voiceResponse = await msrVoice({
        //   sid: '234',
        //   recordId: '8',
        //   // requestId: '8', // 添加固定requestId
        //   file: wavBlob,
        // });

        // console.log('第一段语音发送成功:', voiceResponse);
      } catch (error: any) {
        console.error('第一段语音发送失败:', error);
        if (error?.response?.status === 401) {
          alert('语音认证失败: ' + error.message);
        }
      }
    }

    // 3. 设置视频帧定时发送
    // videoInterval = setInterval(async () => {
    //   try {
    //     const videoBlob = await getVideoFrame();

    //     // 添加固定 requestId: '8'
    //     const faceResponse = await msrFace({
    //       sid: '123',
    //       // requestId: '8', // 添加固定requestId
    //       file: videoBlob,
    //     });

    //     console.log('视频帧发送成功:', faceResponse);
    //   } catch (error: any) {
    //     console.error('视频帧发送失败:', error);
    //     if (error?.response?.status === 401) {
    //       alert('视频认证失败: ' + error.message);
    //     }
    //   }
    // }, 3000);

    // // 4. 设置语音定时发送
    // audioInterval = setInterval(() => {
    //   if (audioRecorder && audioRecorder.state !== 'inactive') {
    //     try {
    //       // 安全地停止并重新开始录音器
    //       if (audioRecorder.state === 'recording') {
    //         audioRecorder.stop();
    //       }
    //     } catch (error) {
    //       console.error('停止音频录制器失败:', error);
    //     }
    //   } else if (audioProcessor && audioData.value.length > 0) {
    //     try {
    //       const wavBlob = encodeToWav(audioData.value);
    //       audioData.value = [];

    //       // 添加固定 requestId: '8'
    //       msrVoice({
    //         sid: '234',
    //         recordId: '8',
    //         requestId: '8', // 添加固定requestId
    //         file: wavBlob,
    //       })
    //         .then(voiceResponse => {
    //           console.log('语音片段发送成功:', voiceResponse);
    //         })
    //         .catch((error: any) => {
    //           console.error('语音片段发送失败:', error);
    //           if (error?.response?.status === 401) {
    //             alert('语音认证失败: ' + error.message);
    //           }
    //         });
    //     } catch (error) {
    //       console.error('语音编码失败:', error);
    //     }
    //   }
    // }, 4000);
  } catch (error) {
    console.error('面试启动失败:', error);
    alert('启动面试失败，请检查网络连接和权限设置');
    isInterviewing.value = false;

    // 确保清理所有资源
    if (videoInterval) clearInterval(videoInterval);
    if (audioInterval) clearInterval(audioInterval);
    if (countdownInterval.value) clearInterval(countdownInterval.value);
    if (audioRecorder && audioRecorder.state !== 'inactive') {
      try {
        audioRecorder.stop();
      } catch (e) {
        console.error('停止媒体录制失败:', e);
      }
    }
  }
};

// 停止面试
const stopInterview = () => {
   stopBarChartsAnimation();
  console.log("hhh");
   startMetricsDecline();
 isInterviewing.value = false;
  stopGaugesAnimation();
  
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
    countdownInterval.value = null;
  }
  
  // 更新问题和建议
  currentQuestionIndex.value = (currentQuestionIndex.value + 1) % fixedQuestions.length;
  currentQuestion.value = fixedQuestions[currentQuestionIndex.value];
  adviceTips.value = fixedAdvice[currentQuestionIndex.value];
  
  // 更新问题来源显示
  currentSourceIndex.value = (currentSourceIndex.value + 1) % questionSources.value.length;

  // 检查是否完成所有问题
  if (currentQuestionIndex.value === totalQuestions - 1) {
    interviewFinished.value = true;
  }
  // 更新问题和建议（如果有新获取的）
  if (tempQuestion.value) {
    currentQuestion.value = tempQuestion.value;
  }
  if (tempAdviceTips.value.length > 0) {
    adviceTips.value = tempAdviceTips.value;
  }

  // 安全地停止媒体录制
  if (audioRecorder && audioRecorder.state === 'recording') {
    try {
      audioRecorder.stop();
    } catch (error) {
      console.error('停止媒体录制失败:', error);
    }
  }

  if (audioProcessor) {
    audioProcessor.disconnect();
    audioProcessor = null;
  }

  if (audioContext) {
    audioContext.close().catch(console.error);
    audioContext = null;
  }

  if (videoInterval) clearInterval(videoInterval);
  if (audioInterval) clearInterval(audioInterval);

  videoInterval = null;
  audioInterval = null;

  // 发送最后的音频片段
  if (audioChunks.value.length > 0) {
    const audioBlob = new Blob(audioChunks.value, {
      type: audioRecorder?.mimeType || 'audio/webm',
    });
    audioChunks.value = [];

    // 添加固定 requestId: '8'
    // msrVoice({
    //   sid: '234',
    //   recordId: '8',
    //   // requestId: '8',
    //   file: audioBlob,
    // }).catch(error => {
    //   console.error('最终语音分析请求失败:', error);
    // });
  }

  audioData.value = [];

  stopCount.value++;
  
  // 自动开始下一题，直到第三题
  // console.log("interview",isInterviewing.value);
  // currentSourceIndex.value = (currentSourceIndex.value + 1) % questionSources.value.length;
  if (currentQuestionIndex.value === totalQuestions - 1) {
    interviewFinished.value = true;
    canGenerateReport.value = false; // 初始状态不可用
  }


  

  
};
const generateReport = () => {
  if (!canGenerateReport.value) return;
  isInterviewing.value=true
  generatingReport.value = true;
  progress.value = 0;
  countdown2.value = 5;
  
  // 模拟报告生成进度
  const progressInterval = setInterval(() => {
    progress.value += 5;
    if (progress.value >= 100) {
      clearInterval(progressInterval);
    }
  }, 200);
  
  // 倒计时跳转
  const countdownInterval = setInterval(() => {
    countdown2.value--;
    if (countdown2.value <= 0) {
      clearInterval(countdownInterval);
      
      // 重置状态
      generatingReport.value = false;
      interviewFinished.value = false;
      currentQuestionIndex.value = 0;
      stopCount.value = 0;
      canGenerateReport.value = false;
      
      // 实际项目中这里应该是路由跳转
      // router.push('/report');
    }
  }, 1000);
};

// 编码音频数据为WAV格式
const encodeToWav = (audioChunks: Float32Array[]): Blob => {
  const sampleRate = 44100;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;

  const mergedData = new Float32Array(
    audioChunks.reduce((acc, chunk) => acc + chunk.length, 0)
  );

  let offset = 0;
  for (const chunk of audioChunks) {
    mergedData.set(chunk, offset);
    offset += chunk.length;
  }

  const buffer = new ArrayBuffer(44 + mergedData.length * 2);
  const view = new DataView(buffer);

  // 写入WAV头
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + mergedData.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, mergedData.length * 2, true);

  let dataOffset = 44;
  for (let i = 0; i < mergedData.length; i++) {
    const sample = Math.max(-1, Math.min(1, mergedData[i]));
    const intValue = sample < 0 ? sample * 32768 : sample * 32767;
    view.setInt16(dataOffset, intValue, true);
    dataOffset += 2;
  }

  return new Blob([view], { type: 'audio/wav' });
};

// 写入字符串到DataView
const writeString = (view: DataView, offset: number, str: string) => {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
};

const stopButtonText = computed(() => {
  return interviewFinished.value ? '生成模拟报告' : '停止回答';
});

// 获取面试问题
const getInterviewQuestion = async () => {
  try {
    // 1. 获取固定位置的PDF文件
    const pdfUrl = '/resumes/黑色极简个人求职简历.pdf'; // 假设PDF文件放在public/resumes目录下

    // 2. 获取PDF文件
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const file = new File([blob], '黑色极简个人求职简历.pdf', {
      type: 'application/pdf',
    });

    // 3. 创建FormData
    const formData = new FormData();
    formData.append('file', file);

    // 4. 发送请求获取面试问题
    const result = await service.post(
      '/customer/interview/question',
      formData,
      {
        params: { recordId: '8' },
      }
    );
    console.log(result);

    console.log('面试问题获取成功:', result);

    // 5. 更新当前问题（假设接口返回数据结构）
    // if (result && result.data) {
    //   // 问题
    //   if (result.data.question) {
    //     tempQuestion.value = result.data.question;
    //   }

    //   // 建议 - 按照顺序组合成数组
    //   const suggestions = [];
    //   if (result.data.suggestOne) suggestions.push(result.data.suggestOne);
    //   if (result.data.suggestTwo) suggestions.push(result.data.suggestTwo);
    //   if (result.data.suggestThree) suggestions.push(result.data.suggestThree);

    //   tempAdviceTips.value = suggestions;
    // }
  } catch (error) {
    console.error('获取面试问题失败:', error);
  }
};

// 生命周期钩子
onMounted(async () => {
 nextTick(() => {
    initBarCharts();
  });
  initGauges();
  await getInterviewQuestion();
  if (tempQuestion.value) {
    currentQuestion.value = tempQuestion.value;
  }
  if (tempAdviceTips.value.length > 0) {
    adviceTips.value = tempAdviceTips.value;
  }

  if (!localStorage.getItem('token')) {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi5YiY5amnIn0.CphWFNKqYpIZbmwu1efdtvi2jYzGQawz3yzRpHjLePA'
    );
  }

  if (!mediaStream.value) {
    showPermissionPopup.value = true;
  }

  const isMediaRecorderSupported = typeof MediaRecorder !== 'undefined';
  const isAudioContextSupported =
    typeof AudioContext !== 'undefined' ||
    typeof (window as any).webkitAudioContext !== 'undefined';

  if (!isMediaRecorderSupported && !isAudioContextSupported) {
    alert(
      '您的浏览器不支持音频录制功能，请使用Chrome、Firefox或Edge等现代浏览器'
    );
  }

  initRingsChart();
});

// 修改前的版本
const gauge1Ref = ref<HTMLElement | null>(null);
const gauge2Ref = ref<HTMLElement | null>(null);
const gauge3Ref = ref<HTMLElement | null>(null);

// const initGauges = () => {
//   // 确保DOM元素已挂载
//   if (!gauge1Ref.value || !gauge2Ref.value || !gauge3Ref.value) {
//     console.error('Gauge elements not found');
//     return;
//   }

//   // 初始化ECharts实例
//   const chart1 = echarts.init(gauge1Ref.value);
//   const chart2 = echarts.init(gauge2Ref.value);
//   const chart3 = echarts.init(gauge3Ref.value);

//   // 创建仪表盘配置函数
//   const createGaugeOption = (gaugeData: any[]) => {
//     return {
//       series: [
//         {
//           type: 'gauge',
//           startAngle: 90,
//           endAngle: -270,
//           pointer: { show: false },
//           progress: {
//             show: true,
//             overlap: false,
//             roundCap: true,
//             clip: false,
//             itemStyle: {
//               borderWidth: 1,
//               borderColor: '#464646',
//             },
//           },
//           axisLine: { lineStyle: { width: 40 } },
//           splitLine: { show: false, distance: 0, length: 10 },
//           axisTick: { show: false },
//           axisLabel: { show: false, distance: 50 },
//           data: gaugeData,
//           title: { fontSize: 14 },
//           detail: {
//             width: 50,
//             height: 14,
//             fontSize: 14,
//             color: 'inherit',
//             borderColor: 'inherit',
//             borderRadius: 20,
//             borderWidth: 1,
//             formatter: '{value}%',
//           },
//         },
//       ],
//     };
//   };

//   // 创建仪表盘数据
//   const createGaugeData = () => {
//     return [
//       {
//         value: +(Math.random() * 100).toFixed(2),
//         name: '',
//         title: { offsetCenter: ['0%', '-30%'] },
//         detail: {
//           valueAnimation: true,
//           offsetCenter: ['0%', '-20%'],
//           color: '#5470C6',
//         },
//         itemStyle: { color: '#3A82FF' },
//       },
//       {
//         value: +(Math.random() * 100).toFixed(2),
//         name: '',
//         title: { offsetCenter: ['0%', '0%'] },
//         detail: {
//           valueAnimation: true,
//           offsetCenter: ['0%', '10%'],
//           color: '#91CC75',
//         },
//         itemStyle: { color: '#FFDD36' },
//       },
//       {
//         value: +(Math.random() * 100).toFixed(2),
//         name: '',
//         title: { offsetCenter: ['0%', '30%'] },
//         detail: {
//           valueAnimation: true,
//           offsetCenter: ['0%', '40%'],
//           color: '#FAC858',
//         },
//         itemStyle: { color: '#4EFF8F' },
//       },
//     ];
//   };

//   // 初始化仪表盘数据
//   let gaugeData1 = createGaugeData();
//   let gaugeData2 = createGaugeData();
//   let gaugeData3 = createGaugeData();

//   // 应用配置
//   chart1.setOption(createGaugeOption(gaugeData1));
//   chart2.setOption(createGaugeOption(gaugeData2));
//   chart3.setOption(createGaugeOption(gaugeData3));

//   // 设置定时更新
//   const gaugeTimer1 = setInterval(() => {
//     gaugeData1[0].value = +(Math.random() * 100).toFixed(2);
//     gaugeData1[1].value = +(Math.random() * 100).toFixed(2);
//     gaugeData1[2].value = +(Math.random() * 100).toFixed(2);
//     chart1.setOption({
//       series: [{ data: gaugeData1 }],
//     });
//   }, 2000);

//   const gaugeTimer2 = setInterval(() => {
//     gaugeData2[0].value = +(Math.random() * 100).toFixed(2);
//     gaugeData2[1].value = +(Math.random() * 100).toFixed(2);
//     gaugeData2[2].value = +(Math.random() * 100).toFixed(2);
//     chart2.setOption({
//       series: [{ data: gaugeData2 }],
//     });
//   }, 3000);

//   const gaugeTimer3 = setInterval(() => {
//     gaugeData3[0].value = +(Math.random() * 100).toFixed(2);
//     gaugeData3[1].value = +(Math.random() * 100).toFixed(2);
//     gaugeData3[2].value = +(Math.random() * 100).toFixed(2);
//     chart3.setOption({
//       series: [{ data: gaugeData3 }],
//     });
//   }, 3500);

//   // 响应式调整
//   const handleResize = () => {
//     chart1.resize();
//     chart2.resize();
//     chart3.resize();
//   };
//   window.addEventListener('resize', handleResize);

//   // 在卸载时清理资源
//   onBeforeUnmount(() => {
//     clearInterval(gaugeTimer1);
//     clearInterval(gaugeTimer2);
//     clearInterval(gaugeTimer3);
//     window.removeEventListener('resize', handleResize);
//     chart1.dispose();
//     chart2.dispose();
//     chart3.dispose();
//   });
// };
// 修改前end

const chart1 = ref<echarts.ECharts | null>(null);
const chart2 = ref<echarts.ECharts | null>(null);
const chart3 = ref<echarts.ECharts | null>(null);
const gaugeTimer1 = ref<NodeJS.Timeout | null>(null);
const gaugeTimer2 = ref<NodeJS.Timeout | null>(null);
const gaugeTimer3 = ref<NodeJS.Timeout | null>(null);
const createGaugeOption = (gaugeData: any[]) => {
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646',
          },
        },
        axisLine: { lineStyle: { width: 40 } },
        splitLine: { show: false, distance: 0, length: 10 },
        axisTick: { show: false },
        axisLabel: { show: false, distance: 50 },
        data: gaugeData,
        title: { fontSize: 14 },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%',
        },
      },
    ],
  };
};

// 创建仪表盘数据（与原始代码完全一致）
const createGaugeData = () => {
  return [
    {
      value: +(Math.random() * 100).toFixed(2),
      name: '',
      title: { offsetCenter: ['0%', '-30%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%'],
        color: '#5470C6',
      },
      itemStyle: { color: '#3A82FF' },
    },
    {
      value: +(Math.random() * 100).toFixed(2),
      name: '',
      title: { offsetCenter: ['0%', '0%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%'],
        color: '#91CC75',
      },
      itemStyle: { color: '#FFDD36' },
    },
    {
      value: +(Math.random() * 100).toFixed(2),
      name: '',
      title: { offsetCenter: ['0%', '30%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%'],
        color: '#FAC858',
      },
      itemStyle: { color: '#4EFF8F' },
    },
  ];
};

// 创建初始数据（值为0）
const createInitialGaugeData = () => {
  return [
    {
      value: 0,
      name: '',
      title: { offsetCenter: ['0%', '-30%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%'],
        color: '#5470C6',
      },
      itemStyle: { color: '#3A82FF' },
    },
    {
      value: 0,
      name: '',
      title: { offsetCenter: ['0%', '0%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%'],
        color: '#91CC75',
      },
      itemStyle: { color: '#FFDD36' },
    },
    {
      value: 0,
      name: '',
      title: { offsetCenter: ['0%', '30%'] },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%'],
        color: '#FAC858',
      },
      itemStyle: { color: '#4EFF8F' },
    },
  ];
};

// 启动仪表盘动画
const startGaugesAnimation = () => {
  if (!chart1.value || !chart2.value || !chart3.value) return;

  // 清除可能存在的旧定时器
  stopGaugesAnimation();

  // 为每个仪表盘设置定时器
  gaugeTimer1.value = setInterval(() => {
    if (chart1.value) {
      const newData = createGaugeData();
      chart1.value.setOption({
        series: [{ data: newData }],
      });
    }
  }, 1000);

  gaugeTimer2.value = setInterval(() => {
    if (chart2.value) {
      const newData = createGaugeData();
      chart2.value.setOption({
        series: [{ data: newData }],
      });
    }
  }, 2000);

  gaugeTimer3.value = setInterval(() => {
    if (chart3.value) {
      const newData = createGaugeData();
      chart3.value.setOption({
        series: [{ data: newData }],
      });
    }
  }, 3000);
};

// 停止仪表盘动画并重置为0
const stopGaugesAnimation = () => {
  // 清除所有定时器
  if (gaugeTimer1.value) clearInterval(gaugeTimer1.value);
  if (gaugeTimer2.value) clearInterval(gaugeTimer2.value);
  if (gaugeTimer3.value) clearInterval(gaugeTimer3.value);

  gaugeTimer1.value = null;
  gaugeTimer2.value = null;
  gaugeTimer3.value = null;

  // 重置仪表盘为0（使用原始配置）
  const resetData = createInitialGaugeData();

  if (chart1.value) chart1.value.setOption({ series: [{ data: resetData }] });
  if (chart2.value) chart2.value.setOption({ series: [{ data: resetData }] });
  if (chart3.value) chart3.value.setOption({ series: [{ data: resetData }] });
};

// 修改initGauges函数
const initGauges = () => {
  // 确保DOM元素已挂载
  if (!gauge1Ref.value || !gauge2Ref.value || !gauge3Ref.value) {
    console.error('Gauge elements not found');
    return;
  }

  // 初始化ECharts实例
  chart1.value = echarts.init(gauge1Ref.value);
  chart2.value = echarts.init(gauge2Ref.value);
  chart3.value = echarts.init(gauge3Ref.value);

  // 应用初始配置（值为0）
  chart1.value.setOption(createGaugeOption(createInitialGaugeData()));
  chart2.value.setOption(createGaugeOption(createInitialGaugeData()));
  chart3.value.setOption(createGaugeOption(createInitialGaugeData()));
};
import { useRoute } from 'vue-router'

const route = useRoute()
// 创建仪表盘配置函数
// const createGaugeOption = (gaugeData: any[]) => {
//   return {
//     series: [
//       {
//         type: 'gauge',
//         startAngle: 90,
//         endAngle: -270,
//         pointer: { show: false },
//         progress: {
//           show: true,
//           overlap: false,
//           roundCap: true,
//           clip: false,
//           itemStyle: {
//             borderWidth: 1,
//             borderColor: '#464646',
//           },
//         },
//         axisLine: { lineStyle: { width: 40 } },
//         splitLine: { show: false, distance: 0, length: 10 },
//         axisTick: { show: false },
//         axisLabel: { show: false, distance: 50 },
//         data: gaugeData,
//         title: { fontSize: 14 },
//         detail: {
//           width: 50,
//           height: 14,
//           fontSize: 14,
//           color: 'inherit',
//           borderColor: 'inherit',
//           borderRadius: 20,
//           borderWidth: 1,
//           formatter: '{value}%',
//         },
//       },
//     ],
//   };
// };

// // 创建仪表盘数据
// const createGaugeData = () => {
//   return [
//     {
//       value: 0, // 初始值为0
//       name: '',
//       title: { offsetCenter: ['0%', '-30%'] },
//       detail: {
//         valueAnimation: true,
//         offsetCenter: ['0%', '-20%'],
//         color: '#5470C6',
//       },
//       itemStyle: { color: '#3A82FF' },
//     },
//     {
//       value: 0, // 初始值为0
//       name: '',
//       title: { offsetCenter: ['0%', '0%'] },
//       detail: {
//         valueAnimation: true,
//         offsetCenter: ['0%', '10%'],
//         color: '#91CC75',
//       },
//       itemStyle: { color: '#FFDD36' },
//     },
//     {
//       value: 0, // 初始值为0
//       name: '',
//       title: { offsetCenter: ['0%', '30%'] },
//       detail: {
//         valueAnimation: true,
//         offsetCenter: ['0%', '40%'],
//         color: '#FAC858',
//       },
//       itemStyle: { color: '#4EFF8F' },
//     },
//   ];
// };

// // 初始化仪表盘
// const initGauges = () => {
//   if (!gauge1Ref.value || !gauge2Ref.value || !gauge3Ref.value) return;

//   chart1.value = echarts.init(gauge1Ref.value);
//   chart2.value = echarts.init(gauge2Ref.value);
//   chart3.value = echarts.init(gauge3Ref.value);

//   const gaugeData = createGaugeData();
//   chart1.value.setOption(createGaugeOption(gaugeData));
//   chart2.value.setOption(createGaugeOption(gaugeData));
//   chart3.value.setOption(createGaugeOption(gaugeData));
// };

// // 启动仪表盘动画
// const startGaugesAnimation = () => {
//   if (!chart1.value || !chart2.value || !chart3.value) return;

//   const updateGauge = (chart: echarts.ECharts) => {
//     const newData = createGaugeData().map(item => ({
//       ...item,
//       value: +(Math.random() * 100).toFixed(2)
//     }));
//     chart.setOption({
//       series: [{ data: newData }]
//     });
//   };

//   // 清除之前的定时器
//   stopGaugesAnimation();

//   // 启动新的定时器
//   gaugeTimer1.value = setInterval(() => updateGauge(chart1.value, 2000));
//   gaugeTimer2.value = setInterval(() => updateGauge(chart2.value, 3000));
//   gaugeTimer3.value = setInterval(() => updateGauge(chart3.value, 3500));
// };

// // 停止仪表盘动画并重置为0
// const stopGaugesAnimation = () => {
//   // 清除所有定时器
//   if (gaugeTimer1.value) clearInterval(gaugeTimer1.value);
//   if (gaugeTimer2.value) clearInterval(gaugeTimer2.value);
//   if (gaugeTimer3.value) clearInterval(gaugeTimer3.value);

//   gaugeTimer1.value = null;
//   gaugeTimer2.value = null;
//   gaugeTimer3.value = null;

//   // 重置仪表盘为0
//   if (chart1.value && chart2.value && chart3.value) {
//     const zeroData = createGaugeData().map(item => ({ ...item, value: 0 }));
//     chart1.value.setOption({ series: [{ data: zeroData }] });
//     chart2.value.setOption({ series: [{ data: zeroData }] });
//     chart3.value.setOption({ series: [{ data: zeroData }] });
//   }
// };

onBeforeUnmount(() => {
  stopInterview();
  stopGaugesAnimation(); // 清理定时器
  if (chart1.value) chart1.value.dispose();
  if (chart2.value) chart2.value.dispose();
  if (chart3.value) chart3.value.dispose();

  if (faceSocket) faceSocket.close();
  if (voiceSocket) voiceSocket.close();
  if (ringsChartInstance) {
    ringsChartInstance.dispose();
  }
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop());
  }
});
</script>
<style scoped lang="scss">
.bar-charts-container {
  display: flex;
  gap: 10px;
  width: 100%;
}

.bar-chart-box {
  flex: 1;
  height: 107px;
  // background-color: #f0f5ff;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
}

.bar-chart {
  width: 100%;
  height: 100%;
}
.report-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.loading-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.loading-content h3 {
  font-size: 24px;
  color: #1a1a1c;
  margin: 20px 0 10px;
}

.loading-content p {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}

.countdown {
  color: #00aeff;
  font-weight: bold;
  margin-top: 15px;
}

.progress {
  height: 10px;
  background: #f0f5ff;
  border-radius: 5px;
  overflow: hidden;
  margin: 25px 0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00aeff, #3a82ff);
  border-radius: 5px;
  transition: width 0.3s ease;
}

/* 加载动画 */
.spinner {
  width: 70px;
  text-align: center;
  margin: 0 auto;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #00aeff;
  border-radius: 100%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
 .video-container {
     position: relative;
     width: 94%;  /* 宽度设为100%表示占满父容器 */
     padding-top: 56.25%; /* 16:9 宽高比 (9/16 = 0.5625 即 56.25%) */
   }
   .video-container video {
     position: absolute;
     top: 10px;
     left: 22px;
     width: 100%;
     height: 90%;
     object-fit: cover; /* 保持比例并填充容器，可能会裁剪边缘 */
   }
.page-header {
  position: relative;
  width: 99vw;
  height: 70px;
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
  .header-left {
    width: 160px;
    height: 54px;
  .logo{
    margin-left: 30px;
  }
  }
  .header-nav {
    width: 495px;
    // background-color: antiquewhite;
    margin-left: 100px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1a1a1c;
    font-weight: bold;
    // .nax
    button {
      width: 164px;
      border-radius: 66px;
      background-color: #00aeff;
      color: white;
      margin-left: -19px;
    }
  }
}
/* 仪表盘容器 */
.notice[data-status='good'] {
  color: #52c41a;
}
.notice[data-status='normal'] {
  color: #faad14;
}
.notice[data-status='danger'] {
  color: #f5222d;
}

.key {
  display: flex;
  /* gap: 20px; */
  margin-bottom: 10px;
}
.key-word {
  margin: 20px 0 10px 0;
}
.box {
  width: 552px;
  height: 107px;
  border-radius: 8px;
  background-color: #f0f5ff;
  border: 1px solid #c2ecff;
}
.gauge1,
.gauge2,
.gauge3 {
  width: 100%;
  height: 150px;
}
.card1,
.card2 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding-left: 15px;
  padding-top: 5px;
  gap: 2px;
}
.fluer {
  color: #716e75;
  font-size: 12px;
}
.number {
  color: #1a1a1c;
  font-size: 14px;
}
.card1 .notice {
  font-size: 8px;
  color: #3fcc9d;
}
.card2 .notice {
  font-size: 8px;
  color: #ebb81f;
}
.line1 div {
  background-color: #3a82ff;
  width: 24px !important;
  height: 6px !important;
  border-radius: 3.5px;
}
.line1 {
  display: flex;
  align-items: center;
  font-size: 10px;
  gap: 5px;
  margin-left: 50px;
}
.line2 {
  display: flex;
  align-items: center;
  font-size: 10px;
  gap: 5px;
  margin-left: 50px;
}
.line2 div {
  background-color: #ffdd36;
  width: 24px !important;
  height: 6px !important;
  border-radius: 3.5px;
}
.line3 {
  display: flex;
  align-items: center;
  font-size: 10px;
  gap: 5px;
  margin-left: 50px;
}
.line3 div {
  background-color: #4eff8f;
  width: 24px !important;
  height: 6px !important;
  border-radius: 3.5px;
}
.rings-chart {
  width: 100%;
  height: 280px;
}

.color-fluency {
  background-color: #5470c6;
}
.color-logic {
  background-color: #91cc75;
}
.color-words {
  background-color: #fac858;
}

/* 状态样式 */
.metric-status.speed-slow {
  color: #5470c6;
}
.metric-status.speed-normal {
  color: #91cc75;
}
.metric-status.speed-fast {
  color: #ee6666;
}

.metric-status.filler-good {
  color: #91cc75;
}
.metric-status.filler-normal {
  color: #fac858;
}
.metric-status.filler-bad {
  color: #ee6666;
}

.voice-dashboard {
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 环形图表容器 */
.rings-container {
  position: relative;
  width: 100%;
  height: 280px;
}

/* 中间标签 */
.center-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
}

.center-label span {
  display: block;
  font-size: 16px;
  color: #78909c;
  margin-top: 8px;
}

/* 图例样式 */
.legend-items {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 6px;
}

/* 底部卡片 */
.metrics-info {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.metric-card {
  flex: 1;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #1976d2;
  background: #f8fafc;
}

.metric-card.filler-card {
  border-left-color: #ff9800;
}

.metric-title {
  font-size: 14px;
  color: #5d7ea3;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 26px;
  font-weight: bold;
  color: #1565c0;
  display: flex;
  align-items: flex-end;
}

.metric-unit {
  font-size: 14px;
  color: #90a4ae;
  margin-left: 4px;
}
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
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-header {
  background: #1193cf;
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
  padding: 20px 15px 12px 15px;
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
  /* background: rgba(46, 204, 113, 0.1); */
  border-color: #E3E2E8;
}

.allow-always i {
  color: #2ecc71;
}

.allow-once {
  /* background: rgba(52, 152, 219, 0.1); */
  border-color: #E3E2E8;
}

.allow-once i {
  color: #3498db;
}

.deny {
  /* background: rgba(231, 76, 60, 0.1); */
  border-color:#E3E2E8;
  color: #B0AFB7 !important;
  
}
.deny p{
  
      color: #B0AFB7 !important;
  }

.deny i {
  color: #e74c3c;
}

.right-panel {
  box-sizing: border-box !important;
  height: 706px !important;
  width: 580px !important;
}
.chart-container {
  width: 100%;
  height: calc(100% - 60px); /* 减去标题高度 */
  min-height: 300px;
}

.card {
  /* margin-left: -16px; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.card1 {
  width: 150px;
  height: 66px;
  border-radius: 8px;
  background-color: white;
}
.card2 {
  width: 150px;
  height: 66px;
  border-radius: 8px;
  background-color: white;
}
.guage-card {
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 20px; */
  box-sizing: border-box;
  padding-top: 12px;
}
/* 样式保持不变 */
</style>
<style lang="scss" scoped>
.interview {
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
    // background-color: #d9d9d9;
  }
}
.interview-container {
  // gap: 20px;
  width: 100%;
  padding-top: 18px;
  padding: 18px 7px 0 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #f9fcff;
  // background-color: ;
  // gap: 20px;
  align-items: center;
  // background-color: #1a1a1c;
  height: 762px;
  .panel {
    height: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  .left-panel {
    width: 740px;
    background-color: #f9fcff;
    height: 100%;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
    box-sizing: border-box;
   padding: 15px 5px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
  }
  .right-panel {
    width: 580px !important;
    background-color: #f9fcff;
    height: 100%;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    box-sizing: border-box;
  }
}
.panel-header {
  display: flex;
  justify-content: space-between;
  .el-button {
    border-radius: 12px;
    width: 90px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    // font-size: 14px;
    img {
      margin-right: 5px;
      // width: 130px;
      // height: 50px;
    }
  }
}
.video {
  video {
    width: 680px;
    margin-left: px;
    height: 344px;
    background-color: #d1d1e2;
    border-radius: 8px;
    border: 1px solid #40b0ff;
    margin-top: 10px;
  }
}
.question-section {
  margin-top:-12px;
  // margin: 15px 0;
  display: flex;
  flex-direction: column;
  img {
    width: 122px;
    height: auto;
  }
  .question {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 690px;
    height: 40px;
    border: 1.5px solid #68b0d1;
    border-radius: 8px;
    margin-left: 15px;
    padding: 0px 20px;
    box-sizing: border-box;
    .el-button {
      // background-color: #ff4444;
      width: 110px;
      height: 22px;
      font-size: 12px;
      padding: 12px 30px;
    }
  }
}
.advice-section {
  display: flex;
  flex-direction: column;
  // margin-bottom: 10px;
  margin-top: 8px;

  img {
    width: 122px;
    height: auto;
    margin-bottom: 8px;
  }
  .advice-list {
    // width: 680px;
    width: 690px;
    margin-left: 15px;
    height: 117px;
    box-sizing: border-box;
    padding: 15px;
    
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 7px;

    border: 1.5px solid #68b0d1;
    li {
      list-style: none;
      display: flex;
      // align-items: center;
      align-items: flex-start;
      font-size: 14px;
    }
    img {
      margin-top: -3px;
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
.button-group {
  margin-top: 7px;
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  .el-button {
    background-clip: #00aeff;
    border-radius: 18px;
    width: 122px;
    box-sizing: border-box;
    // display: flex;
    padding: 18px 20px;
    margin-bottom: 10px;
    img {
      // width: 28px;
      margin-right: 3px;
      // flex-shrink: 16;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.footer {
  margin-top: 20px;
  height: 200px;
  width: 100%;
  background-color: #1a1a1c;
}

.card-container {
  display: flex;
  gap: 10px;
}
.guage-card {
  width: 176px;
  height: 426px;
  background-color: #f0f5ff;
  border: 1px solid #c2ecff;
  border-radius: 8px;
}
.yibiaopang {
  padding: 5px 0 15px 0;
}
.card {
  padding-top: 20px;
}
.chart-container {
  width: 200px;
  height: 100px;
}
.page-header {
  width: 99vw;
  height: 70px;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 71px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #1a1a1c;
  .header-left {
    width: 160px;
    height: 54px;
    // background-color: #d9d9d9;
  }
  .header-nav {
    width: 495px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:black;
    font-weight: bold;
    button {
      width: 164px;
      border-radius: 66px;
      background-color: #00aeff;
      color: white;
      margin-left: -19px;
    }
  }
  .item1,.item2,.item3{
    margin-top: 40px;
    width: 100%;
    height: 100%;
    position: relative;

  }
}
 .page-header {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 100, 0.1);
  padding: 0 25px;
  height: 80px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.page-header:hover {
  box-shadow: 0 10px 40px rgba(0, 80, 200, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  color: #2563eb;
  text-decoration: none;
}

.logo-icon {
  margin-right: 12px;
  font-size: 28px;
  color: #3b82f6;
}

.logo-text {
  position: relative;
  top: -2px;
}

.logo-text span {
  color: #0ea5e9;
}

.header-nav {
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
}

.nav-items {
  display: flex;
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0 18px;
  height: 100%;
  font-weight: 600;
  font-size: 16px;
  color: #4b5563;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #2563eb;
}

.nav-item:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 18px;
  right: 18px;
  height: 3px;
  background: #3b82f6;
  border-radius: 10px 10px 0 0;
}

.nav-item.active {
  color: #00aeff;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 18px;
  right: 18px;
  height: 3px;
  background: #00aeff;
  border-radius: 10px 10px 0 0;
}

.nav-item i {
  margin-right: 8px;
  font-size: 18px;
}

.header-right {
  display: flex;
  align-items: center;
  width: 150px !important;
}

.start-button2 {
  background-color: #00aeff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 220px !important;
  border: none;
  border-radius: 66px !important;
  padding: 12px 20px 12px 28px;
  font-weight: 550;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(67, 94, 136, 0.4);
  display: flex;
  align-items: center;
}

.start-button2:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 110, 129, 0.6);
}

.start-button2:active {
  transform: translateY(1px);
}

.start-button2 i {
  margin-left: 8px;
  font-size: 14px;
}
.header-nav{
  margin-left: 68px;
}
.bar-charts-container {
  display: flex;
  gap: 10px;
  width: 550px;
  height: 137px; /* 设置固定高度 */
}

.bar-chart-box {
  flex: 1;
  height: 100%;
  // background-color: #f0f5ff;
  // border: 1px solid #c2ecff;
  border-radius: 8px;
  padding: 5px;
  box-sizing: border-box;
}

.bar-chart {
  width: 100%;
  height: 100%;
  min-height: 90px; /* 确保有最小高度 */
}
</style>
