/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-10 16:43:16 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-11 09:05:21
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
          <div  class="relative">
            <VueSlideBar
              v-model="quality"
              :lineHeight="8"
            ></VueSlideBar>
          </div>
          <p></p>
          <div>
            帧数
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
export default {
  name: 'dialog-setting',
  components: { VueSlideBar },
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
  }
  
  .modal-setting-footer{
    background-color: white;
  }
 
</style>
