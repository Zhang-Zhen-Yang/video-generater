<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-15 09:17:39
 * @LastEditTime: 2019-02-15 13:58:56
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div id="app" @dragover="dragover" @drop="drop">
    <topBar></topBar>
    <div class="work-space-wrap">
      
      <workSpace></workSpace>
    </div>
    <!-- <page-bottom></page-bottom>-->
    <!--<dialogTemplate v-if="dialogTemplate.show"></dialogTemplate>-->
    <dialogTemplateNew v-if="dialogTemplate.show"></dialogTemplateNew>
    <!--<dialogAudio v-if="dialogAudio.show"></dialogAudio>-->
    <dialogAudioNew v-if="dialogAudio.show"></dialogAudioNew>
    <dialogGenerate v-if="dialogGenerate.show"></dialogGenerate>
    <dialogSetting v-if="dialogSetting.show"></dialogSetting>
    <dialogDownload v-show="dialogDownload.show"></dialogDownload>
    <dialogFeedBack v-show="dialogFeedBack.show"/>
    <dialogHelp v-show="dialogHelp.show"/>
    <bottom-bar></bottom-bar>
    <audio-play></audio-play>
    <dialogImage v-if="dialogImage.show"></dialogImage>
    <dialogLoading v-if="uploading"></dialogLoading>
    <snackbar ref="snackbar"></snackbar>
  </div>
</template>

<script>
import topBar from './components/topBar';
import workSpace from './components/workSpace';
import dialogImage from './components/dialogImage/dialogImage';
import dialogTemplate from './components/dialogTemplate/dialogTemplate';
import dialogTemplateNew from './components/dialogTemplate/dialogTemplate.new.vue';
import dialogAudio from './components/dialogAudio/dialogAudio';
import dialogAudioNew from './components/dialogAudio/dialogAudio.new.vue';
import dialogGenerate from './components/dialogGenerate/dialogGenerate';
import dialogSetting from './components/dialogSetting/dialogSetting';
import dialogDownload from './components/dialogDownload/dialogDownload';
import dialogFeedBack from './components/dialogFeedBack/dialogFeedBack';
import dialogHelp from './components/dialogHelp/dialogHelp';
import dialogLoading from './components/dialogLoading/dialogLoading';
import bottomBar from './components/bottomBar';
import audioPlay from './components/audioPlay';
export default {
  name: 'app',
  components: {
    topBar,
    workSpace,
    dialogImage,
    dialogTemplate,
    dialogTemplateNew,
    dialogAudio,
    dialogAudioNew,
    dialogGenerate,
    dialogSetting,
    dialogDownload,
    dialogFeedBack,
    dialogHelp,
    bottomBar,
    audioPlay,
    dialogLoading,
  },
  computed: {
    dialogImage() {
      return this.$store.state.dialogImage;
    },
    dialogTemplate() {
      return this.$store.state.dialogTemplate;
    },
    dialogAudio() {
      return this.$store.state.dialogAudio;
    },
    dialogGenerate() {
      return this.$store.state.dialogGenerate;
    },
    snackbar(){
      return this.$store.state.snackbar;
    },
    dialogSetting() {
      return this.$store.state.dialogSetting;
    },
    dialogDownload() {
      return this.$store.state.dialogDownload;
    },
    dialogFeedBack() {
      return this.$store.state.dialogFeedBack;
    },
    dialogHelp() {
      return this.$store.state.dialogHelp;
    },
    // 是否在上传
    uploading() {
      return this.$store.state.dialogDownload.uploading;
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    this.$store.dispatch('init');
    window.jsonpCallback = (data)=>{
      this.$store.dispatch('jsonpCallback', data);
    }
  },
  mounted() {
    // console.log('this.$api', OSS.Wrapper);
    this.$store.dispatch('initOSSinitConfig');
  },
  methods:{
    dragover(e) {
      e.preventDefault();
    },
    drop(e) {
      e.preventDefault();
      let files = e.dataTransfer.files;
      if(files.length > 0) {
        // console.log(files[0]);
        let fileName = files[0].name;
        if(fileName.indexOf('.temp') + 5 == fileName.length) {
          let fileReader = new FileReader();
          fileReader.onload = () =>{
            // console.log(fileReader.result);
            this.$store.state.project = JSON.parse(fileReader.result);
            this.$store.commit('update');
          }
          fileReader.readAsText(files[0]);
          // alert('ddddd');
        }
      }
      // console.log(e.dataTransfer);
      
    }
  },
  watch:{
    snackbar:{
      handler(e){
        if(e.show){
          this.$refs.snackbar.show(this.snackbar.text, this.snackbar.timeout);
          this.$store.state.snackbar.show=false;
        }
      },
      deep: true,
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family:  'Avenir', Helvetica, Arial, sans-serif, 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: fixed;
  width: 100%;
  height: 100%;
}

#app *{
  box-sizing: border-box;
}
.work-space-wrap{
  width: 100%;
  height: 100%;
  border-top: 90px solid transparent;
  border-bottom:40px solid #35495E;

}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
