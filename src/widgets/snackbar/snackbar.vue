/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:43:19 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-11-dd 14:54:15
 */
<template>
  <transition name="fade">
    <div class="v-snackbar" v-if="isShow">
      {{ text }}
      <button @click="isShow=false">
      OK
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'snackbar',
  data () {
    return {
      msg: 'snackbar',
      isShow:false,
      text:'',
      show(text,timeout){
        if(this.timeout){
          clearTimeout(this.timeout);
        }
        this.isShow = true;
        this.text = text;
        this.timeout = setTimeout(()=>{
          this.isShow = false;
        },timeout)
      }
    }
  },
  computed:{
    
  },
  methods:{
    
  },
  mounted(){
  }
}
</script>

<style>
  .v-snackbar{
    position:fixed;
    display:inline-block;
    color:white;
    padding:8px 10px 8px 20px;
    font-size:14px;
    top:50%;
    left:50%;
    -webkit-transform:translate(-50%,0);
    transform:translate(-50%,0);
    background-color:#2C3E50;
    z-index: 100;
    opacity: 1;
  }
  .v-snackbar button{
    margin-left:50px;
    border:none;
    outline:none;
    background-color:transparent;
    cursor:pointer;
    font-size:16px;
    padding:5px 10px;
    color:#ffeb3b;
    border-radius:3px;
  }
  .v-snackbar button:hover{
    background-color:rgba(255,255,255,0.1);
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-out;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
    top: 45%;
    opacity: 0;
  }
</style>
