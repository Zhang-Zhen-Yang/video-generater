<template>
  <div id="time-wrap">
    <div id="time-line">
      <slide-bar
        v-model="position"
        :data="data"
        :range="range"
        :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
        :processStyle="{ backgroundColor: '#d8d8d8' }"
        @callbackRange="callbackRange"
        @dragStart="dragStart"
        @dragEnd="dragEnd"
        @clickSet="clickSet">
        <template slot="tooltip" slot-scope="tooltip">
          <div style="width: 20px;height: 20px;margin-top:5px;" class="handler-drag">
          </div>
          
        </template>
      </slide-bar>
      <div class="currernt-time" style="">{{ position.toFixed(1) }}</div>
    </div>
    <img :src="sliderHandle">
  </div>
</template>

<script>
// import VueSlideBar from 'vue-slide-bar';
export default {
  name: 'time-line',
  components: { /*VueSlideBar*/ },
  data () {
    return {
      msg: 'time-line',
      dragging: false,
      slider: {
        value: 2.9,
        data: [
          15,
          30,
          45,
          60,
          75,
          90,
          120
        ],
        range: [
          {
            label: '0 s'
          },
          {
            label: '1 s',
            isHide: true
          },
          {
            label: '2 s'
          },
          {
            label: '3 s',
            isHide: true
          },
          {
            label: '4 s'
          },
          {
            label: '5 s',
            isHide: true
          },
          {
            label: '2 hrs'
          }
        ]
      }
    }
  },
  computed: {
    sliderHandle() {
      return `${window.assets}rectangle-slider.svg`;
    },
    project() {
      return this.$store.state.project;
    },
    timeline() {
      return this.$store.state.timeline;
    },
    duration() {
      if(this.timeline) {
        return this.timeline.duration;
      }
      return 0;
    },
    value() {
      0.1
    },
    data() {
      let data = [];
      for(let i = 0; i < this.duration / 100; i++) {
        data.push(i/10);
      }
      // console.log(data);
      return data;
    },
    range() {
      return this.data.map((item, index)=>{
        if (item % 1  == 0 ) {
          return {
            label: `${item} s`,
            isHide: false
          }
        }
        return {
          label: `${item} s`,
          isHide: true
        }
      })
    },
    playing() {
      return this.$store.state.playing;
    },
    position:{
      get: function() {
        let val = (this.$store.state.position / 1000).toFixed(1) || 0;
        val = parseFloat(val);
        // this.slider.value = 
        return val;
      },
      set: function(e) {
          if(this.playing) {
            return;
          }
          // console.log(e);
          if(this.dragging) {
            this.$store.commit('setPosition', {position: e*1000});
          }
      }
    }
  },
  methods: {
    dragStart() {
      this.dragging = true;
    },
    dragEnd(){
      this.dragging = false;
    },
    // 点击
    clickSet(e) {
      // console.log(e);
      this.$store.commit('setPosition', {position: e*1000});
      this.$store.commit('setAudioPosition');
    },
    callbackRange(e) {
      // let val = parseFloat(e.label) * 1000;
      // this.$store.commit('setPosition', {position: val});
      /* if(this.dragging) {
        console.log(e);
      }*/
    }
  },
  created() {
    
  },
  mounted() {
    setTimeout(()=>{
      this.slider.value = 1;
    })
  }
}
</script>

<style lang="scss">
  #time-wrap{
    width: 100%;
    height: 75px;
    
    position: absolute;
    left: 0;
    bottom:0;
    padding-left: 80px;
    padding-right: 540px
  }
  #time-line{
    width: 100%;
    height: 100%;
    // background-color: #1284e7;
    background-clip: content-box;
    position: relative;
  }
  .vue-slide-bar-separate{
    width: 1px!important;
    background-color: #35495E;
  }
  .vue-slide-bar-tooltip-top img{
    // width: 15px;
  }
  .vue-slide-bar-tooltip-container{
    transition: none!important;
  }
  .currernt-time{
    position: absolute;
    right:-30px;
    bottom:10px;
    color: #35495E;
    font-weight: bold;
    font-size: 12px;
  }
  .handler-drag{
    background-position: center;
    background-repeat:no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='26' viewBox='0 0 20 26'%3E%3Cpath fill='%231066FD' fill-rule='evenodd' d='M2 0h16a2 2 0 0 1 2 2v14.917a1 1 0 0 1-.367.774L10 25.573.367 17.691A1 1 0 0 1 0 16.917V2a2 2 0 0 1 2-2z'/%3E%3C/svg%3E");
  }
</style>
