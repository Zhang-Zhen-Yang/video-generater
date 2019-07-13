/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-22 13:58:26
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 14:19:30
 */

<template>

  <modalTabDialog @dismiss="dismiss">
    <div class="template-item-wrap" v-for="item,index in list" :key="item.name">
      <div class="template-item pointer"  @click="setTemplate(item)">
        <aspect :ratio="0.9">
          <div class="template-item-show" :style="{backgroundImage: `url(${item.cover})`}">
          
          </div>
        </aspect>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </modalTabDialog>
 

   
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
      return 'https://img.alicdn.com/imgextra/i2/105227988/O1CN01RODt6p28sYHB9HBe6-105227988.jpg';//`${window.assets}empty.jpg`;
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
  
  
  .modal-dialog-footer{
    background-color: white;
  }
  .template-item-show{
    height:100%;
    background-position: center; 
    background-size: 90% auto;
    background-repeat: no-repeat;
  }





</style>
