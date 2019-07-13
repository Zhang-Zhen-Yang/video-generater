<template>
  <header id="top-bar">
    <div class="video-logo"></div>
    <span>主图视频</span>
    <h2 style="float: left;"></h2>
    <!--<span>主图视频</span>-->

    <table cellspacing="0" cellpadding="0" style="height: 90px;float:right;">
      <tr>
        <td style="vertical-align:middle;">
          <button id="generate-btn" class="pointer" @click="generate">
            开始生成
          </button>
          <button v-if="false" id="save-btn" class="pointer" @click="saveProject">
            保存项目
          </button>
        </td>
      </tr>
    </table>
    <topBarTabs></topBarTabs>
    
  </header>
</template>

<script>
import topBarTabs from './topBarTabs.vue';
export default {
  name: 'top-bar',
  components: {
    topBarTabs
  },
  data () {
    return {
      msg: 'top-bar'
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
    z-index: 10
    // border-bottom: 1px solid #dddddd;
  }
  header {
    margin: 0;
    height: 90px;
    padding: 0 0 0 0px;
    // background-color: #35495E;
    // background-image: linear-gradient(90deg,#4574f1 0,#00abf3);
    background-color: white;
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
    vertical-align: -4px;
    margin-left: 6px;
    // color: #1284e7;
    // color: #00abf3;
    color: #3caaa3;
    font-family: 微软雅黑!important;
    font-weight: 100;
  }
  #generate-btn,#save-btn{
    color: #3caaa3;
    float: right;
    font-size: 20px;
    padding: 15px 25px;
    min-width: 150px;
    outline: none;
    border: 2px solid;
    background-color: #ffffff;
    margin-right: 80px;
    vertical-align: middle;
    border-radius: 12px;
  }
  #save-btn{
    background-color: white;
    color: #666666;
  }
  .video-logo{
    display: inline-block;
    width: 50px;
    height: 100%;
    margin-left: 210px;
    // background-color: red;
    vertical-align: middle;
    // background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M170.667 768H768a42.667 42.667 0 0 1 0 85.333H128a42.667 42.667 0 0 1-42.667-42.666V213.333A42.667 42.667 0 0 1 128 170.667h768a42.667 42.667 0 0 1 42.667 42.666v597.334a42.667 42.667 0 0 1-85.334 0V256H170.667v512zm234.069-347.435a42.667 42.667 0 1 1 43.861-73.13l213.334 128a42.667 42.667 0 0 1 0 73.13l-213.334 128A42.667 42.667 0 0 1 384 640V512a42.667 42.667 0 0 1 85.333 0v52.65L557.056 512l-152.32-91.435z' fill='%231296db'/%3E%3C/svg%3E");
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M960.43 332.778l-133.022 45.025V260.87c0-23.403-18.967-42.376-42.372-42.376H73.8c-23.404 0-42.377 18.972-42.377 42.376v482.09l-.556 24.56c0 23.4 18.972 42.377 42.377 42.377h711.793c23.404 0 42.372-18.976 42.372-42.376V686.45l133.022 45.02c23.404 0 42.376-18.972 42.376-42.372V375.155c-.002-23.404-18.973-42.377-42.377-42.377zM563.526 531.451L403.788 651.987a20.995 20.995 0 0 1-12.585 4.202c-3.183 0-6.366-.735-9.324-2.201-7.076-3.51-11.562-10.773-11.562-18.684V401.57a20.93 20.93 0 0 1 11.3-18.56c6.892-3.55 15.275-2.977 21.657 1.51l159.742 113.196a20.909 20.909 0 0 1 8.81 16.721 20.92 20.92 0 0 1-8.3 17.013z' fill='%233caaa3'/%3E%3C/svg%3E");
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
