<template>
  <div class="interview-page">
    <!-- 头部导航 -->
    <div class="page-header">
      <div class="header-left"></div>
      <div class="header-nav">
        <span class="nav-item" @click="navigateTo('home')">我的报告</span>
        <span class="nav-item" @click="navigateTo('learning')">学习中心</span>

        <button @click="routerPlease()" >选择岗位</button>

        <img src="../assets//images/avator.png" alt="" />
      </div>
    </div>

    <!-- Banner 区域 -->
    <div class="banner-section">
      <!-- 左侧内容：标题+描述+步骤 -->
      <div class="banner-left">
        <!-- 标题区：支持多行/标签组合 -->
        <div class="banner-title">
          <span class="tag">小绒燕ai面试</span>
        </div>
        <div class="banner-title2">自动化智能面试工具</div>
        <!-- 描述文案 -->
        <p class="banner-desc">
          线下面试成本抽象？仅是干简历以准确评估自身水平？
          <br />
          <span> 现在：面试前可以用AI评估自己</span>
        </p>

        <!-- 步骤流程 -->
        <div class="steps">
          <div class="step-item">
            <div class="step-circle">1</div>
            <div class="step-title">选择岗位</div>
            <div class="step-desc">AI/大数据/物联网</div>
          </div>
          <div class="step-arrow">→</div>
          <!-- 步骤2 -->
          <div class="step-item">
            <div class="step-circle">2</div>
            <div class="step-title">开始面试</div>
            <div class="step-desc">多模态实时分析</div>
          </div>
          <div class="step-arrow">→</div>
          <!-- 步骤3 -->
          <div class="step-item">
            <div class="step-circle">3</div>
            <div class="step-title">获取报告</div>
            <div class="step-desc">5维能力评估</div>
          </div>
          <!-- 步骤4 -->
          <div class="step-arrow">→</div>
          <div class="step-item">
            <div class="step-circle">4</div>
            <div class="step-title">学习提升</div>
            <div class="step-desc">个性化建议</div>
          </div>
        </div>
      </div>

      <!-- 右侧内容：卡片 -->
      <div class="banner-right">
        <!-- 顶部信息（头像+姓名+职位） -->
        <!-- <el-card class="card"> -->
        <img src="../assets//images/Frame.png" alt="" class="frame" />
        <!-- </el-card> -->
      </div>
    </div>

    <!-- 数据统计卡片 -->
    <div class="stats-section">
      <div
        class="stats-card"
        v-for="(card, index) in state.statsCards"
        :key="index"
      >
        <el-card class="statsCard">
          <span class="card-value">{{ card.value }}</span>
          <p class="card-desc">{{ card.desc }}</p>
          <p class="card-tag" v-if="card.tag">{{ card.tag }}</p>
        </el-card>
      </div>
    </div>

    <!-- AI模拟面试模块 -->
    <div class="interview-section">
      <div class="interview-left">
        <p class="p1">AI模拟面试,<span>干掉紧张！</span></p>
        <p class="p2">多模块评测·实时反馈·精准提升</p>
        <button>免费开始 →</button>
      </div>
      <div class="interview-right">
        <img src="../assets//images/雷达图.png" alt="" />
        <!-- </div> -->
      </div>
    </div>

    <!-- 场景选择模块 -->
    <div class="scene-section">
      <!-- 标题 -->
      <!-- <div class="scene-choice">选择你的战场</div> -->
      <!-- 卡片列表容器 -->
      <div class="scene-cards">
        <!-- 循环渲染卡片，这里用 state.sceneList 数据 -->
        <div class="scene-section">
          <!-- 标题 -->
          <h2 class="scene-choice">选择你的战场</h2>
          <!-- 卡片列表容器 -->
          <div class="scene-cards">
            <!-- 循环渲染卡片，使用 state 中模拟的对应数据 -->
            <div
              class="scene-card"
              v-for="(item, index) in state.sceneCards"
              :key="index"
            >
              <!-- 卡片顶部背景图 + 标题 + 星级 -->
              <div class="card-header">
                <!-- 实际项目替换为正确图片路径，这里用文字模拟背景图展示逻辑 -->
                <div
                  class="header-bg"
                  :style="{ backgroundImage: `url(${item.image})` }"
                >
                  <h3 class="card-title">{{ item.title }}</h3>
                  <div class="stars">{{ item.stars }}</div>
                </div>
              </div>
              <!-- 卡片内容区域 -->
              <div class="card-body">
                <!-- 考察重点模块 -->
                <div class="item-box">
                  <div class="project">
                    <span class="item-title">考察重点</span>
                    <span class="item-count">{{ item.inspectCount }}项</span>
                  </div>
                  <div class="tags">
                    <span
                      class="tag"
                      v-for="(tag, tagIndex) in item.inspectTags"
                      :key="tagIndex"
                      >{{ tag }}</span
                    >
                  </div>
                </div>
                <!-- 高频题目模块 -->
                <div class="item-box">
                  <div class="project">
                    <span class="item-title">高频题目</span>
                    <span class="item-count">{{ item.highFreqCount }}项</span>
                  </div>
                  <div class="tags">
                    <span
                      class="tag"
                      v-for="(tag, tagIndex) in item.highFreqTags"
                      :key="tagIndex"
                      >{{ tag }}</span
                    >
                  </div>
                </div>
                <!-- 开始挑战按钮 -->
                <el-button type="primary" class="start-button"
                  >开始挑战</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 面试表现分析模块 -->
    <div class="analysis-section">
      <h2 class="scene-choice">看看AI如何分析你的面试表现</h2>
      <div class="scene-cards analysis-cards">
        <div
          class="scene-card analysis-card"
          v-for="(item, index) in state.analysisList"
          :key="index"
        >
          <div class="card-header analysis-header">
          
              <img :src="item.iconUrl" alt="图标" class="analysis-icon" />
            &nbsp;&nbsp;
            <h3 class="card-title">{{ item.title }}</h3>
          </div>
          <div class="card-body analysis-body">
            <ul class="analysis-list">
              <li v-for="(desc, descIndex) in item.descList" :key="descIndex">
                {{ desc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 面试痛点模块 -->
    <div class="painpoint-section"></div>

    <!-- 功能模块 -->
    <div class="feature-section">
      <div class="feature-item">
        <div class="feature-icon">
          <img src="../assets/images/票.png" alt="" />
        </div>
        <h3 class="feature-title">讯飞语言分析</h3>
        <div class="feature-desc">
          功能：<span>实时语音转写与情感分析</span>
        </div>
        <div class="last">调用参数：speech_analysis</div>
        <div class="know">
          <img src="../assets//images/Frame 33.png" alt="" /> 了解原理
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">
          <img src="../assets/images/跑.png" alt="" />
        </div>
        <h3 class="feature-title">讯飞微表情识别</h3>
        <div class="feature-desc">
          功能：<span>面部表情特征提取与分类</span>
        </div>
        <div class="last">调用参数：expression_detect</div>
        <div class="know">
          <img src="../assets//images/Frame 33.png" alt="" /> 了解原理
        </div>
      </div>
      <div class="feature-item">
        <div class="feature-icon">
          <img src="../assets/images/酷.png" alt="" />
        </div>
        <h3 class="feature-title">讯飞内容评估</h3>
        <div class="feature-desc">
          功能：<span>STAR结构分析与关键词匹配</span>
        </div>
        <div class="last">调用参数：content_eval</div>
        <div class="know">
          <img src="../assets//images/Frame 33.png" alt="" /> 了解原理|
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="page-footer">
      <div class="footer-content">
        <!-- 导航区域 -->
        <div class="footer-nav">
          <span>关于我们</span>
          <span>隐私政策</span>
          <span>帮助中心</span>
          <span>联系客服</span>
        </div>
        <!-- 信息区域 -->
        <div class="footer-info">
          <span>咨询时间: 工作日9点-11点 14点-17点</span>
          <span></span>
          <span></span>
          <!-- <span></span> -->
          <span>邮编: 10046</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts';
import maikIcon from "../assets/images/maik.png";
import watchIcon from "..//assets/images/watch.png";
import contentIcon from "..//assets/images/content.png";
import Group1 from '../assets/images/Group 29.png'
import Group2 from '../assets/images/Group 30.png'
import Group3 from '../assets/images/Group 31.png'


// 数据定义
const state = reactive({
  bannerStats: ['精准分析', '智能评估', '多维度对比', '个性化建议'],
  statsCards: [
    {
      value: '86%',
      desc: '学生通过训练后面试通过率提升',
      tag: '基于科大讯飞火星大模型',
    },
    { value: '93%', desc: '微表情识别准确率', tag: '多模态分析' },
    { value: '3.3ms', desc: '实时反馈响应速度', tag: '实时分析' },
  ],
  sceneList: [
    { title: 'AI工程师', desc: '应届生/实习岗位专项训练', image: 'campus.png' },
    {
      title: '大数据开发',
      desc: '职场人晋升/转行模拟',
      image: 'job-hopping.png',
    },
    {
      title: '物联网',
      desc: '公务员/事业单位面试训练',
      image: 'civil-service.png',
    },
  ],
  painpointTags: [
    '紧张忘词',
    '逻辑混乱',
    '回答空洞',
    '岗位匹配度低',
    '表达不清晰',
  ],
  sceneCards: [
    {
      title: 'AI工程师',
      image: Group1, // 替换为实际图片路径
      stars: '★★★',
      inspectCount: 3,
      inspectTags: ['算法基础', '项目深挖', '系统设计'],
      highFreqCount: 3,
      highFreqTags: ['过拟合解决方法', '模型优化思路', '项目难点分析'],
    },
    {
      title: '大数据开发',
      image: Group2,
      stars: '★★★',
      inspectCount: 3,
      inspectTags: ['Hadoop/Spark优化', '数据仓库设计', '实时计算'],
      highFreqCount: 3,
      highFreqTags: ['数据倾斜处理', '性能调优', '数据一致性保障'],
    },
    {
      title: '物联网',
      image: Group3, // 替换为实际图片路径
      stars: '★★☆',
      inspectCount: 3,
      inspectTags: ['嵌入式开发', '通信协议', '低功耗设计'],
      highFreqCount: 3,
      highFreqTags: ['设备连接方案', '数据安全', '边缘计算应用据安全'],
    },
  ],
  featureList: [
    { icon: '🔍', title: '精准分析', desc: '多维度算法解析你的表现' },
    { icon: '📊', title: '专属报告', desc: '生成个性化提升建议' },
    { icon: '🎯', title: '场景训练', desc: '覆盖200+真实面试场景' },
  ],
  analysisList: [
    {
      iconUrl: maikIcon, // 语言分析图标
      title: '语言分析',
      descList: [
        '语言检测（180字/分钟）',
        '情感倾向：积极/消极/中性',
        '填充词标记（“呃”、“啊”出现次数）',
      ],
    },
    {
      iconUrl: watchIcon, // 视频分析图标
      title: '视频分析',
      descList: [
        '微表情识别（紧张/自信/困惑）',
        '眼神接触频率（占比62%）',
        '手势规范度评估',
      ],
    },
    {
      iconUrl: contentIcon, // 内容分析图标
      title: '内容分析',
      descList: ['STAR结构完整性', '技术术语准确性', '岗位关键匹配度'],
    },
  ],
});
// 图表引用
const chartRef = ref<HTMLDivElement | null>(null);
const painpointChartRef = ref<HTMLDivElement | null>(null);

// 初始化图表
const initCharts = () => {
  // 面试能力雷达图
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
      // 雷达图配置
      radar: {
        indicator: [
          { name: '语言表达', max: 100 },
          { name: '逻辑思维', max: 100 },
          { name: '应变能力', max: 100 },
          { name: '专业知识', max: 100 },
          { name: '形象气质', max: 100 },
        ],
      },
      series: [
        {
          type: 'radar',
          data: [{ value: [85, 78, 65, 90, 70], name: '面试能力分析' }],
        },
      ],
    });
  }

  // 痛点分析柱状图
  if (painpointChartRef.value) {
    const chart = echarts.init(painpointChartRef.value);
    chart.setOption({
      // 柱状图配置
      xAxis: {
        type: 'category',
        data: [
          '紧张忘词',
          '逻辑混乱',
          '回答空洞',
          '表达不清晰',
          '岗位匹配度低',
        ],
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: [78, 65, 52, 48, 60],
        },
      ],
    });
  }
};

// 生命周期钩子
onMounted(() => {
  initCharts();
});

// 方法定义
const startInterview = () => {
  // 开始面试逻辑
  console.log('开始AI面试');
};

const navigateTo = (path: string) => {
  // 路由跳转逻辑
  console.log(`导航到: ${path}`);
};

import { useRouter } from 'vue-router';
const router = useRouter()
const routerPlease=()=>{
router.push('/Choice');
}
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 20px !important;
}
// 全局变量
.interview-page {
  width: 99vw;
  // font-family:
  //   'PingFang SC',
  //   -apple-system,
  //   BlinkMacSystemFont,
  //   'Segoe UI',
  //   Roboto,
  //   Oxygen - Sans,
  //   Ubuntu,
  //   Cantarell,
  //   'Helvetica Neue',
  //   sans-serif;
}
// 头部导航
.page-header {
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
    background-color: #d9d9d9;
  }
  .header-nav {
    width: 495px;
    // background-color: antiquewhite;
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

// banner
.banner-section {
  width: 99vw;
  // background-color: pink;
  background-image: linear-gradient(
    to right,
    #96e2ff 0%,
    #baecff 54%,
    #bbecff 100%
  );
  height: 529px;
  display: flex;
  align-items: center;
  gap: 40px;
  box-sizing: border-box;
  padding: 20px 40px;
  .banner-left,
  .banner-right {
    flex: 1; /* 左右各占一半，或按需改 flex: 0 0 50% */
    // background-color: red;
  }
  .banner-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    // margin: 80px 0;
    padding: 70px 0;
    box-sizing: border-box;
    align-items: flex-start;
    // justify-content: space-between;
    .tag {
      color: #0077ff;
      font-size: 58px;
      font-weight: 600;
      font-weight: bold;
    }
    .banner-desc {
      display: flex;
      flex-direction: column;
      // justify-content: flex-start;
      align-items: flex-start;
      color: #716e75;
      font-size: 18px;
      margin: 12px 0;
    }
    .banner-title2 {
      font-size: 32px;
      // font-weight: #3895FF!important;
      color: #3895ff;
      font-weight: bold;
    }
    .banner-right {
      .frame {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.stats-section {
  // background-color: blue($color: #000000);
  width: 99vw;
  height: 320px;
  box-sizing: border-box;
  // margin: 49px,60px,70px,60px;
  background-color: #f5f5f5;
  padding: 50px 60px;
}
.interview-section {
  width: 99vw;
  height: 458px;
  // background-;
  background-color: white;
}
.scene-section {
  width: 99vw;
  height: 566px;
  box-sizing: border-box;
  background-color: brown;
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    // margin-bottom: 20px;
  }

  .tag {
    padding: 4px 8px;
    background-color: #dbe3f6;
    color: #316ffd;
    border-radius: 10px;
    font-size: 10px;
  }
}
.analysis-section {
  width: 99vw;
  height: 384px;
  background-color: chocolate;
}
.painpoint-section {
  width: 99vw;
  height: 502px;
  background-color:pink;
}
.feature-section {
  width: 99vw;
  height: 330px;
  // background-color: cadetblue;
}
.page-footer {
  width: 99vw;
  height: 341px;
  background-color: #393939;
}

/* 容器：水平排列，均匀分布 */
.steps {
  display: flex;
  align-items: center; /* 垂直居中，让箭头和步骤对齐 */
  gap: 0; /* 去掉默认间距，改用箭头自己的 margin */
  padding: 20px 0;
  // background: #C9F2FF;
}

/* 步骤项：让内容垂直居中，压缩宽度 */
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px; /* 固定宽度，让箭头均匀分布 */
}

/* 箭头：独立控制位置和样式 */
.step-arrow {
  margin: -10px 10px !important; /* 箭头左右间距 */
  font-size: 18px;
  color: #0099ff;
}

/* 其他样式（圆圈、标题、描述）和之前一样，可复用 */
.step-circle {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #0099ff;
  font-weight: bold;
  margin-bottom: 8px;
}
.step-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-title {
  font-size: 16px;
  color: #3895ff;
  margin-bottom: 4px;
}
.step-desc {
  font-size: 12px;
  color: #666;
}
.stats-section {
  display: flex;
  justify-content: space-between;
  // fle;
  flex-direction: row;
}
.stats-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statsCard {
  width: 400px;
  height: 200px;
  // font-weight: bold;
  overflow: hidden;
  .card-value {
    box-sizing: content-box;
    // padding-top: 20px;
    color: #00aeff;
    font-size: 48px;
    width: 150px;
    font-weight: bold;
    padding-top: 40px;
  }
  .card-desc {
    color: #716e75;
    font-size: 24px !important;
    margin: 5px 0 5px 0;
    font-weight: bold;
  }
  .card-tag {
    color: #1a1a1c;
    font-size: 24px;
    // font-weight: bold;
    margin: 0;
  }
}
// .el-card__body{
//   // padding: 20px !important;
//   width: 400px !important;
//   display: flex;
//   padding: var(--el-card-padding);
// }

// 现在还有半个小时，半个小时搞定，一个之后的话这里转这会

.interview-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px 0 100px;
  box-sizing: border-box;
  .interview-left,
  .interview-right {
    // background-color: red;
  }
  .interview-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    .p1 {
      font-size: 48px;
      margin: 0;
      font-weight: bold;
      span {
        color: #00aeff;
      }
    }
    .p2 {
      color: #000;
      font-size: 20px;
      margin: 0;
    }
    button {
      border-radius: 4vw;
      width: 220px;
      background-color: #00aeff;
      font-size: 24px;
      color: white;
    }
  }
  .interview-right img {
    width: 346px;
    height: 339px;
  }
}
.scene-section {
  width: 100%;
  // padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; /* 可根据实际需求调整背景色 */
  .card-header {
    width: 100%;
    height: 137px;
    background-color: #00aeff;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    // margin-bottom: 20px;
  }

  .tag {
    padding: 4px 8px;
    background-color: #dbe3f6;
    color: #316ffd;
    border-radius: 10px;
    font-size: 10px;
  }
}

.scene-choice {
  font-size: 28px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.scene-cards {
  display: flex;
  width: 100%;
  // gap: 20px;
  justify-content: space-evenly;
  flex-wrap: wrap; /* 屏幕变窄时自动换行 */
}

.scene-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  height: 400px;
}

.header-bg {
  width: 100%;
  height: 137px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

/* 给背景图加个半透明遮罩（可选，让标题更清晰） */

.card-title {
  font-size: 20px;
  color: #fff;
  position: relative; /* 让标题在遮罩上层 */
  z-index: 1;
  font-weight: bold !important;
}

.card-body {
  // padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 250px;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.start-btn {
  width: 100%;
  padding: 10px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.start-btn:hover {
  background-color: #66b1ff;
}
.item-box {
  width: 312px;
  height: 80px;
  box-sizing: border-box;
  padding-left: 20px;
  background-color: #f2f3f5;
  border-radius: 4%;
  display: flex;
  // fl;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  .project {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 20px;
    width: 100%;
    .item-title {
      font-weight: bold !important;
      font-size: 14px;
      color: #1a1a1c;
    }
    .item-count {
      color: #316ffd;
      font-size: 10px;
    }
  }
}
.start-button {
  width: 312px;
  height: 28px;
  background-color: #00aeff;
}

.analysis-section {
  width: 100%;
  padding: 40px 20px; /* 上下内边距 */
  background: #fff; /* 白色背景 */
  box-sizing: border-box;
  .section-title {
    font-size: 20px; /* 匹配设计图标题大小 */
    font-weight: 600; /* 适中加粗 */
    color: #333; /* 深灰色文字 */
    text-align: center;
    margin-bottom: 32px; /* 标题与卡片间距 */
  }

  /* 卡片容器：Flex 布局 */
  .card-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    gap: 24px; /* 卡片间距 */
    flex-wrap: wrap; /* 响应式换行 */
  }

  /* 单个卡片样式 */
  .analysis-card {
    width: 400px; /* 卡片宽度 */
    height: 200px; /* 最小高度 */
    background: #f7f6f9; /* 浅灰色背景 */
    border-radius: 8px; /* 卡片圆角 */
    padding: 24px; /* 内边距 */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center; /* 内容居中 */
    text-align: center; /* 文字居中 */
  }
  .analysis-header {
    display: flex;
  }

  /* 卡片图标 */
  /* 卡片标题 */
  .card-title {
    font-size: 16px; /* 标题字号 */
    font-weight: 500; /* 标题加粗 */
    color: #00aeff; /* 主题色 */
    margin-bottom: 16px; /* 标题与列表间距 */
  }

  /* 列表样式 */
  .card-list {
    list-style: none; /* 清除默认列表样式 */
    padding: 0;
    margin: 0;
    text-align: left; /* 文字左对齐 */
  }

  // .card-list li {
  //   font-size: 14px;       /* 列表文字大小 */
  //   color: #666;           /* 灰色文字 */
  //   line-height: 24px;     /* 行高优化 */
  //   position: relative;
  //   padding-left: 16px;    /* 左侧留白 */
  // }

  /* 列表项前的小圆点（可选，设计图没有则删除） */
  .card-list li::marker {
    content: '•';
    position: absolute;
    left: 0;
    color: #00aeff; /* 主题色圆点 */
  }
}

/* 标题样式 */
.footer-content {
  display: flex;
  // justify-content: center;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100%;
  flex-direction: column;
}
.footer-nav {
  width: 460px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}
.footer-info {
  box-sizing: border-box;
  padding-top: 50px;
  font-size: 16px;
  display: flex;
  // justify-content:;
  flex-direction: column;
}
.feature-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 130px;
  .feature-title {
    font-size: 24px;
    color: #00aeff;
    margin: 0 0 5px 0;
  }
  .feature-desc {
    color: #1a1a1c;
  }
  .last {
    color: #716e75;
    font-size: 12px;
  }
  .know {
    color: #716e75;
    font-size: 10px;
    margin-top: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
  }
}
.card-header{
  display: inline-flex !important;
  // justify-content: space-around;
  align-items: center;
  // vertical-align: ;
  img{
    height: 24px;
    margin-bottom: -2px;
  }
  .card-title{
    // font-size: 24px;
    font-size: 20px;
  }
}
.analysis-list{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
}
.analysis-list li::before{
  content: "•";
  color: #00AEFF;
  padding-right: 10px;
  box-sizing: border-box;
}
li::marker{
  color: #00AEFF!important;
}
li{
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  // font-weight: bold;

  
}
.card-body.analysis-body {
    margin-top: -20px;
}
.analysis-cards {
  /* 父容器样式... */
  
  /* 选第三个 .scene-card.analysis-card */
  .scene-card.analysis-card:nth-child(3) .analysis-list{
    /* 你的自定义样式，比如边框、背景色 */
    padding: 0;
    // border: 2px solid #00AEFF; 
    // background: #F9FCFF;
  }
}
</style>
