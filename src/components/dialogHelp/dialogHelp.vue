/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-23 09:28:27 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-23 09:38:59
 */

<template>
  <modal-dialog
    @dismiss="dismiss"
    @confirm="dismiss"
    title="帮助"
    :sty="'width: 610px;height:355px'"
    :showFooter="false"
    :showHeader="false"
  >
    
    <div class="dialog-help-content" slot="content" >
      <iframe width="610" height="355" :src="src" frameborder="0"></iframe>
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
      return this.$store.state.dialogHelp;
    },
    src() {
      let id = window.user.id,name=window.user.name,appkey=window.user.appkey;
      return `https://faqs.hz.taeapp.com/faqs?userId=${id}&username=${name}&v=0.7932155341994616`;
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
  .dialog-help-content{
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
