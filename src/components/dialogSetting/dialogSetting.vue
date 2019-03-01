/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-10 16:43:16 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-28 15:17:30
 */

<template>
  <modal-dialog
    @dismiss="dismiss"
    @confirm="dismiss"
    :sty="'width: 500px;height:300px'"
    :showFooter="false"
    title="设置">
    
    
    <div class="dialog-setting-content-wrap" slot="content" >
      <div class="dialog-setting-content scrollbar-overwrite">
        <div style="">
          <div>
            视频质量
          </div>
          <div class="relative" style="padding-top: 32px;">
            <!--<VueSlideBar
              v-model="quality"
              :lineHeight="8"
              :min="1"
            ></VueSlideBar>-->
            
            <vue-slider
              v-model="quality"
              :min="1"
              :max="100"
              :interval="1"
              :piecewise="false"
              :processStyle="{backgroundColor: '#1284e7'}"
              :sliderStyle="{backgroundColor: '#1284e7'}"
              :speed="0"></vue-slider>
          </div>
          <p></p>
          <div>
            帧数
          </div>
          <!--<VueSlideBar
              v-model="frames"
              :lineHeight="8"
              :min="1"
              :max="24"
          ></VueSlideBar>-->
          <div style="padding-top: 32px;">
            <vue-slider
                v-model="frames"
                :min="1"
                :max="24"
                :interval="1"
                :piecewise="false"
                :processStyle="{backgroundColor: '#1284e7'}"
                :sliderStyle="{backgroundColor: '#1284e7'}"
                :speed="0"></vue-slider>
          </div>
          
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
import vueSlider from 'vue-slider-component';
export default {
  name: 'dialog-setting',
  components: { VueSlideBar, vueSlider },
  data () {
    return {
    
    }
  },
  computed: {
    modal(){
      return this.$store.state.dialogSetting;
    },
    quality : {
      get() {
        return this.modal.quality;   
      },
      set(val) {
        this.modal.quality = val;
        localStorage.setItem('setting-quality', val);
      },
      
    },
    frames: {
      get() {
        return this.modal.frames;  
      },
      set(val) {
        this.modal.frames = val;
        localStorage.setItem('setting-frames', val);
      }
    }
    

  },
  methods: {
    dismiss(){
      this.modal.show = false;
    },
    confirm() {
      alert('yes');
    },



  },
  created() {
    
  }
}
</script>

<style lang="scss">
  .dialog-setting-content-wrap{
    padding: 50px 0 50px 0;
    height: 100%;
  }
  .dialog-setting-content{
    height: 100%;
    overflow: auto;
    text-align: left;
    padding: 20px;
    padding-bottom: 0;
  }
  
  .modal-setting-footer{
    background-color: white;
  }
 
</style>
