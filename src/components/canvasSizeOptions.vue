/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-23 17:32:23 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-25 14:09:08
 */

<template>
  <div>
    <div id="canvas-size-ratio" style="" class="font14" @click.stop="">
      <div
        :class="['pointer', 'size-ratio-tab', index==sizeIndex ? 'ratio-active-tab' : 'ratio-inactive-tab']"
        v-for="item, index in ['1:1', '16:9','3:4']"
        @click="sizeIndex = index"
      >
        {{ item }}
      </div>
      <!--<label class="radioWrap" style="margin-left: 5px;">
        <input type="radio" name="size-radio" value="0" v-model="sizeIndex"><div class="radio sm"></div><span>1:1</span>
      </label>
      <label class="radioWrap" style="margin-left: 5px;">
        <input type="radio" name="size-radio" value="1" v-model="sizeIndex">
        <div class="radio sm"></div><span>16:9</span>
      </label>
      <label class="radioWrap" style="margin-left: 5px;">
        <input type="radio" name="size-radio" value="2" v-model="sizeIndex">
        <div class="radio sm"></div><span>3:4</span>
      </label>-->
    </div>
    <div id="canvas-size-options" class="scrollbar-overwrite">
      <div
        v-for="item, index in opts[sizeIndex]"
        :class="['size-item', 'pointer', project.width == item.value[0] && project.height == item.value[1]? 'size-active' : 'size-inactive' ]"
        @click="setSize(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'canvas-size-options',
  data () {
    return {
      msg: 'canvas-size-options',
      sizeIndex: 0,
      opts: [
        // 1:1
        [
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
            label: '1000 × 1000',
            value: [1000, 1000]
          },
        ],
        // 16:9
        [
          {
            label: '1024 × 576',
            value: [1024, 576]
          },
          {
            label: '1366 × 768',
            value: [1366, 768]
          },
          {
            label: '1280 × 720',
            value: [1280, 720]
          },
          {
            label: '1600 × 900',
            value: [1600, 900]
          },
        ],
        // 3:4
        [
          {
            label: '300 × 400',
            value: [300, 400]
          },
          {
            label: '600 × 800',
            value: [600, 800]
          },
          {
            label: '768 × 1024',
            value: [768, 1024]
          },
          {
            label: '900 × 1200',
            value: [900, 1200]
          },
          {
            label: '960 × 1280',
            value: [960, 1280]
          },
        ],
      ],
     
      options: [
        
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
    // top: 50px;
    top: 80px;
    background-color: #fefefe;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    max-height: 90%;
    max-height: calc(100% - 80px);
    overflow: auto;
    width: 130px;
  }
  #canvas-size-ratio{
    border: 1px solid #ddd;
    border-bottom: none;
    background-color: #fefefe;
    width: 130px;
    height: 32px;
    position: absolute;
    left: 10px;
    top: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    // padding: 4px 2px;
  }
  .size-item{
    padding: 10px 20px;
    font-size: 14px;
    color: #333333;
    text-align: left;
    white-space: nowrap;
  }
  .size-item:hover{
    color: #1284e7;
  }
  .size-active{
    color: #1284e7;
  }
  .size-ratio-tab{
    width: 33.3%;
    display: inline-block;
  }
  .ratio-active-tab{
    background-color: #1284e7;
    color: white;
    line-height: 30px;
  }
  
</style>
