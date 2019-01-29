/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:41:23 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2018-12-01 10:44:17
 */
<template>
  <table class="dialog-tab">
    <tr>
      <td v-for="item, index in tabs">
        <div :class="{pointer: true, 'active-tab': tabIndex == index}" @click="setTabIndex(index)">
          {{ item }}
        </div>
      </td>
      <td>
      </td>
      <td>
      </td>
      <td>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'dialog-tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    modalIndex: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    /* tabIndex:{
      get(){
        return this.$store.state.modals[this.modalIndex].tabIndex;
      },
      set(val){
        this.$store.state.modals[this.modalIndex].tabIndex = val;
      }
    }*/
  },
  methods: {
    setTabIndex(index) {
      // this.tabIndex = index;
      this.$emit('setTabIndex', index)
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .dialog-tab{
    table: {

    }
    td{
      font-size: 14px;
      color: #7D8699;
      text-align: left;
      width: 100px;
      // padding-left:5px;
    }
    td>div{
      display: inline-block;
      line-height: 2em;
      border-bottom: 1px solid transparent;
    }
    .active-tab{
      border-bottom: 1px solid red;
      color: red;
    }
  }
</style>
