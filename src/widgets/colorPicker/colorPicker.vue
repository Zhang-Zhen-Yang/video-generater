// 颜色选择器
<template>
  <div>
    <div class="content-item-sub-title"><div class="color-tip" :style="{backgroundColor: value}"></div>{{title}}</div>
    <div v-clickoutside="closePopup" @click="openPopup" class="relative">
      <input type="text" class="content-item-input" :value="value" readonly="readonly" @focus="focus">
      <div class="absolute" style="z-index: 1;">
        <chrome-picker :value="value" @input="colorChange" v-show="showPicker"/>
      </div>
    </div>
  </div>
</template>

<script>
import clickoutside from '../../directives/clickoutside';
import { Sketch, Chrome } from 'vue-color'
export default {
  name: 'color-picker',
  components: {sketchPicker: Sketch, ChromePicker: Chrome},
  directives:{ clickoutside },
  props:{
    value: {
      type: String,
      default: '#ffffff',
    },
    title: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      showPicker: false,
    }
  },
  computed: {

  },
  methods: {
    colorChange(e){
      // console.log(e);
      let color = `rgba(${e.rgba.r},${e.rgba.g},${e.rgba.b},${e.rgba.a})`;
      this.$emit('input', color)
    },
    openPopup(){
      this.showPicker = true;
    },
    closePopup() {
      this.showPicker = false;
    },
    focus() {
      this.$emit('focus');
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .color-tip{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 3px;
    vertical-align: -4px;
    border:1px solid #eeeeee
  }
</style>
