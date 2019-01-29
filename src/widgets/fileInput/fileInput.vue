/*
 * @Author: zhangzhenyang 
 * @Date: yyyy-01-dd 13:49:56 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: yyyy-01-dd 13:49:56 
 */
<template>
  <Input type="file" :accept="accept" @change="change" ref="input"></Input>
</template>

<script>
export default {
  props:{
    accept:{
      type:String,
      default:'',
    },
    autoClear: {
      type: Boolean,
      default: true,
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
    change(e) {
      let file = e.target.files[0];
      if(this.autoClear) {
        this.$refs.input.value = '';
      }
      this.$emit('change', {file})
    }
  }
}
</script>
<style>

</style>
