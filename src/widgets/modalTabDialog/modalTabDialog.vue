/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:48 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-07-13 16:54:12
 */
// 模态框
<template>
  <transition name="dialog-fade">
    <div class="new-dialog">
      <blockSlice :dir="'horizontal'" :staticIndex="0" :staticValue="'260px'">
        <div slot="s" style="height: 100%;">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-right:10px;">
                <!--向左-->
                <div style="width: 110px;height: 165px;" class="tabs-dialog-left pointer" @click="left">
                  <v-center :css="{width: '100%', height:'100%'}">
                    <div class="icon icon-left">
                    </div>
                  </v-center>
                </div>
              </td>
              <td>
                <!--取消选择-->
                <div class="tabs-dialog-pic-warp tabs-dialog-dismiss pointer" @click="dismiss">
                <v-center :css="{width: '100%', height:'100%'}">
                    <div class="icon icon-delete">

                    </div>
                    <div>取消选择</div>
                </v-center>
                </div>
              </td>
            </tr>
          </table>

        </div>
        <div slot="e" style="height: 100%;">
          <blockSlice :dir="'horizontal'" :staticIndex="1" :staticValue="'110px'">
            <div slot="s" style="height: 100%;height:100%;">
              <!--向右-->
              <div style="width: 110px;height: 165px;" class="tabs-dialog-left pointer" @click="right">
                  <v-center :css="{width: '100%', height:'100%'}">
                    <div class="icon icon-left icon-right-transform">
                    </div>
                  </v-center>
                </div>
            </div>
            <div
              slot="e"
              class="scrollbar-overwrite"
              @mousewheel="mousewheel($event)"
              @DOMMouseScroll="mousewheel($event)"
              style="width:100%;height:100%;white-space:nowrap;overflow:auto;"
              ref="wrap"
            >
              <slot></slot>
            </div>
          </blockSlice>
        </div>
      </blockSlice>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal-tab-dialog',
  props: {
  },
  data () {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    mousewheel(e) {
      let scrollLeft = this.$refs.wrap.scrollLeft;
      let clientWidth = this.$refs.wrap.clientWidth;
      let scrollWidth = this.$refs.wrap.scrollWidth;
      let down = (e.deltaY > 0 || e.detail > 0) ? true : false;
      let o = 100;
      // 向下
      if(down) {
        if(scrollLeft + clientWidth + o >=  scrollWidth) {
          this.$refs.wrap.scrollLeft = scrollWidth - clientWidth;
        } else {
          this.$refs.wrap.scrollLeft += o;
        }
      } else {
        if(scrollLeft - o <= 0) {
          this.$refs.wrap.scrollLeft = 0
        } else {
          this.$refs.wrap.scrollLeft -= o;
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
    },
    left() {
      let scrollLeft = this.$refs.wrap.scrollLeft;
      let clientWidth = this.$refs.wrap.clientWidth;
      let scrollWidth = this.$refs.wrap.scrollWidth;
      if(scrollLeft - clientWidth <= 0) {
        this.$refs.wrap.scrollLeft = 0
      } else {
        this.$refs.wrap.scrollLeft -= clientWidth;
      }
    },
    right() {
      let scrollLeft = this.$refs.wrap.scrollLeft;
      let clientWidth = this.$refs.wrap.clientWidth;
      let scrollWidth = this.$refs.wrap.scrollWidth;
     

      if(scrollLeft + clientWidth + clientWidth >=  scrollWidth) {
          this.$refs.wrap.scrollLeft = scrollWidth - clientWidth;
        } else {
          this.$refs.wrap.scrollLeft += clientWidth;
        }
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .new-dialog{
    position: absolute;
    left: 0;
    top: 92px;
    width: 100%;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid #eee;
    z-index: 5;
  }
  .new-dialog table{
    height: 100%;
  }
  .new-dialog td{
    vertical-align: middle;
  }
  .tabs-dialog-pic-warp{
    width: 140px;
    height: 165px;
    background-color: red;
    border-radius: 12px;
    display: inline-block;
  }

  .tabs-dialog-left{
    background-color: transparent;
  }
  .tabs-dialog-left .icon{
    width: 45px;
    height: 45px;
    display: inline-block;
    background-color: #3caaa3;
    border-radius: 50%;
    background-size: 60% 60%;
    background-position:center center;
    background-repeat:no-repeat;
  }

  .icon-right-transform{
    transform: scale(-1,1);
  }




  .tabs-dialog-dismiss{
    background-color: #fdebcb;
    text-align: center;
  }
  .tabs-dialog-dismiss .icon{
    width: 45px;
    height: 45px;
    background-color: #ff9e01;
    border-radius: 50%;
    display: inline-block;
    background-size: 60% 60%;
    background-position:center center;
    background-repeat:no-repeat;
  }
  .template-item-wrap{
    width: 140px;
    padding: 10px;
    display: inline-block;
    text-align: center;
  }

  .template-item{
    width:100%;
    height: 100%;
    border: 1px solid #aaaaaa;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 2em;
    font-size: 14px;
  }

  
  .dialog-fade-enter-active,.dialog-fade-leave-active{
    transition: opacity .2s ease-in;
  }
  .dialog-fade-enter, .dialog-fade-leave-active {
    opacity: 0;
  }

</style>
