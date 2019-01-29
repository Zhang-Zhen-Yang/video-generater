/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 15:08:59 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 15:09:38
 */
<template>
  <div id="options">
    <!--title-->
    <div class="options-title">
      配置
    </div>
    <!--body-->
    <div class="options-body">
      <div class="scrollbar-overwrite">
      <!--inner-->
        <div style="padding:20px 80px 20px 20px;">
          
          <div>
            <div class="content-item-sub-title">
              价格标签
            </div>
            <div class="effect-word-item-wrap" v-for="item, index in wordEffectItems">
              <div :class="['effect-word-item', 'pointer', wordEffect == item ? 'is-current-word-effect': '']" @click="setEffectWords(item)">
                  {{ item }}
              </div>
            </div>
          
          </div>
          <!--{{ item.type }} 
          {{ activeIndex }}-->
          
          <div v-if="wordEffect != 'null'" v-for="item, index in wordEffectOptions">
            <div class="content-item-sub-title">
              {{ item.name }}
            </div>
            <input class="content-item-input" type="text" v-model="item.value"  v-if="item.type == 'input'" @input="optionsCallback(index, $event)">
          </div>
          
          <p>
          </p>

          <div class="content-item-sub-title">
            当前图片
          </div>
          <mask-replace :text="'选择图片'"  :showImageUpload="true" @select="select" @change="imageChange(0, $event)">
            <img :src="item.pic_url" alt="" class="pic-item">
          </mask-replace>
        </div>





      </div>
    </div>
    <!-- <div>
      <img :src="item.pic_url" alt="" class="pic-item">
    </div>

    <file-input :accept="'.png,.jpg'" @change="imageChange(index, $event)"></file-input>-->

  </div>
</template>

<script>
import effectWords from '../script/effectWords/index';
export default {
  name: 'options',
  data () {
    return {
      msg: 'options'
    }
  },
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
    project() {
      return this.$store.state.project;
    },
    wordEffectOptions() {
      return this.project.wordEffectOptions;
    },
    queue() {
      return this.project.queue;
    },
    item() {
      if(this.queue && this.queue[this.activeIndex]) {
        return this.queue[this.activeIndex];
      }
      return {}
    },
    wordEffect() {
      return this.$store.state.project.wordEffect;
    },
    wordEffectItems(){
      let items = Object.keys(effectWords);
      items.unshift('null');
      return items;
    }
  },
  methods: {
    select(e) {
      this.$store.state.dialogImage.selectedPic = this.item.pic_url;
      this.$store.state.dialogImage.itemData = this.item;
      this.$store.state.dialogImage.show = true;
    },

    imageChange(index,e) {
      let file = new FileReader();
      file.readAsDataURL(e.file);
      file.onload = () => {
        this.queue[this.activeIndex].pic_url = file.result;
        this.queue[this.activeIndex].file = e.file;
        this.$store.commit('update');
        // console.log(file.result);
      }
      
      // console.log([i,j]);
    },
    optionsCallback(index, e) {
      if(this.wordEffectOptions && (typeof this.wordEffectOptions[index])) {
        this.wordEffectOptions[index].callback(e);
      }
    },
    setEffectWords(item) {
      this.$store.dispatch('setEffectWords', {type: item});
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #options{
    height: 100%;
    // overflow: auto;
    background-color: #F0F8FF;
    border-left: 1px solid #cccccc;
    .pic-item{
      max-width: 100%;
      vertical-align: middle;
    }
    .options-title{
      height: 48px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      line-height: 48px;
      font-size: 20px;
      padding-left: 20px;
      border-bottom: 1px solid #cccccc;
      // background-color: 
    }
    .options-body{
      height: 100%;
      border-top: 48px solid transparent;
    }
    .options-body>div{
      height: 100%;
      overflow: auto;
    }
    .effect-word-item-wrap{
      display: inline-block;
      width: 33.3%;
      height: 130px;
      padding: 0 10px 10px 0;
    }
    .effect-word-item{
      width: 100%;
      height: 100%;
      background-color: #efefef;
      border: 1px solid transparent;
      text-align: center;
      line-height: 100px;
    }
    .is-current-word-effect{
      border: 1px solid #1284e7;
    }
  }
</style>
