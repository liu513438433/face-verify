 <template>
  <div id="verify">
    <video id="video" width="100%" autoplay muted></video>

    <canvas id="canvas"></canvas>
    <div id="face_square">
      <transition name="el-fade-in">
        <div id="face_verify" v-show="!isFace">请将面部对准摄像头</div>
      </transition>
      <transition name="el-zoom-in-center">
        <div id="tip" v-show="isShow&&isFace">用普通话大声读数字</div>
      </transition>
      <div id="code">{{code}}</div>
      <transition name="el-fade-in">
        <div id="start" v-show="isShow&&isFace" @click="handleRecord">开始</div>
      </transition>
      <transition name="el-fade-in">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="progress" v-show="!isShow&&isFace"></el-progress>
      </transition>
    </div>
    <div id="pending" v-show="isPending&&!isFinish">
      <div id="pending_msg">
        <div>识别中...</div>
        <i class="el-icon-loading"></i>
      </div>
    </div>
    <div id="result">
      <i class="el-icon-success"></i>
      <i class="el-icon-error"></i>
      <div id="msg">{{msg}}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import '../assets/tracking.js';
  import '../assets/face.js';
  import {mapState} from 'vuex';
  export default {
    data(){
      return{
        timer: null,
        error_code: 10000,
        flag: false,
        code: null,
        isPending: false,
        session_id: null,
        progress: 0,
        isShow: true,
        isFace: false,
        isFinish: false,
        isSuccess: false,
        isError: false,
        msg: ''
      }
    },
    computed: {
      ...mapState(['name','identify']),
      face_ident(){
        if (this.error_code == 0){
          this.timer = null;
          console.log('first step has finished!');
        }
      }
    },
    methods: {
      //处理视频流数据
      handleRecord(){
          if (this.flag){
            return;
          }
          if(tracking.recorder){
              this.flag = true;
              this.isShow = false;
          let buffers = null;
              //开始录制
          tracking.recorder.start();
          //获取语音验证码
          this.getCount();
          //时间限制
          let timer2 = setInterval(()=>{
            this.progress ++;
            if (this.progress == 100){
              tracking.recorder.stop();
              clearInterval(timer2);
              timer2 = null
              this.isPending = true;
            }
          },50);
          //得到有效数据   收集数据
          tracking.recorder.ondataavailable = (event)=> {
            //收集媒体设备获得的可以使用的数据
            // console.log(event.data);
            buffers = event.data;
          }
          tracking.recorder.onstop =()=> {
            //停止录制时触发函数
            let video64 = new FileReader()
            video64.readAsDataURL(buffers)
            video64.onload= ()=>{
              let video_data = encodeURIComponent(video64.result.slice(23));
              let data2 = `session_id=${this.session_id}&video_base64=${video_data}`;
              this.ajax('/api/rest/2.0/face/v1/faceliveness/verify?access_token=24.b77d50bfa40ecec8224f485b4bf992b7.2592000.1538293304.282335-11511631',data2)
            }
            buffers = null
          }

          }
      },
      //ajax2
      ajax2(url,data){
        axios.post(url,data)
          .then((res)=>{
            let resultData = res.data;
            //获取语音验证码成功
            if (resultData.result&&resultData.result.session_id){
              console.log('already has code!');
              this.code = resultData.result.code;
              this.session_id = resultData.result.session_id;
            }
          })
          .catch((err)=>{
            console.log(err);
          })
          
      },
      //活体识别视频检测
      ajax(url,data){
        axios.post(url,data)
        .then((res)=>{
          let resultData = res.data;
          this.$store.dispatch('getError',{error_no:resultData.err_no});
          this.$router.replace('/resms'); 
        })
        .catch((error)=>{

        })
      },
      //获取语音提示码
      getCount(){
        this.ajax2('/api/rest/2.0/face/v1/faceliveness/sessioncode?access_token=24.b77d50bfa40ecec8224f485b4bf992b7.2592000.1538293304.282335-11511631','')
      },
      //开始录制
      startRecord(){

      },
      //初始化
      init(){
        // let canvas = document.getElementById('canvas');
        // canvas.width = document.body.clientWidth;
        // canvas.height = document.body.clientHeight * 0.6;
        // let painting = canvas.getContext('2d');
        let video = document.getElementById('video');
        let square = document.getElementById('face_square');
        square.style.width = document.body.clientWidth * 0.7 + 'px';
        square.style.height = document.body.clientHeight * 0.6 + 'px';
        let self = this;
        
        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        tracking.track('#video', tracker, { camera: true ,audio: true});
        tracker.on('track',function(event){
            console.log(111);
            if(event.data.length !== 0){
                self.isFace = true;
                tracker.removeListener('track',function(event){
                  console.log(222);
                })
            }
        })
      }
    },
    mounted(){
      // if(!this.name||!this.identify){
      //   this.$router.replace('/');
      //   return;
      // }
      this.init()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #verify
    background-color black
    height 100%
    display flex
    justify-content center
    align-items center
    position relative
    #video
      position absolute
    #canvas
      display none
    #face_square
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      background url("../../static/image/人脸框.png") no-repeat  center center
      background-size 80%
      display flex
      justify-content center
      #face_verify
        position absolute
        top -50px
        color deepskyblue
      #start
        width 150px
        height 30px
        border 1px solid deepskyblue
        color deepskyblue
        display flex
        align-items center
        justify-content center
        border-radius 5px
        position absolute
        bottom 30px
      #tip
        color white
        font-size larger
        position absolute
        top 15px
      .el-progress
        width 240px
        position absolute
        bottom 10px
      #code
        color white
        font-size larger
        position absolute
        top 40px
    #pending
      width 100%
      height 100%
      position absolute
      color white
      background-color black
      #pending_msg
        margin 60px 0 0
        div
          font-size 20px
          margin-bottom 10px
        i
          font-size 40px
</style>
