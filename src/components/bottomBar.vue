<template>
  <div id="bottom-bar">
    LOG
    <div id="log"></div>
    <div id="asm-status">
      {{ asmInitedStatus }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'bottom-bar',
  data () {
    return {
      msg: 'bottom-bar'
    }
  },
  computed: {
    asmInitedStatus() {
      return  this.$store.state.asmInitedStatus;
    }
  },
  methods: {

  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #bottom-bar{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: white;
  }
  #log{
    display: inline-block;
  }
  #asm-status{
    position: absolute;
    right: 0;
    height: 100%;
    top:0;
    padding-right: 10px;
  }
</style>
