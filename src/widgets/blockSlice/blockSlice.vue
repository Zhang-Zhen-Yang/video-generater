<template>
    <div class="block-slice" v-if="dir=='vertical'" :style="verticalExpandStyle">
      <div :style="verticalStaticStyle">
        <slot name="s"/>  
      </div>
      <slot name="e"/>
    </div>
    <div class="block-slice" v-else :style="horizontalExpandStyle">
      <div :style="horizontalStaticStyle">
        <slot name="s"/>  
      </div>
      <slot name="e"/>
    </div>
</template>

<script>
export default {
  name: 'block-slice',
  props:{
    dir: {
      type: String,
      default: 'vertical'
    },
    staticIndex: {
      type:　Number,
      default: 0
    },
    staticValue: {
      type: String,
      default: '100px',
    }
    
  },
  data () {
    return {
      msg: 'block-slice'
    }
  },
  computed:{
    verticalStaticStyle() {
      let style = {
        height: this.staticValue,
        width: '100%',
        position: 'absolute',
      };
      if(this.staticIndex == 0) {
        style.top = 0;
      } else {
        style.bottom = 0; 
      }
      return style;
    },
    verticalExpandStyle() {
      let style = {};
      if(this.staticIndex == 0) {
        style.paddingTop = this.staticValue;
      } else {
        style.paddingBottom = this.staticValue; 
      }
      return style;
    },
    horizontalStaticStyle() {
      let style = {
        width: this.staticValue,
        height: '100%',
        position: 'absolute',
      };
      if(this.staticIndex == 0) {
        style.left = 0;
      } else {
        style.right = 0; 
      }
      return style;
    },
    horizontalExpandStyle() {
      let style = {};
      if(this.staticIndex == 0) {
        style.paddingLeft = this.staticValue;
      } else {
        style.paddingRight = this.staticValue; 
      }
      return style;
    }
  },
  methods:{
    
  }
}
</script>
<style>
  .block-slice{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
