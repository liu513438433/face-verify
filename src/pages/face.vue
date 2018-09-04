<template>
  <div id="login">
    <div class="logo_container">
      <img src="../assets/image/logo.png" class="logo"/>
    </div>
    <div class="content_container">
      <div class="tips">
        <p v-show="msg">{{msg}}</p>
        <p v-show="!msg">3</p>
      </div>
      <div class="name">
        <el-input class="input" clearable v-model="name1" placeholder="请输入您的姓名">
          <p slot="prepend">姓  名</p>
        </el-input>
      </div>
      <div class="identify">
        <el-input class="input" clearable v-model="identify1" placeholder="请输入您的身份证号">
          <p slot="prepend">身份证号</p>
        </el-input>
      </div>
      <div class="submit">
        <el-button type="primary" @click="open">下一步</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return{
        name1: '',
        identify1: '',
        msg: ''
      }
    },
    mounted(){
      this.name1 = '';
      this.identify1 = '';
    },
    methods: {
      open() {
        this.inspect_identify();
        if(this.msg){
          return;
        }
        this.inspect_identify();
        this.$confirm('确认填写无误', '确认信息', {
          customClass: 'messageBox',
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$store.dispatch('getInfo',{info:{name:this.name1,identify:this.identify1}})
            this.$router.push('/statement')
          })
          .catch(() => {

          });
      },
      inspect_identify(){
        if(this.identify1&&this.name1){
          let regExp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          if(regExp.test(this.identify1)){
            let code = this.identify1.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++)
            {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            if(parity[sum % 11] != code[17].toUpperCase()){
              this.msg = '您输入的身份证号有误';
            }else{
              this.msg = '';
              // this.open();
            }

          }else{
            this.msg = '您输入的身份证号有误';
          }
        }else{
          this.msg = '请填写完整身份信息';
        }
      }
    },
    computed: {
      ...mapState(['name','identify'])
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
      background url('../assets/image/background.png') no-repeat
      background-size cover 
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
      .tips
        p
          text-align center
          font-size 15px
          color red
          padding 10px 0
          font-weight bolder
        :last-child
          visibility hidden
</style>
