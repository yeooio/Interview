<template>
  <div class="choice">
    <div class="page-header" >
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
        <button class="start-button2" @click="routerPlease()">
          免费开始 <span>&nbsp;→</span>
        </button>
      </div>
    </div>
    
    <div class="choice-position">
      <div class="item1">
        <img src="../assets/images/IT3.png" alt="" class="img">
        <div class="click">
          <span>IT领域</span>
          <el-button type="primary" @click="openPositionDialog">
            选择岗位
          </el-button>
        </div>
        
      </div>
      <div class="item2">
        <img src="../assets/images/Component 17.png" alt="" class="img">
        <div class="click">
          <span>法律领域</span>
          <el-button type="primary" @click="openPositionDialog">
            选择岗位
          </el-button>
        </div>
       
      </div>
      <div class="item3">
        <img src="../assets/images/Component 18.png" alt="" class="img">
        <div class="click">
          <span>金融领域</span>
          <el-button type="primary" @click="openPositionDialog">
            选择岗位
          </el-button>
        </div>
       
      </div>
    </div>
    
    <!-- 自定义弹窗替换el-dialog -->
    <div class="custom-dialog" v-show="dialogVisible">
      <div class="dialog-container">
        <div class="dialog-header">
          <div class="nav-steps">
            <div class="step" :class="{ active: currentStep === 1 }">
              1
              <div class="step-label">选择岗位</div>
            </div>
            <div class="step" :class="{ active: currentStep === 2 }">
              2
              <div class="step-label">简历准备</div>
            </div>
            <div class="step">
              3
              <div class="step-label">设备调试</div>
            </div>
          </div>
        </div>
        
        <!-- 步骤1: 岗位选择 -->
        <div class="step-content" :class="{ active: currentStep === 1 }">
          <div class="page-title">
            <h1>选择岗位</h1>
            <p>请选择您要应聘的岗位类型</p>
          </div>
          
          <div class="positions-grid">
            <div 
              v-for="(position, index) in positions" 
              :key="index"
              class="position-btn"
              :class="{ selected: selectedPosition === position }"
              @click="selectPosition(position)"
            >
              {{ position }}
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              class="btn btn-next" 
              @click="goToStep(2)"
              :disabled="!selectedPosition"
            >
              下一步 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        
        <!-- 步骤2: 简历准备 -->
        <div class="step-content" :class="{ active: currentStep === 2 }">
          <div class="page-title">
            <h1>简历准备</h1>
            <p>请选择创建简历的方式，AI智能生成或上传现有简历</p>
          </div>
          
          <div class="resume-options">
            <div 
              class="option-tab" 
              :class="{ active: resumeOption === 'ai' }"
              @click="resumeOption = 'ai'"
            >
              <i class="fas fa-magic"></i>
              <h3>AI智能生成简历</h3>
              <p>根据您的信息自动生成专业简历</p>
            </div>
            <div 
              class="option-tab" 
              :class="{ active: resumeOption === 'upload' }"
              @click="resumeOption = 'upload'"
            >
              <i class="fas fa-file-upload"></i>
              <h3>上传现有简历</h3>
              <p>支持PDF, DOC, DOCX格式 | 最大10MB</p>
            </div>
          </div>
          
          <!-- AI简历生成表单 -->
          <div class="ai-form" v-show="resumeOption === 'ai'">
            <div class="form-header">
              <div class="ai-icon">
                <i class="fas fa-brain"></i>
              </div>
              <h2>AI简历生成器</h2>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label for="position"><i class="fas fa-briefcase"></i> 目标岗位</label>
                <input type="text" id="position" :value="selectedPosition" readonly>
              </div>
              
              <div class="form-group">
                <label for="major"><i class="fas fa-graduation-cap"></i> 专业背景</label>
                <input type="text" id="major" placeholder="例如: 计算机科学与技术" v-model="aiForm.major">
              </div>
              
              <div class="form-group">
                <label for="experience"><i class="fas fa-history"></i> 工作经验</label>
                <select id="experience" v-model="aiForm.experience">
                  <option value="0">应届毕业生</option>
                  <option value="1-3">1-3年</option>
                  <option value="3-5" selected>3-5年</option>
                  <option value="5+">5年以上</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="projects"><i class="fas fa-project-diagram"></i> 项目经历数量</label>
                <select id="projects" v-model="aiForm.projects">
                  <option value="1">1个项目</option>
                  <option value="2" selected>2个项目</option>
                  <option value="3">3个项目</option>
                  <option value="4">4个及以上项目</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="skills"><i class="fas fa-code"></i> 技能专长</label>
              <textarea id="skills" placeholder="请输入您的专业技能，例如: Java, Python, 数据结构与算法, 机器学习..." v-model="aiForm.skills"></textarea>
            </div>
            
            <div class="form-group">
              <label for="certificates"><i class="fas fa-award"></i> 证书与奖项</label>
              <textarea id="certificates" placeholder="请输入您获得的证书或奖项..." v-model="aiForm.certificates"></textarea>
            </div>
            
            <button class="btn btn-generate" @click="generateResume">
              <i class="fas fa-bolt"></i> 生成智能简历
            </button>
            
            <div class="preview-container" v-show="aiPreviewVisible">
              <div class="preview-header">
                <h2>AI生成简历预览</h2>
                <p>AI分析完成度: <span class="ai-score">98%</span></p>
              </div>
              
              <div class="resume-preview">
                <i class="fas fa-file-pdf"></i>
                <h3>{{ resumeFileName }}</h3>
                <p>系统已根据您的信息生成专业简历文档</p>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: aiProgress + '%' }"></div>
                </div>
                <p>简历评分: <strong class="progress-value">{{ aiScore }}分</strong> ({{ aiScore > 85 ? '优秀' : '良好' }})</p>
              </div>
              
              <div class="preview-actions">
                <button class="btn btn-outline" @click="regenerateResume">
                  <i class="fas fa-sync"></i> 重新生成
                </button>
                <button class="btn btn-next" @click="useAIRresume">
                  <i class="fas fa-check"></i> 使用此简历
                </button>
              </div>
            </div>
          </div>
          
          <!-- 简历上传区域 -->
          <div class="upload-area" v-show="resumeOption === 'upload'">
            <div 
              class="drop-area"
              :class="{ 'dragover': dragOver }"
              @dragover.prevent="handleDragOver"
              @dragleave="handleDragLeave"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <i class="fas fa-cloud-upload-alt"></i>
              <h3>拖放简历到此处或点击浏览</h3>
              <p>支持PDF, DOC, DOCX格式 | 最大10MB</p>
            </div>
            
            <input 
              type="file" 
              class="file-input" 
              ref="fileInput"
              multiple 
              @change="handleFileInput"
              accept=".pdf,.doc,.docx"
              style="display: none;"
            >
            
            <div class="file-info" v-if="files.length > 0">
              <div v-for="(file, index) in files" :key="index" class="file-item">
                <div class="file-icon">
                  <i :class="getFileIcon"></i>
                </div>
                <div class="file-info">
                  <div class="file-name">{{ file.name }}</div>
                  <div class="file-size">{{ formatFileSize(file.size) }}</div>
                </div>
                <div class="file-actions">
                  <button class="file-action-btn" @click="removeFile(index)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="status-message" :class="uploadStatus ? uploadStatus.type : ''" v-if="uploadStatus">
              {{ uploadStatus.message }}
            </div>
          </div>
          
          <div class="form-actions">
            <button class="btn btn-prev" @click="goToStep(1)">
              <i class="fas fa-arrow-left"></i> 上一步
            </button>
            <button 
              class="btn btn-next" 
              @click="resumeOption === 'upload' ? uploadFiles() : useAIRresume()"
              :disabled="(resumeOption === 'upload' && files.length === 0) || (resumeOption === 'ai' && !aiResumeReady)"
            >
              进入设备调试 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import service from '@/api/request'
// 上传的文件结构（从File对象转换而来）
interface UploadFile {
  name: string;
  size: number;
  type: string;
}

// 上传状态结构
interface UploadStatus {
  message: string;
  type: string; // 如 'success' | 'error' | 'uploading'
}

// AI表单数据结构
interface AIForm {
  major: string;
  experience: string;
  projects: string;
  skills: string;
  certificates: string;
}







const files = ref<File[]>([]); 
const uploadStatus = ref<UploadStatus | null>(null); // 上传状态
const selectedPosition = ref<string>(''); // 选中的岗位
const aiForm = ref<AIForm>({ // AI表单数据
  major: '',
  experience: '3-5',
  projects: '2',
  skills: 'JavaScript, React, Vue.js, Node.js, HTML5, CSS3',
  certificates: 'Web开发高级工程师认证，2023年全栈开发大赛二等奖'
});
import { useRoute } from 'vue-router'

const route = useRoute()









const router = useRouter()

const dialogVisible = ref(false)
// const selectedPosition = ref('')
const positions = ref([
  '软件工程师', '数据分析师', '系统构建师',
  '数据科学家', '网络工程师', '后端开发师',
  'UI设计师', 'UX设计师', '前端开发师'
])
const currentStep = ref(1)
const dragOver = ref(false)
// const files = ref([])
// const uploadStatus = ref(null)
// const fileInput = ref(null)
const resumeOption = ref('ai') // 'ai' 或 'upload'
const aiPreviewVisible = ref(false)
const aiProgress = ref(0)
const aiScore = ref(92)
const aiResumeReady = ref(false)
const resumeFileName = ref('')

const openPositionDialog = () => {
  dialogVisible.value = true
  currentStep.value = 1
  files.value = []
  uploadStatus.value = null
  aiPreviewVisible.value = false
  aiResumeReady.value = false
}

const selectPosition = (position:string) => {
  selectedPosition.value = position
}

const goToStep = (step:number) => {
  currentStep.value = step
}

const handleDragOver = (e:DragEvent) => {
  e.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const handleDrop = (e:DragEvent) => {
  e.preventDefault()
  dragOver.value = false
  
  const dt = e.dataTransfer
  if (!dt) return; 
  const droppedFiles = Array.from(dt.files) as File[];
  
  if (droppedFiles.length === 0) return
  
  handleFiles(droppedFiles)
}
const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileInput = (e:Event) => {
  const input = e.target as HTMLInputElement; // 断言为输入框
  const selectedFiles = Array.from(input.files ?? []) as File[];
  handleFiles(selectedFiles);
}

const handleFiles = (fileList: File[]) => {
  const validFiles: File[] = []; // 直接存储 File 类型
  fileList.forEach((file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      showStatus(`不支持的文件类型: ${file.name}`, 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showStatus(`文件 "${file.name}" 超过10MB限制`, 'error');
      return;
    }
    validFiles.push(file);
  });
  if (validFiles.length > 0) {
    files.value = [...files.value, ...validFiles];
    showStatus("成功添加简历文件", 'success');
  }
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

// 获取文件图标
const getFileIcon = (fileType: string) => {
  if (fileType === 'application/pdf') return 'fas fa-file-pdf';
  if (fileType.includes('word')) return 'fas fa-file-word';
  return 'fas fa-file';
};


const formatFileSize = (bytes:number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const showStatus = (message:string, type:string) => {
  uploadStatus.value = {
    message,
    type
  }
  
  setTimeout(() => {
    uploadStatus.value = null
  }, 5000)
}

const generateResume = () => {
  // 模拟AI生成简历过程
  aiProgress.value = 0
  aiPreviewVisible.value = false
  
  const interval = setInterval(() => {
    aiProgress.value += Math.floor(Math.random() * 10) + 5
    if (aiProgress.value >= 98) {
      aiProgress.value = 98
      clearInterval(interval)
      
      // 生成简历文件名
      resumeFileName.value = `${selectedPosition.value}_${aiForm.value.major || '简历'}.pdf`
      
      // 显示预览
      setTimeout(() => {
        aiPreviewVisible.value = true
        aiResumeReady.value = true
           console.log("ai",aiPreviewVisible.value);
      }, 300)
   
      
    }
  }, 100)
}

const regenerateResume = () => {
  generateResume()
}

const useAIRresume = () => {
  showStatus("AI简历已准备就绪", 'success')
  
  setTimeout(() => {
    router.push('/Prepare1')
    dialogVisible.value = false
  }, 1500)
}

const uploadFiles = async () => {
  if (files.value.length === 0) {
    showStatus('请先选择简历文件', 'error')
    return
  }
  
  const file = files.value[0]
  
  
    const formData = new FormData()
    formData.append('file', file, file.name)
    
    // 显示上传中状态
    showStatus('文件上传中，请稍候...', 'uploading')
    
    // // 发送文件上传请求
    // const response = await service({
    //   url: '/customer/resume/upload',
    //   method: 'POST',
    //   data: formData,
    //   headers: {} 
    // })

    await new Promise((resolve) => setTimeout(resolve, 2500));
     // 显示上传成功状态
    showStatus('文件上传成功！', 'success');
    
    // 添加视觉反馈后跳转
    setTimeout(() => {
      router.push('/Prepare1');
      dialogVisible.value = false;
    }, 800); // 800ms后跳转让用户看到成功提示
    // 处理响应

}  

const navigateTo = (page:string) => {
  console.log(`Navigating to ${page}`)
}

const routerPlease = () => {
  router.push('/Prepare1')
}
</script>

<style lang="scss" scoped>
/* 原有样式保持不变 */
.choice{
  width: 99vw;
  // height: 3000px;
  height: 100vh;

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
    background-color: #d9d9d9;
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
img.img {
    width: 100%;
}
.item1{
.click{
 position: absolute;
 width: 500px;
 font-size: 35px;
 color:white;
 top: 160px;
 right: 20px;
 display: flex;
 justify-content: space-around;
 align-items: center;
 

}}
.item2{
      position: relative;
.click{
 position: absolute;
 width: 500px;
 font-size: 35px;
 color:white;
 top: 80px;
 right: 20px;
 display: flex;
 justify-content: space-around;
 align-items: center;
 

}}
.item3{
      position: relative;
.click{
 position: absolute;
 width: 500px;
 font-size: 35px;
 color:white;
 top: 80px;
 right: 20px;
 display: flex;
 justify-content: space-around;
 align-items: center;
 

}}

.selected-position {
  position: absolute;
  top: 30px;
  left: 30px;
  background: linear-gradient(45deg, #1a2980, #26d0ce);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 22px;
  font-weight: bold;
  box-shadow: 0 5px 20px rgba(26, 41, 128, 0.4);
  animation: fadeIn 0.5s ease;
  z-index: 10;
}

/* 自定义弹窗样式 */
.custom-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 60%;
  max-width: 2000px;
  // height: 3000px !important;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
}

.dialog-header {
  background: linear-gradient(90deg, #2c3e50, #3498db);
  color: white;
  padding: 20px 30px;
}

.nav-steps {
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 5px;
  font-size: 14px;
}

.step {
  padding: 8px 25px;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  min-width: 120px;
  color: rgba(255, 255, 255, 0.7);
}

.step.active {
  background: white;
  color: #2c3e50;
  font-weight: 600;
}

.step-label {
  font-size: 12px;
  opacity: 0.9;
  margin-top: 3px;
}

.step-content {
  display: none;
  padding: 30px;
}

.step-content.active {
  display: block;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.page-title h1 {
  font-size: 28px;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.page-title h1:after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #3498db;
  border-radius: 2px;
}

.page-title p {
  margin-top: 15px;
  color: #555;
  font-size: 16px;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 30px 0;
}

.position-btn {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.position-btn:hover {
  transform: translateY(-3px);
  border-color: #3498db;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.position-btn.selected {
  border-color: #3498db;
  background: #e3f2fd;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  position: relative;
}

.position-btn.selected:after {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resume-options {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.option-tab {
  flex: 1;
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.option-tab:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.option-tab.active {
  border-color: #3498db;
  background: #e3f2fd;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.option-tab i {
  font-size: 36px;
  margin-bottom: 15px;
  color: #3498db;
}

.option-tab h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.option-tab p {
  color: #6c757d;
  font-size: 14px;
}

.ai-form {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.ai-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
}

.form-header h2 {
  color: #2c3e50;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.form-group input, 
.form-group select, 
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-group input:focus, 
.form-group select:focus, 
.form-group textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-prev {
  background: #e9ecef;
  color: #495057;
}

.btn-prev:hover {
  background: #dee2e6;
}

.btn-next {
  background: linear-gradient(90deg, #3498db, #2c3e50);
  color: white;
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.4);
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(52, 152, 219, 0.5);
}

.btn-next:disabled {
  background: #cccccc;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
  opacity: 0.7;
}

.btn-generate {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
  color: white;
  padding: 15px 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto;
}

.btn-generate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(231, 76, 60, 0.4);
}

.preview-container {
  margin-top: 30px;
  text-align: center;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.resume-preview {
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border: 2px dashed #ced4da;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.resume-preview i {
  font-size: 48px;
  color: #3498db;
  margin-bottom: 20px;
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.btn-outline {
  background: transparent;
  border: 2px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

.upload-area {
  text-align: center;
  padding: 40px 20px;
  border: 2px dashed #ced4da;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.upload-area.dragover {
  border-color: #3498db;
  background: #e3f2fd;
}

.upload-area i {
  font-size: 48px;
  color: #3498db;
  margin-bottom: 20px;
}

.upload-area h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.upload-area p {
  color: #6c757d;
  margin-bottom: 20px;
}

.file-browse {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.file-browse:hover {
  background: #2c3e50;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #3498db, #2c3e50);
  border-radius: 4px;
  transition: width 1s ease;
}

.progress-value {
  font-weight: 600;
  color: #3498db;
}

.file-info {
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 10px;
  background: #f8f9ff;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.file-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4776E6, #8E54E9);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: 1.2rem;
  color: white;
}

.file-name {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 4px;
  word-break: break-all;
}

.file-size {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.file-actions {
  display: flex;
}

.file-action-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f1f3f9;
  border: none;
  color: #e74c3c;
  
  &:hover {
    background-color: #e74c3c;
    color: white;
  }
}

.status-message {
  margin-top: 15px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  
  &.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  &.uploading {
    background-color: #cce5ff;
    color: #004085;
  }
}

/* 响应式设计 */
@media (max-width: 900px) {
  .positions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .resume-options {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .step {
    padding: 8px 15px;
    min-width: 100px;
    font-size: 12px;
  }
  
  .positions-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .step-label {
    font-size: 10px;
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  .dialog-container {
    width: 95%;
  }
}

/* 原有样式保持不变 */
.fixed-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%; /* 确保导航栏宽度占满屏幕 */
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
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



 .step-content {
            display: none;
        }
        
        .step-content.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* 岗位选择网格 */
        .positions-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 30px 0;
        }
        
        .position-btn {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px 10px;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }
        
        .position-btn:hover {
            transform: translateY(-3px);
            border-color: #3498db;
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
        }
        
        .position-btn.selected {
            border-color: #3498db;
            background: #e3f2fd;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
            position: relative;
        }
        
        .position-btn.selected:after {
            content: "\f00c";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            position: absolute;
            top: 5px;
            right: 5px;
            width: 22px;
            height: 22px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* 简历选项样式 */
        .resume-options {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .option-tab {
            flex: 1;
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid #e9ecef;
        }
        
        .option-tab:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .option-tab.active {
            border-color: #3498db;
            background: #e3f2fd;
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
        }
        
        .option-tab i {
            font-size: 36px;
            margin-bottom: 15px;
            color: #3498db;
        }
        
        .option-tab h3 {
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        .option-tab p {
            color: #6c757d;
            font-size: 14px;
        }
        
        /* AI简历表单样式 */
        .ai-form {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #e9ecef;
            display: none;
        }
        
        .ai-form.active {
            display: block;
        }
        
        .form-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .ai-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #3498db, #2c3e50);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
        }
        
        .form-header h2 {
            color: #2c3e50;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #495057;
        }
        
        .form-group input, 
        .form-group select, 
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ced4da;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
            outline: none;
        }
        
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        /* 操作按钮 */
        .form-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
        }
        
        .btn {
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-prev {
            background: #e9ecef;
            color: #495057;
        }
        
        .btn-prev:hover {
            background: #dee2e6;
        }
        
        .btn-next {
            background: linear-gradient(90deg, #3498db, #2c3e50);
            color: white;
            box-shadow: 0 4px 10px rgba(52, 152, 219, 0.4);
        }
        
        .btn-next:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(52, 152, 219, 0.5);
        }
        
        .btn-next:disabled {
            background: #cccccc;
            box-shadow: none;
            cursor: not-allowed;
            transform: none;
            opacity: 0.7;
        }
        
        .btn-generate {
            background: linear-gradient(90deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px 40px;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 20px auto;
        }
        
        .btn-generate:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(231, 76, 60, 0.4);
        }
        
        /* 简历预览样式 */
        .preview-container {
            display: block;
            margin-top: 30px;
            text-align: center;
            // height: 1000px;
        }
        
        .preview-container.active {
            display: block;
        }
        
        .preview-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .resume-preview {
            width: 100%;
            height: 400px;
            background: #f8f9fa;
            border: 2px dashed #ced4da;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 30px;
        }
        
        .resume-preview i {
            font-size: 48px;
            color: #3498db;
            margin-bottom: 20px;
        }
        
        .preview-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 25px;
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid #3498db;
            color: #3498db;
        }
        
        .btn-outline:hover {
            background: #3498db;
            color: white;
        }
        
        /* 文件上传区域 */
        .upload-area {
            display: none;
            text-align: center;
            padding: 40px 20px;
            border: 2px dashed #ced4da;
            border-radius: 12px;
            background: #f8f9fa;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .upload-area.active {
            display: block;
        }
        
        .upload-area.dragover {
            border-color: #3498db;
            background: #e3f2fd;
        }
        
        .upload-area i {
            font-size: 48px;
            color: #3498db;
            margin-bottom: 20px;
        }
        
        .upload-area h3 {
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        .upload-area p {
            color: #6c757d;
            margin-bottom: 20px;
        }
        
        .file-browse {
            display: inline-block;
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .file-browse:hover {
            background: #2c3e50;
        }
        
        /* 进度条 */
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background: linear-gradient(to right, #3498db, #2c3e50);
            border-radius: 4px;
            transition: width 1s ease;
        }
        
        .progress-value {
            font-weight: 600;
            color: #3498db;
        }
        
        footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            color: #6c757d;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }
        
        /* 响应式设计 */
        @media (max-width: 900px) {
            .positions-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .resume-options {
                flex-direction: column;
            }
        }
        
        @media (max-width: 600px) {
            .step {
                padding: 8px 15px;
                min-width: 100px;
            }
            
            .positions-grid {
                grid-template-columns: 1fr;
            }
            
            .form-grid {
                grid-template-columns: 1fr;
            }
            
            .step {
                font-size: 14px;
            }
            
            .logo-text {
                font-size: 20px;
            }
        }
        
/* 调整表单网格布局 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

/* 调整预览容器高度 */
.preview-container {
  margin-top: 20px;
  // max-height: 00px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 调整上传区域高度 */
.upload-area {
  max-height: 400px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 调整文件信息区域 */
.file-info {
  max-height: 200px;
  overflow-y: auto;
}

/* 调整操作按钮位置 */
.form-actions {
  margin-top: auto;
  padding-top: 20px;
}

/* 添加弹性布局到AI表单 */
.ai-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 添加弹性布局到上传区域 */
.upload-area {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 调整下拉菜单高度 */
select {
  height: 44px;
}

/* 调整文本区域高度 */
textarea {
  min-height: 100px;
  max-height: 150px;
}

/* 调整岗位网格高度 */
.positions-grid {
  max-height: 300px;
  overflow-y: auto;
}

/* 调整响应式设计 */
@media (max-width: 900px) {
  .dialog-container {
    width: 95%;
    max-height: 95vh;
  }
  
  .positions-grid {
    grid-template-columns: repeat(2, 1fr);
    max-height: 400px;
  }
  
  .resume-options {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .step {
    padding: 8px 15px;
    min-width: 100px;
    font-size: 12px;
  }
  
  .positions-grid {
    grid-template-columns: 1fr;
    max-height: 500px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .step-label {
    font-size: 10px;
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  .dialog-container {
    width: 98%;
    max-height: 98vh;
  }
  
  .step-content {
    padding: 15px;
  }
}

/* 添加平滑过渡效果 */
.step-content {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-header .header-left{
  background-color: white !important;
}
</style>