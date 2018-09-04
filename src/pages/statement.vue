<template>
  <div id="statement">
    <div class="logo_container">
        <span class="logo1 logo">baidu</span>
        <span class="logo2 logo">baidu</span>
    </div>
    <div class="content_container">
      <img src="" alt="logo" class="content_logo">
      <p class="tips">
        <el-checkbox v-model="checked"></el-checkbox>
        <span>
          请同意服务提供者及百度使用并传送相关数据用于身份验证。
          <a href="javascript:">查看协议详情</a>
        </span>
      </p>
      <el-button type="primary" :disabled="!checked" @click="open2">同意并下一步</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        checked: false
      }
    },
    methods: {
      open2(){
        this.$router.push('/verify')
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
      position relative
      background-color #000
      .logo
        color #fff
        font-size 100px
        font-weight bold
      .logo1
        text-shadow 5px 3px 0 #FE2C55
      .logo2
        text-shadow -5px -3px 0 #00F7EF
        position absolute
        left 0
        top 0
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
</style>
