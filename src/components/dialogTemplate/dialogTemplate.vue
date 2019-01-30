/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-22 13:58:26
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 14:19:30
 */

<template>
  <modal-dialog @dismiss="dismiss" @confirm="dismiss" title="选择模板">
    

    <!--ontent-->
    <div class="dialog-template-content-wrap" slot="content" >
      <div style="height: 100%;overflow:auto;padding: 10px;" class="scrollbar-overwrite">
        <div class="dialog-template-content">

          <div class="template-item-wrap" v-for="item,index in list">
            <div v-if="false" class="template-item" :style="{backgroundImage: `url(${item.cover})`}" @click="setTemplate(item)">
              {{ item.name }}
            </div>
            <div class="template-item pointer" :style="{backgroundImage: `url(${emptyImg})`}" @click="setTemplate(item)">
              {{ item.name }}
            </div>
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
import templates from '../../script/templates/templates';
export default {
  name: 'dialog-template',
  components: { },
  data () {
    return {
    }
  },
  computed: {
    emptyImg() {
      return `${window.assets}empty.jpg`;
    },
    modal(){
      return this.$store.state.dialogTemplate;
    },
    list() {
      return templates;
    }
  },
  methods: {
    dismiss(){
      this.modal.show = false;
    },
    confirm() {
      alert('yes');
    },
    setTemplate(temp) {
      this.$store.dispatch('setTemplate', temp);
      this.modal.show = false;
    }


  },
  created() {
    
  }
}
</script>

<style lang="scss">
  .dialog-template-content-wrap{
    height: 100%;
    text-align:left;
    // overflow: auto;
    padding: 50px 0 50px 0;
  }
  .template-item-wrap{
    width: 33.3%;
    height: 200px;
    padding: 10px;
    display: inline-block;
  }
  .template-item{
    width:100%;
    height: 100%;
    border: 1px solid #aaaaaa;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 150px;
  }
  .modal-dialog-footer{
    background-color: white;
  }
</style>
