<template>
  <div id="audio-play">
    <audio :src="src" controls ref="audio" loop></audio>
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
      if(this.$store.state.dialogAudio.audioFrom == 'net') {
        if(this.selectedAudioID != null) {
          return `data:audio/mp3;base64,${this.idMapAudio[this.selectedAudioID]}`;
        }
        return '';

      } else if(this.$store.state.dialogAudio.audioFrom == 'local'){
        let audioData = this.$store.state.dialogAudio.audioData;
        let audioType = this.$store.state.dialogAudio.audioType;
        return `${audioType},${audioData}`;
      }
      return '';
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
      if(nVal) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    // 监听播放位置的改变
    position(nVal, oVal) {
      if(!this.src) {
        return;
      }
      let audioDuration = this.audio.duration * 1000;
      let shouldPosition = this.position % audioDuration;
      // console.log(shouldPosition);
      let audiocurrentTime = this.audio.currentTime * 1000;
      if(Math.abs(shouldPosition - audiocurrentTime) > 100) {
        this.audio.currentTime =  shouldPosition / 1000;
      }

      // console.log(this.audio.currentTime);
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
