<template>
  <div class="container">
    <!-- 左侧区域 -->
    <div class="left-panel">
      <!-- 面试实况 -->
      <div>
        <div class="flex justify-between items-center">
          <div class="interview-title">
            <i class="fa fa-video-camera"></i>
            面试实况
          </div>
          <div class="timer">
            <i class="fa fa-clock-o"></i>
            {{ interviewTime }}
          </div>
        </div>
        <div class="video-wrap">
          <div class="avatar">
            <img src="https://picsum.photos/id/64/200" alt="面试者头像" />
          </div>
        </div>
      </div>
      
      <!-- 面试问题 -->
      <div>
        <div class="suggest-title">
          <i class="fa fa-question-circle"></i>
          面试问题
        </div>
        <div class="question-box">
          <div class="question-text">{{ currentQuestion }}</div>
          <div class="question-tag">{{ questionTag }}</div>
        </div>
      </div>
      
      <!-- 回答建议 -->
      <div>
        <div class="suggest-title">
          <i class="fa fa-lightbulb-o"></i>
          回答建议
        </div>
        <div class="suggest-area">
          <ol class="suggest-list">
            <li v-for="(suggestion, index) in answerSuggestions" :key="index">
              {{ suggestion }}
            </li>
          </ol>
          <div class="btn-group">
            <button class="btn btn-stop" @click="stopAnswering">停止回答</button>
            <button class="btn btn-start" @click="startAnswering">开始回答</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="right-panel">
      <!-- 用户信息条 -->
      <div class="user-info">
        <span>
          <i class="fa fa-user"></i>
          姓名：{{ candidate.name }}
        </span>
        <span>
          <i class="fa fa-birthday-cake"></i>
          年龄：{{ candidate.age }}岁
        </span>
        <span>
          <i class="fa fa-graduation-cap"></i>
          学历：{{ candidate.education }}
        </span>
      </div>
      
      <!-- 多模态实时分析 -->
      <div>
        <div class="analysis-title">
          <i class="fa fa-bar-chart"></i>
          多模态实时分析
        </div>
        <div class="analysis-cards">
          <!-- 语音分析 -->
          <div class="card">
            <h4>
              <i class="fa fa-volume-up" style="color: #0099FF;"></i>
              语音分析
            </h4>
            <div class="chart-box" ref="voiceChartRef"></div>
            <div class="metric">
              <span>平均语速</span>
              <span>{{ analysis.voice.speed }} 字/分</span>
            </div>
            <div class="metric">
              <span>语气词频率</span>
              <span>{{ analysis.voice.fillerWords }} 次/分</span>
            </div>
            <div class="metric">
              <span>流利度</span>
              <span class="status">{{ analysis.voice.fluency }}</span>
            </div>
          </div>
          
          <!-- 视频分析 -->
          <div class="card">
            <h4>
              <i class="fa fa-video-camera" style="color: #00B42A;"></i>
              视频分析
            </h4>
            <div class="chart-box" ref="videoChartRef"></div>
            <div class="metric">
              <span>眼神交流</span>
              <span>{{ analysis.video.eyeContact }}%</span>
            </div>
            <div class="metric">
              <span>手势自然度</span>
              <span class="status">{{ analysis.video.gesture }}</span>
            </div>
            <div class="metric">
              <span>表情管理</span>
              <span class="status">{{ analysis.video.facialExpression }}</span>
            </div>
          </div>
          
          <!-- 文本分析 -->
          <div class="card">
            <h4>
              <i class="fa fa-file-text-o" style="color: #722ED1;"></i>
              文本分析
            </h4>
            <div class="chart-box" ref="textChartRef"></div>
            <div class="metric">
              <span>STAR结构应用</span>
              <span>{{ analysis.text.starStructure }}%</span>
            </div>
            <div class="metric">
              <span>问题理解度</span>
              <span>{{ analysis.text.understanding }}%</span>
            </div>
            <div class="metric">
              <span>专业匹配度</span>
              <span class="status">{{ analysis.text.matching }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 关键词检测 -->
      <div>
        <div class="keyword-title">
          <i class="fa fa-tags"></i>
          关键词检测
        </div>
        <div class="keyword-tags">
          <span class="keyword-tag" v-for="(keyword, index) in keywords" :key="index">
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import * as echarts from 'echarts';

// 状态管理
const interviewTime = ref('03:20');
const currentQuestion = ref('解释JavaScript闭包原理');
const questionTag = ref('2023字节真题');
const answerSuggestions = ref([
  '建议1：从作用域链角度说明',
  '建议2：结合函数嵌套示例',
  '建议3：解释闭包实际应用场景'
]);
const candidate = ref({
  name: '李想',
  age: 19,
  education: '本科在读'
});
const analysis = ref({
  voice: {
    score: 65,
    speed: 180,
    fillerWords: 3,
    fluency: '良好'
  },
  video: {
    score: 75,
    eyeContact: 65,
    gesture: '中等',
    facialExpression: '良好'
  },
  text: {
    score: 80,
    starStructure: 60,
    understanding: 88,
    matching: '优秀'
  }
});
const keywords = ref(['闭包', '作用域链', '函数嵌套', '变量捕获', '内存管理', '啊啊啊', '这个', '那个']);

// ECharts 引用
const voiceChartRef = ref<HTMLElement | null>(null);
const videoChartRef = ref<HTMLElement | null>(null);
const textChartRef = ref<HTMLElement | null>(null);

// ECharts 实例
let voiceChart: echarts.ECharts | null = null;
let videoChart: echarts.ECharts | null = null;
let textChart: echarts.ECharts | null = null;

// 初始化图表
const initCharts = () => {
  if (!voiceChartRef.value || !videoChartRef.value || !textChartRef.value) return;
  
  // 语音分析图表
  voiceChart = echarts.init(voiceChartRef.value);
  voiceChart.setOption({
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      radius: '90%',
      center: ['50%', '70%'],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.65, '#0099FF'],
            [1, '#99DDFF']
          ]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: true,
        text: '语音分析',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
        offsetCenter: [0, '-10%']
      },
      detail: {
        show: true,
        formatter: '{value}%',
        fontSize: 20,
        color: '#333',
        offsetCenter: [0, '10%']
      },
      data: [{
        value: analysis.value.voice.score
      }]
    }]
  });
  
  // 视频分析图表
  videoChart = echarts.init(videoChartRef.value);
  videoChart.setOption({
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      radius: '90%',
      center: ['50%', '70%'],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.75, '#00B42A'],
            [1, '#99FFAA']
          ]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: true,
        text: '视频分析',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
        offsetCenter: [0, '-10%']
      },
      detail: {
        show: true,
        formatter: '{value}%',
        fontSize: 20,
        color: '#333',
        offsetCenter: [0, '10%']
      },
      data: [{
        value: analysis.value.video.score
      }]
    }]
  });
  
  // 文本分析图表
  textChart = echarts.init(textChartRef.value);
  textChart.setOption({
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      radius: '90%',
      center: ['50%', '70%'],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.8, '#722ED1'],
            [1, '#CC99FF']
          ]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: true,
        text: '文本分析',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
        offsetCenter: [0, '-10%']
      },
      detail: {
        show: true,
        formatter: '{value}%',
        fontSize: 20,
        color: '#333',
        offsetCenter: [0, '10%']
      },
      data: [{
        value: analysis.value.text.score
      }]
    }]
  });
};

// 窗口大小变化时重绘图表
const handleResize = () => {
  voiceChart?.resize();
  videoChart?.resize();
  textChart?.resize();
};

// 生命周期钩子
onMounted(() => {
  initCharts();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  voiceChart?.dispose();
  videoChart?.dispose();
  textChart?.dispose();
});

// 方法
const startAnswering = () => {
  console.log('开始回答');
};

const stopAnswering = () => {
  console.log('停止回答');
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}
/* 左侧区域 */
.left-panel {
  flex: 1;
  background-color: #fff;
  border: 1px solid #d9f0ff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
/* 面试实况标题 */
.interview-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0099ff;
}
.interview-title .fa {
  width: 20px;
  text-align: center;
}
/* 视频区域 */
.video-wrap {
  width: 100%;
  height: 240px;
  background-color: #fff9e6;
  border: 1px solid #ffeebf;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #c8e6ff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 面试问题 */
.question-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fcff;
  border: 1px solid #d9f0ff;
  border-radius: 4px;
  padding: 12px;
}
.question-text {
  font-size: 14px;
  color: #333;
}
.question-tag {
  font-size: 12px;
  color: #fff;
  background-color: #ff4d4f;
  padding: 2px 6px;
  border-radius: 4px;
}
/* 回答建议 */
.suggest-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.suggest-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0099ff;
}
.suggest-title .fa {
  width: 16px;
  text-align: center;
}
.suggest-list {
  list-style: none;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.suggest-list li {
  font-size: 14px;
  color: #666;
  position: relative;
}
.suggest-list li::before {
  content: "1";
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  background-color: #0099ff;
  border-radius: 50%;
  position: absolute;
  left: -20px;
  top: 2px;
  font-size: 12px;
}
.suggest-list li:nth-child(2)::before { content: "2"; }
.suggest-list li:nth-child(3)::before { content: "3"; }
.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.btn-stop {
  background-color: #ff4d4f;
  color: #fff;
}
.btn-start {
  background-color: #d9d9d9;
  color: #666;
}

/* 右侧区域 */
.right-panel {
  flex: 1;
  background-color: #fff;
  border: 1px solid #d9f0ff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
/* 用户信息条 */
.user-info {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #333;
  padding: 10px 16px;
  border: 1px solid #99ddff;
  border-radius: 20px;
}
.user-info .fa {
  width: 18px;
  text-align: center;
  margin-right: 4px;
}
.user-info span {
  display: flex;
  align-items: center;
}
/* 多模态分析标题 */
.analysis-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #0099ff;
}
.analysis-title .fa {
  width: 20px;
  text-align: center;
}
.analysis-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}
.card {
  flex: 1;
  background-color: #f9fcff;
  border: 1px solid #d9f0ff;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}
.card h4 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 4px;
}
.card h4 .fa {
  width: 18px;
  text-align: center;
}
.chart-box {
  width: 120px;
  height: 120px;
}
.card p {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}
.metric {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  padding: 4px 0;
}
.metric .status {
  font-size: 12px;
  color: #ff9900;
}
/* 关键词检测 */
.keyword-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0099ff;
}
.keyword-title .fa {
  width: 16px;
  text-align: center;
}
.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.keyword-tag {
  background-color: #f9f0ff;
  border: 1px solid #e6d2ff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #9933ff;
}
/* 计时器样式 */
.timer {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #0099ff;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}
.timer .fa {
  width: 16px;
  text-align: center;
}
</style>

<style>
/* 引入Font Awesome */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');
</style>