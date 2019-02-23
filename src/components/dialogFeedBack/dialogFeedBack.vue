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
    title="我要吐槽"
    :sty="'width: 1000px;height:430px'"
    :showFooter="false"
    :showHeader="false"
  >
    
    <div class="dialog-feedback-content" slot="content" >
      <iframe width="1000" height="430" :src="src" frameborder="0"></iframe>
      <div class="dismiss pointer" @click="dismiss">&times;</div>
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
export default {
  name: 'dialog-feedback',
  components: {  },
  data () {
    return {
      loading: 50,
    }
  },
  computed: {
    modal(){
      return this.$store.state.dialogFeedBack;
    },
    src() {
      let id = window.user.id,name=window.user.name,appkey=window.user.appkey;

      return `https://faqs.hz.taeapp.com/search/talk/index.html?userid=${id}&appkey=${appkey}&username=${name}`;
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
  .dialog-feedback-content{
    width: 100%;
    height: 100%;
    // overflow: auto;
    text-align: left;
    .dismiss{
      position: absolute;
      right: 10px;
      top: 2px;
      background-color: rgba(255,255,255,1);
      font-size: 28px;
    }
  }
</style>
