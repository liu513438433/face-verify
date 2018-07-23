<template>
  <div id="tips">
    <div class="sketch">
      <div class="sketch_img"></div>
      <p class="sketch_text">
        正面平视手机、保证光线充足
        <br>
        请勿遮挡面部
      </p>
    </div>
    <div class="prompt">
      <div class="prompt_box">
        <div class="prompt_box_text">
          <span class="prompt_box_text_number">1</span>
          <span class="prompt_box_text_content">牢记验证码，点击开始录制</span>
          <span class="prompt_box_text_border"></span>
        </div>
        <div class="prompt_box_text">
          <span class="prompt_box_text_number">2</span>
          <span class="prompt_box_text_content">开启前置摄像头，用普通话朗读数字</span>
          <span class="prompt_box_text_border"></span>
        </div>
        <div class="prompt_box_text">
          <span class="prompt_box_text_number">3</span>
          <span class="prompt_box_text_content">完成录制，等待验证结果</span>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="open3">下一步</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open3(){
        this.$router.push('/verify')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #tips
    .sketch
      background-color hsla(0,0%,88%,.35)
      padding .8333rem 1.666rem 1.2rem
      .sketch_text
        font-size 14px
        color #999
        letter-spacing 0
        line-height 24px
        text-align center
      .sketch_img
        width 12rem
        height 18rem
        margin 0 auto
        background url("../assets/sketch.png") 0 0 no-repeat
        background-size 100% auto
    .prompt
      box-shadow 0 -4 10px 0 #e8e8e8
      padding-bottom .833rem
      .prompt_box
        padding 3.166rem 0 0
        .prompt_box_text
          margin 0 auto 2.666rem
          height 1rem
          line-height 1rem
          width 18.5rem
          text-align start
          .prompt_box_text_number
            border-radius 200px
            border 1px solid #0073eb
            text-align center
            color #0073eb
            display inline-block
            width 1.334rem
            height 1.333rem
            line-height 1.333rem
            box-sizing border-box
            font-size 12px
            margin-right .833rem
            letter-spacing 0
            vertical-align top
          .prompt_box_text_content
            color #333
            letter-spacing 0
            white-space nowrap
            display inline-block
            font-size 16px
          .prompt_box_text_border
            height 1.9rem
            width 0
            margin .417rem 0 .417rem .59rem
            border-left 1px dotted #0073eb
            display block
    button
      width 300px
</style>
