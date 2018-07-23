<template>
  <div id="statement">
    <div class="logo_container">
      <img src="../assets/baidu_logo.png" class="logo"/>
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
        this.$router.push('/tips')
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
</style>
