<template>
  <div id="canvas-display">
    <div id="canvas-size-tag" class="canvas-size-tag pointer" title="尺寸" @click="toggleSizeOptions">
      {{ project.width }}&times;{{ project.height }}
    </div>
    <canvasSizeOptions v-if="this.showOptions"></canvasSizeOptions>
    <div style="width:0px;height: 100%;display: inline-block;background-color: red;vertical-align: middle"></div>
    <canvas width="800" height="800" ref="canvas" id="canvas" class="pointer" @click="togglePlayState">
    </canvas>
    <div style="display: inline-block;position: absolute;left: 50%;top: 50%;">
      <div :class="['pause-and-play-tip', playing ? 'pause-tip':'play-tip', 'pointer']" @click="togglePlayState"></div>
    </div>
  </div>
</template>

<script>
import transitions from '../script/transitions/index.js';
import effectWords from '../script/effectWords/index.js';
import watermark from '../script/watermark.js';
import canvasSizeOptions from './canvasSizeOptions.vue';
export default {
  name: 'temp',
  components: {canvasSizeOptions},
  data () {
    return {
      msg: 'temp',
      showOptions: false,
    }
  },
  methods: {
    render() {
      this.canvas.width = this.project.width;
      this.canvas.height = this.project.height;
      /* this.ctx.font = '20px 黑体';
      this.ctx.fillText('canvas', 50, 50);*/ 
      this.ctx.clearRect(0, 0, this.project.width, this.project.width);

      /* if(this.timelineHandle) {
        this.$store.state.timeline.off('change', this.timelineHandle);
      }*/

      let stage = this.stage || new createjs.Stage(this.canvas);
      this.$store.state.stage = stage;
      stage.clear();
      stage.children = [];
      this.stage = stage;
      // 背景
      let bg = new createjs.Shape();
      bg.graphics.beginFill(this.project.bgColor).drawRect(0,0,this.canvas.width, this.canvas.height);
      stage.addChild(bg);

      console.log('stage', stage);
      // 时间轴
      let timeline = new createjs.Timeline([], 'g', {loop: true});
      let wait = 0;

      // 队列=======================

      let reverse = false; // this.project.reverse;
      let queueList = [];
      this.project.queue.forEach((item, index)=>{
        // 图片类型
        if(item.type == 'image') {
          let transition = item.transition;
          let wordEffect = item.wordEffect;
          // console.log('upDownAndScale', transition);
          let tweenFun = 
            (function(stage, timeline, item, index, wait){
              return ()=> {
                transitions[transition]({stage, timeline, item, index, wait})
              };
            })(stage, timeline, item, index, wait)
          
          queueList.push(tweenFun);
          if(wordEffect && effectWords[wordEffect]) {
            // queueList.push(()=>{effectWords[wordEffect]({stage, timeline, item, index, wait})});
            
          }
          wait += item.duration;
          // timeline.addTween(tween);
          // 视频类型
        } else if(item.type == 'video'){

        } else {

        }
      });

      if(reverse) {
        // alert('ddd');
        queueList.reverse()
        queueList.forEach(item=>{item();})
      } else {
        queueList.forEach(item=>{item();})
      }

      // 价格标签
      let wordEffect = this.$store.state.project.wordEffect;
      if(wordEffect && effectWords[wordEffect] && this.$store.state.project.useEffectWord) {
        effectWords[wordEffect]({
          stage,
          timeline,
          item: {duration: 2000},
          index: 0,
          wait: 0,
          project: this.$store.state.project,
          goods: this.$store.state.goods
        });
      }


      // 水印
     
        watermark({
          stage,
          timeline,
          project: this.$store.state.project,
        });
    



      //======================================================


      // stage.addChild(timeline);
      createjs.Ticker.setFPS(24);
		  createjs.Ticker.addEventListener("tick", stage);

      // console.log(timeline);

      this.$store.dispatch('updateTimeline', {timeline});
      /* this.timelineHandle = timeline.on('change', ()=>{
        // console.log(timeline.position);
        this.$store.commit('positionChange', {position: timeline.position})
      })*/

    },
    togglePlayState() {
      this.$store.commit('togglePlayState');
    },
    toggleSizeOptions() {
      this.showOptions = !this.showOptions;
    }
  },
  computed: {
    project() {
      return this.$store.state.project;
    },
    playing() {
      return this.$store.state.playing;
    },
    timeline() {
      return this.$store.state.timeline;
    }
  },
  created() {
    
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    // console.log(this.$refs);
    this.ctx = this.canvas.getContext('2d');
    this.render();
    // alert('ddddd');
    document.body.addEventListener('click', (e)=>{
      let target = e.target;
      if(target.id == 'canvas-size-tag' ) {
        return;
      } else {
        this.showOptions = false;
      }
      
    }, false)
    if(this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(()=>{
      if(this.timeline) {
        let position = this.timeline.position;
        this.$store.state.position = position;
        // this.$store.commit('positionChange', {position: timeline.position})
        // console.log(position);
      }
    }, 40);
    this.$store.state.update = this.render;



    console.log(this.canvas.captureStream);
  },
  watch:{
    project:{
      handler(e){
        /* if(e.show){
          this.$refs.snackbar.show(this.snackbar.text, this.snackbar.timeout);
          this.$store.state.modals[2].show=false;
        }*/
        // alert('ddd');
        // this.render();
      },
      deep: true,
    }
  }
}
</script>

<style lang="scss">
  .canvas-size-tag{
    display: inline-block;
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: #333333;
    color: white;
    padding: 8px 10px;
    border-radius: 3px;
  }
  #canvas-display{
    width: 100%;
    height: 100%;
    
    position: relative;
    background-color: #eee;
    // border-right: 1px solid #cccccc;
    text-align: center;
    canvas{
      background-color: #aaaaaa;
      max-width: 90%;
      max-height: 90%;
      vertical-align: middle;
      box-shadow: 1px 1px 100px rgba(0, 0, 0, 0.1);
      /*position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);*/
    }
    
  }
  #canvas:before{
    content: '';
    display: block;
    position: absolute;
    width: 4000px;
    height: 2000px;
    right: 100%;
    bottom: 0;
    background-color: rgba(255,255,255,0.7);
    z-index: -1;
  }
  #canvas:hover+div .pause-and-play-tip{
    display: block;
  }
  .pause-and-play-tip:hover{
    display: block;
  }
  .pause-and-play-tip{
    position: absolute;
    display: none;
    width: 80px;
    height: 80px;
    // max-height: 90%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
  }
  .play-tip{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M666 498L445.2 290.8c-12.4-6.4-26.8-5.2-38.8 1.6-12 7.2-18.8 19.6-18.8 33.2v401.6c0 13.2 7.2 26 18.8 32.8 6.4 4 13.2 5.6 20.4 5.6 6.4 0 12.4-1.6 17.6-4.4l220.8-194.8c12.4-11.6 22-20 22-34.8.4-13.6-8-21.6-21.2-33.6z' fill='%231296db'/%3E%3Cpath d='M514.4 36C250.8 36 36 250.8 36 514.4s214.8 478.4 478.4 478.4S992.8 778 992.8 514.4 777.6 36 514.4 36zm0 896.8C283.2 932.8 96 744.8 96 514.4 96 283.2 284 96 514.4 96c231.2 0 418.4 188 418.4 418.4 0 230.8-187.6 418.4-418.4 418.4z' fill='%231296db'/%3E%3C/svg%3E");
  }
  .pause-tip{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M515.2 36C251.6 36 36.8 250.8 36.8 514.4s214.8 478.4 478.4 478.4S993.6 778 993.6 514.4 778.8 36 515.2 36zm0 896.8c-231.2 0-418.4-188-418.4-418.4C96.8 283.6 284.8 96 515.2 96c231.2 0 418.4 188 418.4 418.4 0 231.2-187.6 418.4-418.4 418.4z' fill='%231296db'/%3E%3Cpath d='M419.2 290.4c-21.2 0-38.8 17.6-38.8 38.8V700c0 21.2 17.6 38.8 38.8 38.8S458 721.6 458 700V329.2c0-21.2-17.6-38.8-38.8-38.8zM611.2 290.4c-21.2 0-38.8 17.6-38.8 38.8V700c0 21.2 17.6 38.8 38.8 38.8S650 721.6 650 700V329.2c0-21.2-17.6-38.8-38.8-38.8z' fill='%231296db'/%3E%3C/svg%3E");
  }
</style>
