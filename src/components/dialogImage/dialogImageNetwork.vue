<template>
  <div class="dialog-image-network">
      <div style="padding: 10px;">
        <table style="table-layout:fixed;width: 100%;">
          <tr>
            <td style="width: 8em;">
              <span class="font14">请输入图片链接:</span>
            </td>
            <td style="position: relative;">
              <input type="text" v-model="selectedPic" class="content-item-input">
              <div v-if="selectedPic" class="dismiss pointer" @click="clearAddress">&times;</div>
            </td>
          </tr>
        </table>
      </div>
      <img v-if="!error" class="selected-image-display" :src="selectedPic" alt="">
      <div v-else class="image-network-error-msg">无法使用该图片,可能是链接错误或图片不允许被外部调用。</div>
  </div>
</template>

<script>
import util from '../../script/util.js';
export default {
  name: 'dialog-image-network',
  data () {
    return {
      msg: 'dialog-image-network',
      error: false,
    }
  },
  computed: {
     md() {
      return this.$store.state.dialogImage;
    },
    // 选中的图片
    selectedPic: {
      get() {
        if(this.md.selectedPic) {
          var img = util.NImage(this.md.selectedPic);
          img.onerror = (e)=>{
            // alert('ddd');
            // console.log(img.src);
            if(img.src.indexOf(this.md.selectedPic) > -1) {
              this.error = true;
            }
          }
          img.onload = () =>{
            if(img.src.indexOf(this.md.selectedPic) > -1) {
              this.error = false;
            }
          }
          // console.log('ddddd');
        }
        return this.md.selectedPic;
      },
      set(url) {
        this.md.selectedPic = url;
        
      }
    }
  },
  methods: {
    clearAddress() {
      this.selectedPic = '';
    }
  },
  created() {
    
  },
  watch: {
    selectedPic(nVal, oVal) {
      
    }
  }
}
</script>

<style lang="scss">
  .dialog-image-network{
    width: 100%;
    height: 100%;
    // background-color: red;
    .selected-image-display{
      width: 100%;
      height: 380px;
      object-fit: contain;
      object-position: center;
    }
    .dismiss{
      position: absolute;
      width: 34px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      right: 0;
      top: 0;
      font-size: 20px;
    }
    .dismiss:hover{
      color: red;
    }
    .image-network-error-msg{
      color: red;
      margin-top: 10px;
    }
  }
</style>
