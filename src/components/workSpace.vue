/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 09:56:26 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 09:58:19
 */
<template>
  <div id="work-space">
    <div style="height: 100%;border-bottom: 170px solid white;position: relative;">
      <!--画布显示-->
      <div class="canvas-wrap">
        <canvasDisplay></canvasDisplay>
      </div>

      <!--template bar-->
      <templateBar></templateBar>
      <!--时间轴-->
      <timeline></timeline>
      <!--配置-->
      <div class="options-wrap">
        <options></options>
      </div>
    </div>
    <!--队列，主要是图片-->
    <div style="width: 100%;height: 170px;position: absolute;left:0;bottom:0;background-color:green;">
      <queue></queue>
    </div>
  </div>
</template>

<script>
import queue from './queue.vue';
import canvasDisplay from './canvasDisplay.vue';
import options from './options.vue';
import templateBar from './templateBar.vue';
import timeline from './timeline.vue';
export default {
  name: 'work-space',
  components: {queue, canvasDisplay, options, templateBar, timeline},
  data () {
    return {
      msg: 'work-space',
    }
  },
  computed: {
    
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  .canvas-wrap{
    width: 100%;
    height: 100%;
    border-right: 500px solid transparent;
    border-left: 70px solid transparent;
    border-bottom: 60px solid transparent;
    position: relative;
    background-color: transparent;
  }
  .options-wrap{
    width: 500px;
    background-color: #efefef;
    height:100%;
    position:absolute;
    right: 0;
    top: 0;
    overflow: hidden;
  }
  #work-space{
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
  }
</style>
