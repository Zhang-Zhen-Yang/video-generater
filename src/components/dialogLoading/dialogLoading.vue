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
    :sty="'width: 300px;height:150px'"
    :showFooter="false"
    :showHeader="false"
  >
    
    <div class="dialog-loading-content" slot="content" >
      <div class="generate-step2">
        <div style="position: absolute;width: 100%;height: 90%;">
          <material-spinner></material-spinner>
        </div>
        <div class="font14" style="position: absolute;bottom: 30px;width: 100%;text-align:center;">
            上传中···
        </div>
      </div>
    </div>
  </modal-dialog>
</template>

<script>
export default {
  name: 'dialog-loading',
  components: {  },
  data () {
    return {
      loading: 50,
    }
  },
  computed: {
    modal(){
      return this.$store.state.dialogGenerate;
    },
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
  .dialog-loading-content{
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
