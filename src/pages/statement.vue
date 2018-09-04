<template>
  <div id="statement">
    <div class="logo_container">
      <img src="../assets/image/logo.png" alt="logo" class="logo">
    </div>
    <div class="content_container">
      <img src="../assets/image/faceLogo.png" alt="logo" class="content_logo">
      <p class="tips">
        <el-checkbox v-model="checked"></el-checkbox>
        <span>
          请同意服务提供者及百度使用并传送相关数据用于身份验证。
          <a href="javascript:" @click="showClose">查看协议详情</a>
        </span>
      </p>
      <el-button type="primary" :disabled="!checked" @click="open2">同意并开始实名认证</el-button>
    </div>
    <div class="protocol_container" v-show="isShow">
      <div class="pHeader">
        <img src="../assets/image/close.png" alt="close" class="close" @click="showClose">
        <span class="hTitle">人脸实名认证协议</span>
      </div>
      <div class="pContent">
        1234567890123
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data(){
      return{
        checked: false,
        isShow: false
      }
    },
    mounted(){
      if(!this.name||!this.identify){
        this.$router.replace('/');
        return;
      }
    },
    computed: {
      ...mapState(['name','identify'])
    },
    methods: {
      open2(){
        this.$router.push('/verify')
      },
      showClose(){
        this.isShow = !this.isShow
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
      border 1px lavender solid
      background-color white
      border-radius 5px
      padding-top 20px
      width 350px
      margin 0 auto
      padding-bottom 15px
      .content_logo
        width 50%
        margin-bottom 20px
      .tips
        width 320px
        margin 0 auto
        a
          color blue
          cursor pointer
      button
        width 300px
        margin 20px auto 10px
    .protocol_container
      text-align start
      position absolute
      height 100%
      width 100%
      top 0
      background-color white
      .pHeader
        line-height 16px
        font-size 16px
        background-color lightgrey
        padding 10px 0
        .close
          height 16px
          vertical-align text-top
          margin 0 10px
        .hTitle
          font-weight bolder  
</style>

