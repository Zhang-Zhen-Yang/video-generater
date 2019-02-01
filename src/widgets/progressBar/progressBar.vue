<template>
  <div class="generate-range-wrap">
    <div class="generate-range"></div>
  </div>
</template>

<script>
export default {
  name: 'v-aspect',
  props:{
   
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
  .generate-range-wrap{
    width: 100%;
    height: 8px;
    background-color: red;
  }
  .generate-range{
    width: 50%;
    height: 100%;
    background-color: yellow;
  }
</style>
