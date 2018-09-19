<template>
  <div id="statement">
    <div class="logo_container">
      <img src="../assets/image/logo.png" alt="logo" class="logo">
    </div>
    <div class="content_container">
      <div class="success" v-if="!des">
          <div class="title">恭喜你，认证通过</div>
          <el-button type="primary" class="button">完成</el-button>
      </div>
      <div class="error" v-if="des">
          <div class="title">{{msg}}</div>
          <div class="description">{{des}}</div>
          <el-button type="primary">{{btn}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data(){
      return{
        msg: '很遗憾，认证未通过',
        des: '',
        btn: '再来一次',
        msgObj: {
          key: [216506,216505,216430,216502,216501,216508,216434,216908,216507,216433,216432,216431,216500],
          value: ['redis操作失败','redis连接失败','rtse/face 服务异常','当前会话已失效','没有找到人脸','没有找到视频信息','活体检测失败','视频中人脸质量过低','视频中有多张人脸','视频解析服务发生错误','视频解析服务调用失败','语音识别服务异常','验证码位数错误']
        }
      }
    },
    mounted(){
      if(!this.name||!this.identify||!this.isVerify){
        this.$router.replace('/');
        return;
      }
        if(this.error_no){
            this.marching(this.error_no);
        }
    },
    computed: {
      ...mapState(['name','identify','error_no','isVerify'])
    },
    methods: {
      marching(err){
        let index = this.msgObj.key.indexOf(err);
        this.des = this.msgObj.value[index];
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #statement
    text-align center
    .logo_container
      width 280px
      margin 20px auto 40px
      .logo
        width 100%
    .content_container
      text-align center
      background url(../assets/image/background.png) no-repeat
      background-size cover
      border-radius 5px
      padding-top 20px
      width 350px
      margin 0 auto
      padding-bottom 15px
</style>

