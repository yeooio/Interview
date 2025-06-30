<template>
  <div class="interview">
   <div class="page-header">
      <div class="header-left"></div>
      <div class="header-nav">

        <img src="../assets//images/头像.png" alt="" />
      </div>
    </div>
    <div class="interview-container">
      <!-- <p>]sdjhks</p> -->
       <div class="panel">
       <div class="left-panel">
        <!-- 面试实况 -->
        <div class="video-area">
          <div class="panel-header">
          <!-- <img src="../assets/images/" alt=""> -->
           <img src="../assets/images/面试实况.png" alt="">
            <!-- <img src="../assets//images/video.png" alt=""> -->
          <!--  -->
          <el-button type="primary">
            <img src="../assets/images/计时器.png" alt="" class="img">
            3:20</el-button>
        </div>
        <div class="video">
          <video src=""></video>
        </div>
        </div>
        <!-- 面试问题 -->
        <div class="question-section">
          <!-- 面试问题图标 -->
          <img src="../assets/images/面试问题.png" alt="">
          <div class="question">
            <h4>解释JavaScript闭包原理</h4>
            <el-button type="danger">2023年字节真题</el-button>
          </div>
        </div>
        <!--回答建议 -->
        <div class="advice-section">
          <img src="../assets/images/回答建议.png" alt="">
          <div class="advice-list">
            <li>
              <img src="../assets//images/1.png" alt=""> 结合STAR法则，清晰描述项目背景
            </li>
            <li>
              <img src="../assets//images/2.png" alt="">技术问题先解释核心概念，再结合应用场景说明
<!--  -->
            </li>
            <li>
              <img src="../assets//images/3.png" alt=""> 回答简洁明了，每个要点控制在2-3句话
            </li>
          </div>
        </div>
        <div class="button-group">
        <el-button type="primary">
          <img src="../assets//images/开始.png" alt="" >开始回答
        </el-button>
        <el-button type="danger" disabled>
          <img src="../assets/images/停止.png" alt="">停止回答
        </el-button>

        </div>
       </div>
       <div class="right-panel"></div>
       </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
console.log('[环境变量] VITE_API_URL =', import.meta.env.VITE_API_URL);
</script>

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