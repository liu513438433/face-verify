<template>
  <div id="login">
    <div class="logo_container">
      <img src="../assets/baidu_logo.png" class="logo"/>
    </div>
    <div class="content_container">
      <div class="name">
        <el-input class="input" clearable placeholder="请输入您的姓名">
          <p slot="prepend">姓  名</p>
        </el-input>
      </div>
      <div class="identify">
        <el-input class="input" clearable placeholder="请输入您的身份证号">
          <p slot="prepend">身份证号</p>
        </el-input>
      </div>
      <div class="submit">
        <el-button type="primary" @click="open">开始实名认证</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    methods: {
      open() {
        this.$confirm('确认填写无误', '确认信息', {
          customClass: 'messageBox',
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$router.push('/statement')
          })
          .catch(() => {

          });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #login
    text-align center
    .logo_container
      width 280px
      margin 20px auto 40px
      .logo
        width 100%
    .content_container
      border 1px lavender solid
      background-color white
      border-radius 5px
      padding-top 20px
      width 350px
      margin 0 auto
      padding-bottom 15px
      div
        margin-bottom 10px
        .input
          width 320px
          p
            width 50px
      .submit
        button
          width 300px
          margin-top 30px
</style>
