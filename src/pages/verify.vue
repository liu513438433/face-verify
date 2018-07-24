 <template>
  <div id="verify">
    <video id="video" width="100%"></video>

    <canvas id="canvas"></canvas>
    <div id="face_square">
      <transition name="el-fade-in">
        <div id="face_verify" v-show="!isFace">请将面部对准摄像头</div>
      </transition>
      <transition name="el-zoom-in-center">
        <div id="tip" v-show="isShow&&isFace">用普通话大声读数字</div>
      </transition>
      <div id="code">{{code}}</div>
      <div class="square_TL border_"></div>
      <div class="square_TR border_"></div>
      <div class="square_BL border_"></div>
      <div class="square_BR border_"></div>
      <transition name="el-fade-in">
        <div id="start" v-show="isShow&&isFace">开始</div>
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
      face_ident(){
        if (this.error_code == 0){
          this.timer = null;
          console.log('first step has finished!');
        }
      }
    },
    methods: {
      //使用摄像头
      getUserMedia (constraints,success,error){
        if (navigator.mediaDevices.getUserMedia) {
          //最新的标准API
          navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
          //webkit核心浏览器
          navigator.webkitGetUserMedia(constraints,success, error)
        } else if (navigator.mozGetUserMedia) {
          //firfox浏览器
          navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
          //旧版API
          navigator.getUserMedia(constraints, success, error);
        }
      },
      //处理视频流数据
      success(stream){
        let video = document.getElementById('video');
        //兼容webkit核心浏览器
        let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);

        //video.src = CompatibleURL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        let recorder = new MediaRecorder(stream);
        document.getElementById('start').onclick = () =>{
          if (this.flag){
            return;
          }
          this.flag = true;
          this.isShow = false;
          let recorder = new MediaRecorder(stream);
          //开始录制
          recorder.start();
          //获取语音验证码
          this.getCount();
          //时间限制
          let timer2 = setInterval(()=>{
            this.progress ++;
            if (this.progress == 100){
              recorder.stop();
              clearInterval(timer2);
              timer2 = null
              this.isPending = true;
            }
          },50);
          //得到有效数据   收集数据
          let buffers = null;
          recorder.ondataavailable = (event)=> {
            //收集媒体设备获得的可以使用的数据
            // console.log(event.data);
            buffers = event.data;
          }
          recorder.onstop =()=> {
            //停止录制时触发函数
            let video64 = new FileReader()
            video64.readAsDataURL(buffers)
            video64.onload= ()=>{
              let video_data = encodeURIComponent(video64.result.slice(23));
              let data2 = `session_id=${this.session_id}&video_base64=${video_data}`;
              this.ajax('/api/rest/2.0/face/v1/faceliveness/verify?access_token=24.62892a017d22344421715e403d545a14.2592000.1534400488.282335-11511631',data2)
            }
            buffers = null
          }
        }
      },
      //错误数据显示
      error(error) {
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      },
      //ajax
      ajax(url,data){
        let xhr = new XMLHttpRequest();
        xhr.open('post',url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
        xhr.onreadystatechange =  () => {
          if(xhr.readyState == 4 && xhr.status == 200){
            //人脸检测成功
            if (JSON.parse(xhr.responseText).result&&JSON.parse(xhr.responseText).result.face_list){
              this.isFace = true;
              //清除定时器
              clearInterval(this.timer);
            }
            //获取语音验证码成功
            if (JSON.parse(xhr.responseText).result&&JSON.parse(xhr.responseText).result.session_id){
              console.log('already has code!');
              this.code = JSON.parse(xhr.responseText).result.code;
              this.session_id = JSON.parse(xhr.responseText).result.session_id;
            }
          }
        }
      },
      //获取语音提示码
      getCount(){
        this.ajax('/api/rest/2.0/face/v1/faceliveness/sessioncode?access_token=24.62892a017d22344421715e403d545a14.2592000.1534400488.282335-11511631','')
      },
      //开始录制
      startRecord(){

      },
      //初始化
      init(){
        let canvas = document.getElementById('canvas');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight * 0.6;
        let painting = canvas.getContext('2d');
        let video = document.getElementById('video');
        let square = document.getElementById('face_square');
        square.style.width = document.body.clientWidth * 0.7 + 'px';
        square.style.height = document.body.clientHeight * 0.6 + 'px';
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
          //调用用户媒体设备, 访问摄像头
          this.getUserMedia({video: true,audio: true}, this.success, this.error);
          video.play();
        } else {
          alert('不支持访问用户媒体');
        }
        this.timer = setInterval(()=>{
          painting.drawImage(video,0,0,video.clientWidth,video.clientHeight);
          let data = encodeURIComponent(canvas.toDataURL().slice(22));
          // console.log(this.error_code);
          let data1 = `image=${data}&image_type=BASE64`;
          this.ajax('/api/rest/2.0/face/v3/detect?access_token=24.62892a017d22344421715e403d545a14.2592000.1534400488.282335-11511631',data1);
        },200)
      }
    },
    mounted(){
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
    #video
      display block
    #canvas
      display none
    #face_square
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      border 1px solid gainsboro
      display flex
      justify-content center
      #face_verify
        position absolute
        top -50px
        color deepskyblue
      .border_
        position absolute
        width 30px
        height 30px
      .square_TL
        top -2px
        left -2px
        border-top 4px solid deepskyblue
        border-left 4px solid deepskyblue
      .square_TR
        top -2px
        right -2px
        border-top 4px solid deepskyblue
        border-right 4px solid deepskyblue
      .square_BL
        bottom -2px
        left -2px
        border-bottom 4px solid deepskyblue
        border-left 4px solid deepskyblue
      .square_BR
        bottom -2px
        right -2px
        border-bottom 4px solid deepskyblue
        border-right 4px solid deepskyblue
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
