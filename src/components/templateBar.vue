/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-21 15:44:09 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 14:23:53
 */

<template>
  <div id="tempalte-bar">
    <!--模板-->
    <div class="side-bar-menu-wrap">
      <div class="side-bar-menu template-menu" title="模板" @click="openTemplateDialog">
      
      </div>
    </div>
    <!--音频-->
    <div class="side-bar-menu-wrap">
      <div class="side-bar-menu audio-menu" title="音频" @click="openAudioDialog">
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tempalteBar',
  data () {
    return {
      msg: 'tempalteBar'
    }
  },
  computed: {
    dialogTemplate() {
      return this.$store.state.dialogTemplate;
    },
    dialogAudio() {
      return this.$store.state.dialogAudio;
    }
  },
  methods: {
    openTemplateDialog(){
      this.dialogTemplate.show = true;
    },
    openAudioDialog(){
      this.dialogAudio.show = true;
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #tempalte-bar{
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    background-color: #35495E;;
    .side-bar-menu-wrap{
      text-align: center;
      margin: 20px 0;
    }
    .side-bar-menu{
      width: 35px;
      height:35px;
      display: inline-block;
      background-size: contain;
      backgroun-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .template-menu{
      background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1064 1024' xmlns='http://www.w3.org/2000/svg' width='207.813' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M764.367 86.907h-648.15c-14.585 0-27.024 12.44-27.024 27.024v527.614c0 15.013 12.44 27.024 27.024 27.024h648.15c14.585 0 26.595-12.01 26.595-27.024V113.931c0-14.585-12.01-27.024-26.595-27.024zm83.646 268.525v287.399c0 44.183-36.461 80.644-80.644 80.644H270.211v187.453c0 14.155 12.01 25.737 27.024 25.737h647.722c15.013 0 27.024-11.582 27.024-25.737V381.169c0-14.155-12.01-25.737-27.024-25.737h-96.944zm0-54.907h96.944c46.327 0 84.075 36.032 84.075 80.644v529.759c0 44.611-37.748 81.072-84.075 81.072H297.235c-46.328 0-84.075-36.461-84.075-81.072V723.475H112.785c-44.182 0-80.644-36.461-80.644-80.644V112.643c0-44.182 36.461-80.644 80.644-80.644h654.584c44.182 0 80.644 36.461 80.644 80.644v187.882z' fill='%238fc248'/%3E%3C/svg%3E");

    }
    .audio-menu{
      background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M512.021 889.899a32 32 0 0 1-32-32V165.184a32 32 0 1 1 64 0v692.715a32 32 0 0 1-32 32zM314.816 732.18a32 32 0 0 1-32-32V303.808a32 32 0 1 1 64 0v396.373a32 32 0 0 1-32 32zm405.205 0a32 32 0 0 1-32-32V303.808a32 32 0 1 1 64 0v396.373a32 32 0 0 1-32 32zm-602.389-123.52a32 32 0 0 1-32-32V469.12a32 32 0 1 1 64 0v107.541a32 32 0 0 1-32 32zm793.387 0a32 32 0 0 1-32-32V469.12a32 32 0 1 1 64 0v107.541a32 32 0 0 1-32 32z' fill='%231284e7'/%3E%3C/svg%3E");
    }
  }
</style>
