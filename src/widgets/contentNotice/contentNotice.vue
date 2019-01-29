/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:41:09 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2018-11-07 17:12:49
 */
<template>
  <table class="relative content-notice" v-if="show">
    <tr>
      <td class="center middle">
          <material-spinner v-if="lastAction == 'loading'"></material-spinner>
          <div v-if="lastAction == 'error'">
            {{ msg || '请求出错' }}
          </div>
          <div v-if="lastAction == 'success' && count == 0">
            数据为空
          </div>
      </td>
    </tr>
  </table>
  <div v-else></div>
</template>

<script>
export default {
  name: 'content-notice',
  props: {
    lastAction: {
      type: String,
      default: 'success',
    },
    count: {
      type: Number,
      default: 0,
    },
    msg: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
    }
  },
  computed: {
    show() {
      return this.lastAction == 'loading' || this.lastAction == 'error' || (this.lastAction == 'success' && this.count == 0);
    }
  },
  methods: {

  },
  created() {
    // console.log('created');
  }
}
</script>

<style lang="scss">
  .content-notice{
    width: 100%;
    height: 400px;
  }
</style>
