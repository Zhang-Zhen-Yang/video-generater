/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-22 14:25:43 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 14:26:19
 */

<template>
  <modal-dialog
    @dismiss="dismiss"
    @confirm="dismiss"
    title="视频生成"
    :sty="'width: 400px;height:200px'"
    :showFooter="false"
    :showHeader="false"
  >
    
    <div class="dialog-generate-content" slot="content" >
      <div class="generate-step1" v-if="step == 1">
        <VueSlideBar
          :value="progressVal"
          :showTooltip="false"
          :lineHeight="8"
          :isDisabled="true"
        ></VueSlideBar>
        <div>
          <table cellspcing="0" cellpadding="0" style="width: 100%;margin-top: 10px;" class="font14">
            <tr>
              <td class="left">
                正在获取图片帧···
              </td>
              <td class="right">
                <div class="generate-step-value-display">{{ progressVal.toFixed(2) }} %</div>
              </td>
            </tr>
          </table>
          
        </div>
      </div>
      <div class="generate-step2" v-if="step == 2">
        <div style="position: absolute;width: 100%;height: 90%;">
          <material-spinner></material-spinner>
        </div>
        <div class="font14" style="position: absolute;bottom: 30px;width: 100%;">
            视频合成中···
        </div>
      </div>
    </div>
    


    <!--footer-->
    <table slot="footer">
      <tr>
        <td class="left">
        </td>
        <td>
        </td>
        <td class="right">
          <button class="btn white" @click="dismiss(false)">取消</button>
          <button v-if="false" class="btn primary" @click="confirm(true)">确定</button>
        </td>
      </tr>
    </table>
  </modal-dialog>
</template>

<script>
import VueSlideBar from 'vue-slide-bar';
export default {
  name: 'dialog-generate',
  components: { VueSlideBar },
  data () {
    return {
      loading: 50,
    }
  },
  computed: {
    modal(){
      return this.$store.state.dialogGenerate;
    },
    timeline() {
      return this.$store.state.timeline;
    },
    duration() {
      if(this.timeline) {
        return this.timeline.duration;
      }
      return 0;
    },
    position() {
      return this.$store.state.position;
    },
    progressVal() {
      return this.position / this.duration * 100;
    },
    step() {
      return this.modal.step;
    }


  },
  methods: {
    dismiss(){
      this.modal.show = false;
    },
    confirm() {
      
    },

  },
  created() {
    
  }
}
</script>

<style lang="scss">
  .dialog-audio-content{
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: left;
    
  }
  .generate-step1{
    padding: 40px 20px;
    .vue-slide-bar{
      border-radius: 0;
    }
    .vue-slide-bar-process{
      transition: none!important;
      border-radius: 0;
      // transition-duration: 0;
    }
  }


</style>
