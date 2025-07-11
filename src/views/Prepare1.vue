<template>
  <div class="interview-simulation-section">
    <!-- 左侧模拟面试说明区域 -->
     
    <div class="simulation-info">
      <div class="video-placeholder"></div>
      <h1 class="section-title">模拟面试</h1>
      <!-- <p class="desc"> -->
        <div class='desc'>
        模拟面试将由 A 担任面试官向你进行提问，模拟一次完整的面试过程。期间，AI 面试助手会同时生成面试回答，供你参考。</div>
      <!-- </p> -->
    
          <span class="step-icon">✔面试配置</span>
          <span class="step-desc">首先，请按需配置这次的模拟面试的时长、风格、内容等；</span>
      
          <span class="step-icon">✔设备测试</span>
          <span class="step-desc">然后，进行「设备测试」，确保设备正常，AI 才能正常运行。若设备测试失败请更换设备或多次尝试直至成功。</span>
      
          <span class="step-icon">✔开始面试</span>
          <span class="step-desc">最后，设备测试成功后即可开始面试</span>
       
    </div>
    <!-- 右侧表单及操作区域 -->
    <div class="simulation-form">
      <!-- 面试配置表单 -->
      <div class="form-card">
        <el-form :model="form" label-width="120px">
          <el-form-item label="面试时长（分钟）：">
            <el-select v-model="form.duration" placeholder="请选择">
              <el-option label="10分钟" value="10"></el-option>
              <el-option label="15分钟" value="15"></el-option>
              <el-option label="20分钟" value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试难度：">
            <el-select v-model="form.difficulty" placeholder="请选择">
              <el-option label="难" value="难"></el-option>
              <el-option label="中等" value="中等"></el-option>
              <el-option label="易" value="易"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试题数：">
            <el-select v-model="form.questionCount" placeholder="请选择">
              <el-option label="3" value="3"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试语言：">
            <el-select v-model="form.language" placeholder="请选择">
              <el-option label="中文" value="中文"></el-option>
              <el-option label="英文" value="英文"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 设备授权区域 -->
      <div class="device-card">
        <h3 class="card-subtitle">你的设备</h3>
        <div class="device-item">
          <span>Design-studio</span>
          <el-button type="primary" size="mini">授权</el-button>
        </div>
        <div class="device-item">
          <span>Design-studio114514</span>
          <el-button type="primary" size="mini">授权</el-button>
        </div>
      </div>
      <!-- 开始面试按钮 -->
      <el-button type="primary" class="start-btn" @click="this.$router.push('/interview')">开始面试</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import service from '@/api/request'; // 导入axios实例

const form = reactive({
  duration: '10',
  difficulty: '难',
  questionCount: '3',
  language: '中文'
});

const router = useRouter();
const loading = ref(false); // 按钮加载状态

// 开始面试请求
const startInterview = async () => {
  try {
    loading.value = true; // 显示加载状态
    
    // 准备请求参数
    const params = {
      duration: parseInt(form.duration),
      difficulty: form.difficulty,
      questionCount: parseInt(form.questionCount),
      language: form.language
    };
    
    // 发送开始面试请求
    const response = await service.post('/customer/interview/begin', params);
    // gaizhe


    
    // 检查响应状态
    if (response && response.code === 200) {
      // 跳转到面试页面 - 这是关键跳转代码
      router.push({ name: 'Interview' });
    } else {
      throw new Error(response?.message || '未知错误');
    }
  } catch (error) {
    console.error('开始面试失败:', error);
    ElMessage.error(`开始面试失败: ${error.message || '请检查网络连接'}`);
  } finally {
    loading.value = false; // 关闭加载状态
  }
};
</script>
<style scoped>
.interview-simulation-section {
  display: flex;
  gap: 40px;
  box-sizing: border-box;
  padding: 0 100px;
  /* background-color: #f5f5f5; */
  background-color:red;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
  /* background-color:blue; */
  background-color:#f5f5f5;
}
/* 左侧模拟面试说明 */
.simulation-info {
  width: 569px;
  /* height: 725px; */
  background-color: #00aeff;
  color: #fff;
  padding: 20px 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-sizing:border-box;
  align-items: flex-start;
}
.video-placeholder {
  width:487px;
  height: 244px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}
.section-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
}
.desc {
  /* line-height: 1.6;
  margin-bottom: 20px; */
  font-size:12px;
  text-align:left;
  /* margin-bottom20px */
  margin-bottom:20px;
  
}
.steps {
  list-style: none;
  padding: 0;
  margin: 0;
}
.steps li {
  margin-bottom: 10px;
  line-height: 1.6;
}
.step-icon {
  /* font-weight: bold; */
  margin-right: 5px;
  font-size:24px;
}
.step-desc {
  display: block;
  text-align:left;
  font-size:12px;
  /* display:flex; */
  /* gap:px; */
  margin:10px;
  box-sizing:border-box;
}
/* 右侧表单及操作 */
.simulation-form {
  width: 512px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.el-form{
  display:flex;
  flex-direction:column;
  /* align-items:flex-start */
  gap:10px
}
.form-card,
.device-card {
  background-color: #fff;
  padding: 20px 0px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.device-card{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:10px;
  box-sizing:border-box;
  padding:10px 20px;

}
.card-subtitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color:#716E75;
  margin:0;
}
.device-item {
  width:100%;
  box-sizing:border-box;
  /* padding:0 20px; */
  color:#716E75;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .el-button{
    background-color:white;
    font-size:16px;
    color:#1198FF;
    border:1px solid #1198FF;
   /* width:32px; */

  }
}
.start-btn {
  /* align-self: flex-start; */
  /* padding: 10px 40px; */
  font-size: 16px;
  width:px;
  /* background-color: */
  background: #00AEFF;
  height:63px;

}
:deep(.el-form-item__label){
  /* width:90px !important; */
  font-size:20px;
  font-weight:bold;
  width:240px !important;
  display:flex;
  /* flex-direction: */
  justify-content:flex-start;
  box-sizing:border-box;
  padding-left:15px;
  
}
:deep(.el-select){
  width:200px;
  box-sizing:border-box;
  padding-left:10px;
}
:deep(.el-form-item){
  display:flex;
  justify-content:space-between;
}

:deep(.el-select__wrapper){
  background: #F3F5F6;

}
</style>