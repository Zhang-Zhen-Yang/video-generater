<template>
  <header id="top-bar">
    <span>mainpic</span>
    <h2 style="float: left;"></h2>
    <!--<span>主图视频</span>-->
    <button id="generate-btn" class="pointer" @click="generate">
      开始生成
    </button>
  </header>
</template>

<script>
export default {
  name: 'temp',
  data () {
    return {
      msg: 'temp'
    }
  },
  computed: {
    
  },
  methods: {
    // 开始生成
    generate() {
      this.$store.dispatch('generate', {})
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss" scope>
  #top-bar{
    position: absolute;
    width: 100%;
    left: 0;
    top:0;
  }
  header {
    margin: 0;
    height: 56px;
    padding: 0 0 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }
  header span {
    display: inline-block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }
  #generate-btn{
    background-color: #1284e7;
    color: #fff;
    float: right;
    font-size: 20px;
    padding: 0 30px;
    min-width: 150px;
    height: 100%;
    outline: none;
    border: none;
  }
</style>
