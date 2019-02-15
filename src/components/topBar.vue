<template>
  <header id="top-bar">
    <div class="video-logo"></div>
    <span>主图视频</span>
    <h2 style="float: left;"></h2>
    <!--<span>主图视频</span>-->
    <button id="generate-btn" class="pointer" @click="generate">
      开始生成
    </button>
    <button v-if="false" id="save-btn" class="pointer" @click="saveProject">
      保存项目
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
      this.$store.dispatch('generate', {});
    },
    saveProject() {
      this.$store.dispatch('saveProject', {});
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
    // border-bottom: 1px solid #dddddd;
  }
  header {
    margin: 0;
    height: 56px;
    padding: 0 0 0 0px;
    background-color: #35495E;
    color: #ffffff;
  }
  header span {
    display: inline-block;
    position: relative;
    font-size: 22px;
    line-height: 1em;
    letter-spacing: .02em;
    // font-weight: bold;
    box-sizing: border-box;
    padding-top: 16px;
    color: #1284e7;
  }
  #generate-btn,#save-btn{
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
  #save-btn{
    background-color: white;
    color: #666666;
  }
  .video-logo{
    display: inline-block;
    width: 70px;
    height: 100%;
    // background-color: red;
    vertical-align: middle;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M170.667 768H768a42.667 42.667 0 0 1 0 85.333H128a42.667 42.667 0 0 1-42.667-42.666V213.333A42.667 42.667 0 0 1 128 170.667h768a42.667 42.667 0 0 1 42.667 42.666v597.334a42.667 42.667 0 0 1-85.334 0V256H170.667v512zm234.069-347.435a42.667 42.667 0 1 1 43.861-73.13l213.334 128a42.667 42.667 0 0 1 0 73.13l-213.334 128A42.667 42.667 0 0 1 384 640V512a42.667 42.667 0 0 1 85.333 0v52.65L557.056 512l-152.32-91.435z' fill='%231296db'/%3E%3C/svg%3E");
    background-size: contain;
    background-position: center -2px;
    background-repeat: no-repeat;
  }
</style>
