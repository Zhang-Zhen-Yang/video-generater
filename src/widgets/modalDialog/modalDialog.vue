/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:48 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2018-12-03 09:10:04
 */
// 模态框
<template>
  <transition name="dialog-fade">
    <div class="modal-dialog-mask" @click="backclick">
      <div class="modal-dialog-wrap">
        <div class="modal-dialog" @click="" :style="sty">
          <!-- header -->
          <div class="modal-dialog-header" v-if="showHeader">
            <table>
              <tr>
                <td class="modal-dialog-title">
                  <span>{{ title }}</span>

                  <span v-if="showBack" @click="back" class="history-back">返回</span>
                </td>
                <td class="modal-dialog-dismiss">
                  <span class="pointer modal-dialog-dismiss-btn" @click="dismiss">&times;</span>
                </td>
              </tr>
            </table>
            <slot name="subHeader"></slot>
          </div>

          <slot name="content"></slot>
          <!-- content -->
          
          <!-- footer -->
          <div class="modal-dialog-footer" v-if="showFooter">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal-dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    // 是否可以通过点击背景关闭
    allowBackDismiss:{
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    sty: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    backclick(evt) {
      if(this.allowBackDismiss){
        if(evt.target.className == 'modal-dialog-wrap'){
          this.$emit('dismiss');
        }
      }
    },
    dismiss() {
      this.$emit('dismiss');
    },
    confirm() {
      this.$emit('confirm');
    },
    back() {
      this.$emit('back');
    }
    
    
  },
  created() {
  }
}
</script>

<style lang="scss">
  .modal-dialog-mask{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    display: table;
    z-index: 100;
  }
  .modal-dialog-wrap{
    display: table-cell;
    width: 100%;
    height:100%;
    text-align: center;
    vertical-align: middle;
  }
  .modal-dialog{
    width: 900px;
    height: 600px;
    max-width: 100%;
    max-height: 100%;
    margin:0 auto;
    background-color: white;
    position: relative;
  }
  .modal-dialog-header{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    padding:0px 10px;
    background-color: #efefef;
    td{
      vertical-align: middle
    }
    .modal-dialog-title{
      text-align: left;
    }
    .modal-dialog-dismiss{
      text-align: right;
      font-size: 30px;
    }

    table{
      width: 100%;

    }
  }
  .modal-dialog-dismiss-btn{
    color: #aaaaaa;
  }
  .modal-dialog-dismiss-btn:hover{
     color: #777777;
  }

  // footer
  .modal-dialog-footer{
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    padding:5px 10px;
    // background-color: #efefef;
    border-top: 1px solid #eeeeee;
    td{
      vertical-align: middle
    }
    table{
      width: 100%;
    }
  }
  .dialog-goods-title{
    font-size: 12px;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  a:hover{
    color: red;
  }
  
  .dialog-fade-enter-active,.dialog-fade-leave-active{
    transition: opacity .2s ease-in;
  }
  .dialog-fade-enter, .dialog-fade-leave-active {
    opacity: 0;
  }
  .history-back{
    font-size: 13px;
    color: #1284e7;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
