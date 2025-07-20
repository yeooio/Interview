import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
// import {interview} from './api'; 
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.config.globalProperties.$api = api;
app.use(ElementPlus);
app.use(router);
app.mount('#app');

// createApp(App).mount('#app')
// .page-header {
//   display: flex;
//   align-items: center;
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0 8px 30px rgba(0, 0, 100, 0.1);
//   padding: 0 25px;
//   height: 80px;
//   position: relative;
//   overflow: hidden;
//   transition: all 0.3s ease;
// }

// .page-header:hover {
//   box-shadow: 0 10px 40px rgba(0, 80, 200, 0.15);
// }

// .header-left {
//   display: flex;
//   align-items: center;
//   margin-right: 40px;
// }

// .logo {
//   display: flex;
//   align-items: center;
//   font-weight: 700;
//   font-size: 24px;
//   color: #2563eb;
//   text-decoration: none;
// }

// .logo-icon {
//   margin-right: 12px;
//   font-size: 28px;
//   color: #3b82f6;
// }

// .logo-text {
//   position: relative;
//   top: -2px;
// }

// .logo-text span {
//   color: #0ea5e9;
// }

// .header-nav {
//   display: flex;
//   flex: 1;
//   height: 100%;
//   align-items: center;
// }

// .nav-items {
//   display: flex;
//   height: 100%;
// }

// .nav-item {
//   display: flex;
//   align-items: center;
//   padding: 0 18px;
//   height: 100%;
//   font-weight: 600;
//   font-size: 16px;
//   color: #4b5563;
//   cursor: pointer;
//   position: relative;
//   transition: all 0.2s ease;
// }

// .nav-item:hover {
//   color: #2563eb;
// }

// .nav-item:hover::after {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   left: 18px;
//   right: 18px;
//   height: 3px;
//   background: #3b82f6;
//   border-radius: 10px 10px 0 0;
// }

// .nav-item.active {
//   color: #00aeff;
// }

// .nav-item.active::after {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   left: 18px;
//   right: 18px;
//   height: 3px;
//   background: #00aeff;
//   border-radius: 10px 10px 0 0;
// }

// .nav-item i {
//   margin-right: 8px;
//   font-size: 18px;
// }

// .header-right {
//   display: flex;
//   align-items: center;
//   width: 150px !important;
// }

// .start-button2 {
//   background-color: #00aeff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   width: 220px !important;
//   border: none;
//   border-radius: 66px !important;
//   padding: 12px 20px 12px 28px;
//   font-weight: 550;
//   font-size: 16px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 15px rgba(67, 94, 136, 0.4);
//   display: flex;
//   align-items: center;
// }

// .start-button2:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 6px 20px rgba(99, 110, 129, 0.6);
// }

// .start-button2:active {
//   transform: translateY(1px);
// }

// .start-button2 i {
//   margin-left: 8px;
//   font-size: 14px;
// }
// .header-nav{
//   margin-left: 68px;
// }

// 


// <div class="page-header" :class="{ 'fixed-header': isHeaderFixed }">
//       <div class="header-left">
//         <a href="#" class="logo">
//          <img src="../assets/images/logo.png" alt="">
//         </a>
//       </div>

//       <div class="header-nav">
//         <div class="nav-items">
//           <div class="nav-item active" onclick="navigateTo('position')">
//             <i class="fas fa-briefcase"></i>首页
//           </div>
//           <div class="nav-item" onclick="navigateTo('position')">
//             <i class="fas fa-briefcase"></i>选择岗位
//           </div>
//           <div class="nav-item" onclick="navigateTo('resume')">
//             <i class="fas fa-file-alt"></i>简历准备
//           </div>
//           <div class="nav-item" onclick="navigateTo('guide')">
//             <i class="fas fa-compass"></i>备战指南
//           </div>
//           <div class="nav-item" onclick="navigateTo('report')">
//             <i class="fas fa-chart-bar"></i>测试报告
//           </div>
//           <div class="nav-item" onclick="navigateTo('path')">
//             <i class="fas fa-road"></i>提升路径
//           </div>
//           <div class="nav-item" onclick="navigateTo('history')">
//             <i class="fas fa-history"></i>历史表现分析
//           </div>
//         </div>
//       </div>

//       <div class="header-right">
//         <button class="start-button2" @click="routerPlease()">
//           免费开始 <span>&nbsp;→</span>
//         </button>
//       </div>
//     </div>