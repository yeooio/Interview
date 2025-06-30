<template>
  <div class="login-container">
    <!-- <el-icon :size="20">
    <Edit />
  </el-icon> -->
    <el-card class="login-box" shadow="never">
      <!-- <template #header> -->
        <h2>欢迎登录</h2>
      <!-- </template> -->
      <el-form class="login-form" label-width="0">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            style="width: 100%"
          />
        </el-form-item>
        <div class="line"></div>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            style="width: 100%"
          />
        </el-form-item>
        <div class="line"></div>
        <el-form-item>
          <el-input
            v-model="loginForm.verificationCode"
            placeholder="请输入验证码"
            style="width: 100%"
          >
          <div class="append"></div>
            <template #append>
             <img src="" alt="">
              <el-button
                type="text"
                @click="refreshVerificationCode"
                icon="Refresh"
              ></el-button> 
            </template>
           
          </el-input>
        </el-form-item>
        <div class="line moverLine"></div>
        <el-form-item class="form-remember" prop="rememberPassword">
          <el-checkbox v-model="loginForm.rememberPassword"
            >记住密码</el-checkbox
          >
          <span class="register-link" @click="goToRegister">忘记密码</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.prevent="handleLogin"
            style="width: 100%"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// import router from '@/router/index';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '../router';

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  verificationCode: '',
  rememberPassword: false,
});
msg.data
const verificationCodeValue = ref('1808'); // 模拟验证码值，实际从后端获取

// 刷新验证码（模拟逻辑，实际需调用后端接口）
const refreshVerificationCode = () => {
  const newCode = Math.floor(Math.random() * 9000 + 1000); // 模拟生成新验证码
  verificationCodeValue.value = newCode.toString();
  loginForm.value.verificationCode = ''; // 清空输入框
};

// 模拟登录逻辑（实际需调用后端接口）
const handleLogin = () => {
  if (
    loginForm.value.username &&
    loginForm.value.password 
    // loginForm.value.verificationCode === verificationCodeValue.value
  ) {
    ElMessage.success('登录成功！');
    console.log('登录成功！', loginForm.value);
    router.push('/home'); 
    // 这里可以添加实际登录成功后的逻辑，比如跳转页面等
  } else {
    ElMessage.error('登录失败，请检查输入信息');
  }
};

// 模拟跳转到注册页面（实际根据路由配置跳转）
const goToRegister = () => {
  console.log('跳转到注册页面逻辑执行（可在此处调用路由跳转方法）');
};
</script>

<style lang="scss" scoped>
@import 'element-plus/theme-chalk/index.css'; // 引入Element Plus样式
:deep(.el-input__icon) {
  --el-icon-font-size: 18px !important; /* 自定义图标字体大小，可根据需求调整，比如改成 20px 等 */
}
.el-form-item{
  margin-bottom: 2px;
}
.el-input-group__append{
  background: white !important;
}
img{
  width: 55px;
  height: 18px;
}
.line{
  width: 330px;
  height: 1px;
//  color: #cf0808;
background-color: #e8e8e8;
margin: 0px 0PX 31px 10px ;
}
.moverLine{
  margin-bottom: 5px;
}
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('../assets/images/登录.png') no-repeat center/cover; /* 背景图铺满 */
  // background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center; /* 登录盒子居中 */
}


.login-box {
  width: 330px;
  // padding: 20px;
  // padding: 0px 41px 0px 59px;
  box-sizing: content-box;
  padding: 0px 45px;
  // 上右下左逆时针，两个的话，第一个上下，第二个左右
  // background: rgba(255, 255, 255, 0.8); /* 半透明效果 */
  border-radius: 17px;
  height: 399px;
  background: white;
  position: absolute;
  left: 780px;
  top: 165px;
}
// .login-title {
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 20px;
//   font-weight: bold;
// }

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.verification-code {
  margin-right: 10px;
  color: #39f7d7;
}

.form-remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  // font-size: 10px !important;

  .register-link {
    color: #409eff;
    cursor: pointer;
  }
  // font-size: 10px !important;
}
::v-deep.el-card__header{
  border-bottom: 0px!important;
  padding: 0;
}


h2{
  // margin: 0;
  // height: 27px;
  margin: 40px 0 25px 0;

}
:deep(.el-input__wrapper) {
  // border: none; /* 直接将输入框内部的边框设为无 */
  box-shadow: none !important; /* 同时去掉可能的阴影（如果有） */
}

.el-form-item__content{
  display: flex;
  justify-content: space-between !important;
}
.el-button--primary{
  --el-button-bg-color: #0E70FC;
  width: 300px;
  height: 30px;
  border-radius: 8px;
}
.el-checkbox{
  --el-checkbox-font-size: 12px;
}
.form-remember .register-link{
  font-size: 12px !important;
}
.el-input{
  font-size: 12px;
}
</style>
