<template>
  <div class="choice">
    <div class="page-header">
      <div class="header-left"></div>
      <div class="header-nav">
        <span class="nav-item" @click="navigateTo('home')">我的报告</span>
        <span class="nav-item" @click="navigateTo('learning')">学习中心</span>
        <button>开始面试</button>
        <img src="../assets/images/avator.png" alt="" />
      </div>
    </div>
    
    <div class="choice-position">
      <div class="item">
        <img src="../assets/images/IT3.png" alt="" class="img">
        <div class="click">
          <span>IT领域</span>
          <el-button type="primary" @click="openPositionDialog">
            选择岗位
          </el-button>
        </div>
        <transition name="fade">
          <div v-if="selectedPosition" class="selected-position">
            已选择: {{ selectedPosition }}
          </div>
        </transition>
      </div>
    </div>
    
    <el-dialog 
      v-model="dialogVisible" 
      class="position-dialog"
      :show-close="false"
      :close-on-click-modal="false"
      width="650px"
    >
      <div class="dialog-header">
        {{ currentStep === 1 ? '选择岗位' : '上传简历' }}
      </div>
      
      <div class="step-indicator">
        <div class="step" :class="{ active: currentStep === 1 }">
          1
          <span class="step-text">选择岗位</span>
        </div>
        <div class="step" :class="{ active: currentStep === 2 }">
          2
          <span class="step-text">上传简历</span>
        </div>
      </div>
      
      <div v-if="currentStep === 1" class="position-container">
        <div 
          v-for="(position, index) in positions" 
          :key="index"
          class="position-item"
          :class="{ selected: selectedPosition === position }"
          @click="selectPosition(position)"
        >
          {{ position }}
        </div>
      </div>
      
      <div v-else class="resume-section">
        <div 
          class="drop-area"
          :class="{ 'drag-over': dragOver }"
          @dragover.prevent="handleDragOver"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <i class="fas fa-cloud-upload-alt"></i>
          <h3>拖放简历到此处</h3>
          <p>支持PDF, DOC, DOCX格式 | 最大10MB</p>
        </div>
        
        <input 
          type="file" 
          class="file-input" 
          ref="fileInput"
          multiple 
          @change="handleFileInput"
        >
        
        <div class="file-list" v-if="files.length > 0">
          <div v-for="(file, index) in files" :key="index" class="file-item">
            <div class="file-icon">
              <i :class="getFileIcon(file.type)"></i>
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
      
      <div class="dialog-footer">
        <el-button 
          v-if="currentStep === 1" 
          class="confirm-btn" 
         @click="goToStep(2); handleNextStep()"
          
          :disabled="!selectedPosition"
        >
          下一步
        </el-button>
        
        <div v-else class="step-buttons">
          <el-button class="back-btn" @click="goToStep(1)">
            上一步
          </el-button>
          <el-button 
            class="confirm-btn" 
            @click="uploadFiles" 

            :disabled="files.length === 0"
          >
            进入设备调试
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const dialogVisible = ref(false)
const selectedPosition = ref('')
const positions = ref([
  '软件工程师', '数据分析师', '系统构建师',
  '数据科学家', '网络工程师', '后端开发师',
  'UI设计师', 'UX设计师', '前端开发师'
])
const currentStep = ref(1)
const dragOver = ref(false)
const files = ref([])
const uploadStatus = ref(null)
const fileInput = ref(null)

const openPositionDialog = () => {
  dialogVisible.value = true
  currentStep.value = 1
  files.value = []
  uploadStatus.value = null
}

const selectPosition = (position) => {
  selectedPosition.value = position
}

const goToStep = (step) => {
  currentStep.value = step
}

const handleDragOver = (e) => {
  e.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  dragOver.value = false
  
  const dt = e.dataTransfer
  const droppedFiles = Array.from(dt.files)
  
  if (droppedFiles.length === 0) return
  
  handleFiles(droppedFiles)
}

const triggerFileInput = () => {
  fileInput.value.click()
}
import { useRouter } from 'vue-router';
const router = useRouter()

const handleFileInput = (e) => {
  const selectedFiles = Array.from(e.target.files)
  
  if (selectedFiles.length === 0) return
  
  handleFiles(selectedFiles)
}

const handleFiles = (fileList) => {
  let validFiles = []
  
  fileList.forEach(file => {
    // 检查文件类型
    const validTypes = ['application/pdf', 'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    if (!validTypes.includes(file.type)) {
      showStatus(`不支持的文件类型: ${file.name}`, 'error')
      return
    }
    
    // 检查文件大小
    if (file.size > 10 * 1024 * 1024) {
      showStatus(`文件 "${file.name}" 超过10MB限制`, 'error')
      return
    }
    
    validFiles.push(file)
  })
  
  if (validFiles.length > 0) {
    files.value = [...files.value, ...validFiles]
    
  setTimeout(() => {
    showStatus("成功上传简历", 'success')
    
    // 清空文件列表
    setTimeout(() => {
      // files.value = []
      // dialogVisible.value = false
router.push('/Prepare1')
    }, 2000)
  }, 1500)
  }
}

const removeFile = (index) => {
  files.value.splice(index, 1)
}

const getFileIcon = (fileType) => {
  if (fileType === 'application/pdf') return 'fas fa-file-pdf'
  if (fileType.includes('word')) return 'fas fa-file-word'
  return 'fas fa-file'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const showStatus = (message, type) => {
  uploadStatus.value = {
    message,
    type
  }
  
  setTimeout(() => {
    uploadStatus.value = null
  }, 5000)
}


const navigateTo = (page) => {
  console.log(`Navigating to ${page}`)
}



// import { ref } from 'vue'
import { getCareerByRegionId } from '@/api/request' // 根据您的请求环境配置调整导入路径
// import { log } from 'console'

// 创建ref来存储regionId
const careerIdRef = ref(null)

// 处理下一步点击事件
const handleNextStep = async () => {
  try {
    // 这里假设您已有一个regionId值，如果没有请替换为实际值
    const regionId = "1" // 替换为您的实际regionId
    
    // 发送请求获取岗位数据
    const response = await getCareerByRegionId({
      regionId: regionId,
      _t: Date.now() 
    })
console.log(123);
console.log(response);


    if (response.code === 0) {
      console.log(666);
      console.log(response);
      
      console.log();
      
      // 存储regionId到ref.value
      // 注意：根据响应数据结构，regionId在返回的每个岗位对象中
      // 这里取第一个岗位的regionId作为示例，您可以根据实际需求调整
      if (response.data && response.data.length > 0) {
        careerIdRef.value = response.data[0].careerId
        console.log('存储的regionId:', regionIdRef.value)
      }
      
      // 其他处理逻辑...
    } else {
      console.error('请求失败:', response.msg)
    }
  } catch (error) {
    console.error('请求出错:', error)
  }
}



import service from '@/api/request' // 导入请求服务

// ... 其他代码保持不变 ...

// 文件上传相关逻辑
const uploadFiles = async () => {
  // 调试：检查 files.value 是否有效
  console.log('原始 files.value:', files.value)
  
  if (!files.value || files.value.length === 0) {
    showStatus('请先选择简历文件', 'error')
    return
  }
  
  // 调试：检查文件对象属性
  const file = files.value[0]
  console.log('文件对象类型:', typeof file)
  console.log('是否为 File 实例:', file instanceof File)
  console.log('文件名称:', file.name)
  console.log('文件大小:', file.size, '字节')
  console.log('文件类型:', file.type)
  
  if (!file.name || !file.size) {
    showStatus('无效的文件对象', 'error')
    return
  }
  
  try {
    const formData = new FormData()
    
    // 尝试不同的 append 方式
    formData.append('file', file, file.name)
    
    // 深度调试：使用 getAll 方法检查
    console.log('FormData 包含的键:', [...formData.keys()])
    console.log('名为 "file" 的值数量:', formData.getAll('file').length)
    
    // 使用 Blob 大小验证
    const formDataSize = await new Promise(resolve => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result.byteLength)
      reader.readAsArrayBuffer(formData.get('file'))
    })
    console.log('上传文件大小:', formDataSize, '字节')
    
    // 关键修复：使用立即执行函数强制同步执行
    (() => {
      console.log('同步验证 FormData:')
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value.name || value}`)
      }
    })()
    
    // 上传前验证
    if (formData.getAll('file').length === 0) {
      throw new Error('FormData 不包含文件')
    }
    
    // 显示上传中状态
    uploadStatus.value = {
      message: '文件上传中，请稍候...',
      type: 'uploading'
    }
    
    // 创建面试记录
    const recordResponse = await service({
      url: '/customer/record/add',
      method: 'POST',
      params: { careerId: 21 },
      data: {}
    })
    
    // 发送文件上传请求
    const response = await service({
      url: '/customer/resume/upload',
      method: 'POST',
      data: formData,
      // 确保不设置 Content-Type，让浏览器自动处理
      headers: {} 
    })
    
    // 处理响应
    if (response.code === 0) {
      uploadStatus.value = {
        message: '文件上传成功！',
        type: 'success'
      }
    } else {
      uploadStatus.value = {
        message: `上传失败: ${response.msg}`,
        type: 'error'
      }
    }
  } catch (error) {
    console.error('文件上传错误:', error)
    uploadStatus.value = {
      message: `上传失败: ${error.message || '未知错误'}`,
      type: 'error'
    }
  }
}  

</script>

<style lang="scss" scoped>
.choice{
  width: 99vw;
  height: 100vh;
}
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
    color:black;
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
  .item{
    margin-top: 40px;
    width: 100%;
    height: 100%;
    position: relative;

  }
}
img.img {
    width: 100%;
}
.click{
 position: absolute;
 width: 500px;
 font-size: 35px;
 color:white;
 top: 150px;
 right: 20px;
 display: flex;
 justify-content: space-around;
 align-items: center;
}
// 弹窗样式
.position-dialog {
  border-radius: 20px;
  
  .dialog-header {
    background: linear-gradient(90deg, #1a2980, #26d0ce);
    color: white;
    padding: 25px;
    font-size: 28px;
    text-align: center;
  }
}

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

.position-dialog {
  border-radius: 20px !important;
  overflow: hidden;
  
  .dialog-header {
    background: linear-gradient(90deg, #1a2980, #26d0ce);
    color: white;
    padding: 25px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
  }
}

.step-indicator {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  position: relative;
}

.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  font-size: 20px;
  
  &.active {
    background: linear-gradient(135deg, #1a2980, #26d0ce);
    color: white;
    box-shadow: 0 5px 15px rgba(26, 41, 128, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 4px;
    background: #e0e0e0;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    z-index: 1;
  }
  
  &:last-child::before {
    display: none;
  }
}

.step-text {
  position: absolute;
  top: 45px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: normal;
  color: #7f8c8d;
}

.position-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 30px;
  background-color: white;
  
  .position-item {
    height: 80px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    background-color: #f8f9fa;
    border: 2px solid #e0e3ff;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      border-color: #00aeff;
    }
    
    &.selected {
      background: linear-gradient(135deg, #1a2980, #26d0ce);
      color: white;
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(26, 41, 128, 0.3);
      border-color: #1a2980;
    }
  }
}



// 

.resume-section {
  padding: 10px 30px 20px;
}

.drop-area {
  width: 100%;
  height: 200px;
  border: 3px dashed #4776E6;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8f9ff;
  margin-bottom: 25px;
  
  &.drag-over {
    background-color: #eef2ff;
    border-color: #8E54E9;
    transform: translateY(-3px);
  }
  
  i {
    font-size: 4rem;
    color: #4776E6;
    margin-bottom: 15px;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    color: #7f8c8d;
    font-size: 1rem;
    text-align: center;
    max-width: 80%;
  }
}

.file-input {
  display: none;
}

.file-list {
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

.file-info {
  flex: 1;
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
}

.dialog-footer {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #eee;
  
  .step-buttons {
    display: flex;
    gap: 20px;
  }
  
  .back-btn {
    width: 180px;
    height: 60px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 12px;
    background: #bdc3c7;
    color: white;
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: #95a5a6;
      transform: translateY(-3px);
    }
  }
  
  .confirm-btn {
    width: 200px;
    height: 60px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 12px;
    background: linear-gradient(45deg, #00aeff, #00c6ff);
    color: white;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 174, 255, 0.4);
    
    &:hover:not(:disabled) {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px rgba(0, 174, 255, 0.5);
    }
    
    &:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-header {
    padding: 0 20px;
    
    .header-nav {
      gap: 15px;
      
      .nav-item {
        font-size: 16px;
        padding: 6px 12px;
      }
      
      button {
        width: 120px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
  
  .click {
    width: 100%;
    right: 0;
    padding: 15px;
    bottom: 20px;
    border-radius: 0;
    
    span {
      font-size: 24px;
    }
    
    .el-button {
      width: 160px;
      height: 50px;
      font-size: 18px;
    }
  }
  
  .position-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 20px;
    
    .position-item {
      height: 70px;
      font-size: 18px;
    }
  }
  
  .dialog-header {
    padding: 15px;
    font-size: 22px;
  }
  
  .step {
    width: 35px;
    height: 35px;
    margin: 0 20px;
    font-size: 18px;
    
    &::before {
      width: 40px;
    }
  }
  
  .step-text {
    font-size: 14px;
  }
  
  .drop-area {
    height: 180px;
    
    i {
      font-size: 3.5rem;
    }
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  .dialog-footer {
    .back-btn, .confirm-btn {
      width: 160px;
      height: 50px;
      font-size: 18px;
    }
  }
}





</style>