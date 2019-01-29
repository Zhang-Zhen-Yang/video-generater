<template>
  <div class="v-aspect" :style="css">
    <div :style="innerSty" class="v-aspect-inner">
      <div class="v-aspect-content">
        <slot name="default"></slot>
      </div>      
    </div>    
  </div>
</template>

<script>
export default {
  name: 'v-aspect',
  props:{
    ratio:{
      type:Number,
      default: 1
    },
    css:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data () {
    return {
      msg: '动态组件'
    }
  },
  computed:{
    innerSty(){
      return {paddingBottom:this.ratio*100+'%'};
    },
    sty(){
      let style = {        
      }
      try{
        for(let i in this.css){
          style[i] = this.css[i];
          console.log(i);
        }
      }catch(e){
        console.log('aspect',e);
      }
      console.log();
      if(this.ratio){
        style.paddingBottom = this.ratio*100+'%';
      }
      return style
    }
  },
  methods:{
    
  }
}
</script>
<style>
.v-aspect{
  position:relative;
}
.v-aspect-inner{
  height:0;
}
.v-aspect-content{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}

</style>
