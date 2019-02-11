/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-23 17:32:23 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-11 17:51:42
 */

<template>
  <div id="canvas-size-options" class="scrollbar-overwrite">
    <div
      v-for="item, index in options"
      :class="['size-item', 'pointer', project.width == item.value[0] && project.height == item.value[1]? 'size-active' : 'size-inactive' ]"
      @click="setSize(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas-size-options',
  data () {
    return {
      msg: 'canvas-size-options',
      options: [
        {
          label: '400 × 400',
          value: [400, 400]
        },
        {
          label: '600 × 600',
          value: [600, 600]
        },
        {
          label: '800 × 800',
          value: [800, 800]
        },
        {
          label: '800 × 600',
          value: [800, 600]
        },
        {
          label: '600 × 800',
          value: [600, 800]
        },
        {
          label: '640 × 480',
          value: [640, 480]
        },
        {
          label: '800 × 480',
          value: [800, 480]
        },
        {
          label: '720 × 480',
          value: [720, 480]
        },
        {
          label: '960 × 540',
          value: [960, 540]
        },
        {
          label: '1280 × 720',
          value: [1280, 720]
        },
      ]
    }
  },
  computed: {
    project() {
      return this.$store.state.project;
    }
  },
  methods: {
    setSize(val) {
      this.$store.commit('setSize', {val});
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #canvas-size-options{
    position: absolute;
    left: 10px;
    top: 50px;
    background-color: #fefefe;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    max-height: 90%;
    max-height: calc(100% - 60px);
    overflow: auto;
  }
  .size-item{
    padding: 10px;
    font-size: 14px;
    color: #333333;
    text-align: center;
    white-space: nowrap;
  }
  .size-item:hover{
    color: #1284e7;
  }
  .size-active{
    color: #1284e7;
  }
</style>
