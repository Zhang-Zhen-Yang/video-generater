/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:35:29 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2018-10-31 15:35:29 
 */
// 居中组件
<template>
  <div class="v-center" :style="css" >
    <div class="v-center-content" :class="'v-'+type">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    css:{
      type:Object,
      default(){
        return {};
      }
    },
    type:{
      type:String,
      default:'centerInParent'
    }
  },
  name: 'v-center',
  data () {
    return {
      msg: 'center'
    }
  },
  computed:{
  },
  methods:{
    
  }
}
</script>
<style>
 .v-center{
   display:table;
 }
 .v-center-content{
   display:table-cell;
   width:100%;
   height:100%;
   
 }
 .v-middle{
   vertical-align:middle;
 }
 .v-center{
   text-align:center;
 }
 .v-centerInParent{
   vertical-align:middle;
   text-align:center;
 }
</style>
