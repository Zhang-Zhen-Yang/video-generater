/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 09:56:26 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 09:58:19
 */
<template>
  <div id="work-space">
    <block-slice :dir="'horizontal'" :staticIndex="1" :staticValue="showOptionsPanel ? '500px' : '0px'">
      <!--配置-->
      <div v-if="showOptionsPanel" class="options-wrap" slot="s">
        <options></options>
      </div>
      <div v-if="!showOptionsPanel"
        slot="s"
        class="left-icon pointer"
        style=""
        title="展开配置面板"
        @click="showOptionsPanelAction">
      </div>
      
      <div style="width: 100%;height: 100%;" slot="e">
          <block-slice :dir="'vertical'" :staticIndex="1" :staticValue="'170px'">
            <div slot="e" style="width: 100%;height: 100%;">
              <block-slice :dir="'horizontal'" :staticIndex="0" :staticValue="'70px'">
                <!--template bar-->
                <div slot="s">
                  <templateBar></templateBar>
                </div>
                <div slot="e" style="width: 100%;height: 100%;">
                  <block-slice :dir="'vertical'" :staticIndex="1" :staticValue="'75px'">
                    <!--画布显示-->
                    <div slot="e" class="canvas-wrap">
                      <canvasDisplay></canvasDisplay>
                    </div>
                    <div slot="s" style="positin: relative;">
                      <!--时间轴-->
                      <timeline></timeline>
                    </div>

                  </block-slice>

                </div>

              </block-slice>
            </div>
            <!--队列，主要是图片-->
            <div slot="s" style="width: 100%;height: 170px;left:0;bottom:0;">
              <queue></queue>
            </div>
          </block-slice>
      </div>
    </block-slice>  
    <div style="height: 100%;border-bottom: 170px solid white;position: relative;" v-if="false">
      
      <div>
        
      </div>
      <div>
        
      </div>
      
      
      
      
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
    showOptionsPanel:{
      get() {
        return this.$store.state.showOptionsPanel;
      },
      set(val) {
        this.$store.state.showOptionsPanel = val;
      }
    }
  },
  methods: {
    showOptionsPanelAction(){
      this.showOptionsPanel = true;
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  .canvas-wrap{
    width: 100%;
    height: 100%;
    
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
  .left-icon{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M592 736c-8 0-16-3.2-22.4-9.6l-192-192c-12.8-12.8-12.8-32 0-44.8l192-192c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L444.8 512l169.6 169.6c12.8 12.8 12.8 32 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z' fill='%231296db'/%3E%3Cpath d='M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448zm0-832c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z' fill='%231296db'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 30px;
    height: 30px;
    display: inline-block; 
    vertical-align: -7px;
    margin-right: 10px;
    position: absolute;
    left: -40px;
    top: 8px;
    z-index:1;
  }
</style>
