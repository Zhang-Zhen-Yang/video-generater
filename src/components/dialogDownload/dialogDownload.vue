/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-19 10:24:09 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-19 10:53:46
 */

<template>
  <modal-dialog
    @dismiss="dismiss"
    @confirm="dismiss"
    title="下载"
    :sty="'width: 400px;height:200px'"
    :showFooter="false"
    :showHeader="true"
  >
    
    <div class="dialog-download-content" slot="content" >
      <v-center :css="{width: '100%', height: '200px'}">
        <div id="download-wrap">

        </div> 
      </v-center>
        
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
// import VueSlideBar from 'vue-slide-bar';
export default {
  name: 'dialog-generate',
  components: {  },
  data () {
    return {
      loading: 50,
    }
  },
  computed: {
    modal(){
      return this.$store.state.dialogDownload;
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



</style>
