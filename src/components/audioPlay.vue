<template>
  <div id="audio-play">
    <audio :src="src" controls ref="audio" loop id="audio"></audio>
  </div>
</template>

<script>
export default {
  name: 'audio-play',
  data () {
    return {
      msg: 'audio-play'
    }
  },
  computed: {
    dialogAudio() {
      return this.$store.state.dialogAudio;
    },
    idMapAudio() {
      return this.$store.getters.idMapAudio;
    },
    selectedAudioID() {
      return this.dialogAudio.selectedAudioID;
    },
    src() {
      let aurl = '';
      if(this.$store.state.dialogAudio.audioFrom == 'net') {
        if(this.selectedAudioID != null) {
          aurl =  `data:audio/mp3;base64,${this.idMapAudio[this.selectedAudioID]}`;
        } else {
          aurl = '';
        }
      } else if(this.$store.state.dialogAudio.audioFrom == 'local'){
        let audioData = this.$store.state.dialogAudio.audioData;
        let audioType = this.$store.state.dialogAudio.audioType;

        this.checkPaused();
        aurl =  `${audioType},${audioData}`;
      }
      // this.checkPaused();
      return aurl;
    },
    // 播放到的位置
    position() {
      return this.$store.state.position;
    },
    playing() {
      return this.$store.state.playing;
    },
    timeline() {
      return this.$store.state.timeline || {duration: 0};
    }
  },
  methods: {
    checkPaused(){
      try{
        if(this.playing) {
          try{
            // console.log(this.audio.currentSrc);
            this.audio.play();
          }catch(e){
            console.log(e);
          }
        } else {
          this.audio.pause();
        }
      }catch(e){
        // console.warn(e);
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.audio = this.$refs.audio;
    // console.log('this.audio.paused', this.audio.paused);
  },
  watch: {
    // 监听是否播放
    playing(nVal, oVal) {
      if(!this.src) return;
      try{
        if(nVal) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }catch(e){
        console.log(e);
      }
    },
    // 监听播放位置的改变
    position(nVal, oVal) {
      if(!this.src) {
        return;
      }
      let audioDuration = this.audio.duration * 1000;
      let shouldPosition = this.position % audioDuration;
      try{
        // console.log(shouldPosition);
        let audiocurrentTime = this.audio.currentTime * 1000;
        if((Math.abs(shouldPosition - audiocurrentTime) > 500) || (nVal < oVal)) {
          this.audio.currentTime =  shouldPosition / 1000;
        }
        // console.log(this.audio.currentTime);
      }catch(e){

      }
    },
    // 监听音频的改变
    src(nVal, oVal) {
      setTimeout(()=>{
        // console.log(nVal);
        if(nVal) {
          this.checkPaused();
        }
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  #audio-play{
    position: fixed;
    left: 10px;
    top: 10px;
    background-color: #aaaaaa;
    display: none;

  }
</style>
