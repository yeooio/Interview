<template>
  <div class="prepare-page">

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
          :class="{ active: $route.path === '/Choice' }"
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
          :class="{ active: $route.path === '/Interview' }"
          
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
              <el-option label="8" value="5"></el-option>
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
        <img src="../assets/images/Component 11.png" alt="">
          <div v-if="!authorized1" @click="authorized1 = true">
        <el-button type="primary" size="mini">授权</el-button>
      </div>
      <!-- 授权后的效果 -->
      <div v-else class="authorized-icon">
        <el-icon><el-icon-check /></el-icon>
      </div>
        </div>
        <div class="device-item">
   <img src="../assets/images/Component 12.png" alt="">
          <div v-if="!authorized2" @click="authorized2 = true">
        <el-button type="primary" size="mini">授权</el-button>
      </div>
      <div v-else class="authorized-icon">
        <el-icon><el-icon-check /></el-icon>
      </div>
        </div>
      </div>
      <!-- 开始面试按钮 -->
      <el-button type="primary" class="start-btn"  @click="showGuideDialog = true">开始面试</el-button>
    </div>
  </div>
   <el-dialog
    v-model="showGuideDialog"
    title="准备开始面试"
    width="500px"
    center>
    <span>您需要先查看备战指南吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="navigateToGuide">查看备战指南</el-button>
        <el-button @click="startInterview">直接开始面试</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import service from '@/api/request'; // 导入axios实例
import { Check as ElIconCheck } from '@element-plus/icons-vue';
// import { ElMessage, ElMessageBox } from 'element-plus';

// ...原有响应式变量...
const showGuideDialog = ref(false); // 新增：控制对话框显示

// ...原有表单和方法...

// 新增对话框处理方法
const navigateToGuide = () => {
  showGuideDialog.value = false;
  router.push('/guide'); // 假设你的备战指南路由路径是/guide
};
// 添加授权状态变量（新增）
const authorized1 = ref(false);
const authorized2 = ref(false);


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
    showGuideDialog.value = false;
  try {
    loading.value = true; // 显示加载状态
    
    // 准备请求参数
    const params = {
      duration: parseInt(form.duration),
      difficulty: form.difficulty,
      questionCount: parseInt(form.questionCount),
      language: form.language
    };
    router.push('/interview')
    // 发送开始面试请求
    const response = await service.post('/customer/interview/begin');
    console.log(response);
    
    // gaizhe


    
    // 检查响应状态
    if  (response && response.data.code === 200){
      // 跳转到面试页面 - 这是关键跳转代码
      router.push({ name: 'Interview' });
    } else {
      // throw new Error(response?.message || '未知错误');
    }
  } catch (error) {
    console.error('开始面试失败:', error);
    // ElMessage.error(`开始面试失败: ${error.message || '请检查网络连接'}`);
  } finally {
    loading.value = false; // 关闭加载状态
  }
};
</script>
<style scoped lang="scss">
.prepare-page{
  width: 99vw;
  height: 100%;
  position: relative;
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
    margin-left: 120px;
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



.step-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
}

/* 授权图标样式（新增） */
.authorized-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #00aeff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.authorized-icon .el-icon {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* 调整步骤描述样式 */
.step-desc {
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
}

/* 设备列表样式微调 */
.device-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.interview-simulation-section {
  // margin-top: 20px;
  // padding-top: 20px;
  display: flex;
  gap: 40px;
  box-sizing: border-box;
  padding:30px 100px;
  /* background-color: #f5f5f5; */
  background-color:red;
  // width: 1;
  // height: ;
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
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-sizing:border-box;
  align-items: flex-start;
}
.video-placeholder {
  width:510px;
  height: 244px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 5px;
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
  width: 490px;
  background-color: #fff;
  padding: 25px 10px 20px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}
.form-card{
  width: 470px;

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
  width:440px;
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
  //  margin-left: 20px !important;
  // padding-left: 20px;

  }
}
.authorized-icon{
  width: 60px;
  height: 29px;
  .el-icon {
    font-size: 20vw;
    width: 25px!important;
  }
}
.start-btn {
  /* align-self: flex-start; */
  /* padding: 10px 40px; */
  font-size: 16px;
  width:495px;
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
#app{
  height: 100vh ;
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


</style>