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
          <!--水印===================================================================================================== -->
          <div>
            <div class="content-item-sub-title">
              <toggle  v-model="useWatermark"></toggle>&emsp;<span style="vertical-align: -4px;" class="font16 bold">水印</span> 
            </div>
            <div v-if="useWatermark" class="option-block-wrap" style="">
              <table cellspacing="0" cellpadding="0" style="width: 100%;" >
                <tr>
                  <td rowspan="3" style="width: 40%;">
                    <div style="width: 100%;">
                      <mask-replace
                        :text="'选择图片'"
                        :showImageUpload="true"
                        @select="watermarkImageSelect"
                        @change="watermarkImageChange(0, $event)"
                      >
                        <img v-if="project.watermark":src="project.watermark" alt="" class="pic-item">
                        <div v-else class="empty-water-mark">
                        </div>
                      </mask-replace>
                    </div>
                  </td>
                  <td style="padding:0 0 0 10px;">
                    <span class="font14">大小</span>
                    <div class="relative">
                      <input type="range" style="width: 100%;" min="0.01" max="1" step="0.01" v-model="watermarkScale">
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 0 10px;">
                    <span class="font14">不透明度</span>
                    <div class="relative">
                      <input type="range" style="width: 100%;" min="0" max="1" step="0.01" v-model="watermarkAlpha">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 0 10px;">
                    <span  class="font14">位置</span>
                    <select name="" id="" style="margin-top: 8px;" v-model="watermarkPosition">
                      <option v-for="item in wartermarkPositions" :value="item.value">{{ item.name }}</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            
          </div>

          <!--价格标签=============================================================================================-->
          <div>
            <div class="content-item-sub-title">
              <toggle v-model="useEffectWord"></toggle>&emsp;<span style="vertical-align: -4px;" class="bold">价格标签</span>
            </div>
 
            <div v-if="useEffectWord" class="option-block-wrap">
              <div  class="effect-word-item-wrap" v-for="item, index in wordEffectItems">
                <div :class="['effect-word-item', 'pointer', wordEffect == item ? 'is-current-word-effect': '']" @click="setEffectWords(item)">
                    {{ item }}
                </div>
              </div>
              <div v-for="item, index in wordEffectOptions">
                <div class="content-item-sub-title" v-if="item.type!='color'">
                  {{ item.name }}
                </div>
                <input class="content-item-input" type="text" v-model="item.value"  v-if="item.type == 'input'" @input="optionsCallback(index, $event)">
                <color-picker v-if="item.type == 'color'" v-model="item.value" title="颜色" @input="optionsCallback(index, $event)"></color-picker>
              </div>
            
            </div>
          
          </div>

          
          
          <p>
          </p>

          <!--
          <div class="content-item-sub-title">
            当前图片
          </div>
          <mask-replace :text="'选择图片'"  :showImageUpload="true" @select="select" @change="imageChange(0, $event)">
            <img :src="item.pic_url" alt="" class="pic-item">
          </mask-replace>
          -->


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
import VueSlideBar from 'vue-slide-bar';
import effectWords from '../script/effectWords/index';
export default {
  name: 'options',
  components: {VueSlideBar},
  data () {
    return {
      msg: 'options',
      wartermarkPositions: [
        {
          name: '正中方',
          value: 'Center',
        },
        {
          name: '正上方',
          value: 'North',
        },
        {
          name: '正下方',
          value: 'South',
        },
        {
          name: '左边',
          value: 'West',
        },
        {
          name: '右边',
          value: 'East',
        },
        {
          name: '左上角',
          value: 'NorthWest',
        },
        {
          name: '左下角',
          value: 'SouthWest',
        },
        {
          name: '右上角',
          value: 'NorthEast',
        },
        {
          name: '右下角',
          value: 'SouthEast',
        },
      ]
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
      // items.unshift('null');
      return items;
    },
    // 是否使用水印
    useWatermark: {
      get() {
        return this.project.useWatermark;
      },
      set(val) {
        this.project.useWatermark = val;
        this.$store.commit('update');
      }
    },
    // 是否使用effectWord
    useEffectWord: {
      get(){
        return this.project.useEffectWord;
      },
      set(val){
        this.project.useEffectWord = val;
        this.$store.commit('update');
      }
    },
    // 水印位置
    watermarkPosition: {
      get() {
        return this.project.watermarkPosition;
      },
      set(val) {
        this.project.watermarkPosition = val;
        this.$store.commit('updateWatermark');
      }
    },
    // 水印不透明度
    watermarkAlpha: {
      get() {
        return this.project.watermarkAlpha;
      },
      set(val) {
        this.project.watermarkAlpha = val;
        this.$store.commit('updateWatermark');
      }
    },
    // 水印大小
    watermarkScale: {
      get() {
        return this.project.watermarkScale;
      },
      set(val) {
        this.project.watermarkScale = val;
        this.$store.commit('updateWatermark');
      }
    },

  },
  methods: {
    // 选择图片（弹出图片选择弹窗）
    select(e) {
      this.$store.state.dialogImage.selectedPic = this.item.pic_url;
      this.$store.state.dialogImage.itemData = this.item;
      this.$store.state.dialogImage.show = true;
    },
    watermarkImageSelect() {
      this.$store.state.dialogImage.selectedPic = this.project.watermark;
      this.$store.state.dialogImage.itemData = this.project;
      this.$store.state.dialogImage.show = true;
    },
    // 更改图片
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
    // 水印图来自本地
    watermarkImageChange(index, e) {
      let file = new FileReader();
      file.readAsDataURL(e.file);
      file.onload = () => {
        /*this.queue[this.activeIndex].pic_url = file.result;
        this.queue[this.activeIndex].file = e.file;
        this.$store.commit('update');*/
        // console.log(file.result);
        this.project.watermark = file.result;
        this.$store.commit('update');
      }
    },
    optionsCallback(index, e) {
      if(this.wordEffectOptions && (typeof this.wordEffectOptions[index])) {
        this.wordEffectOptions[index].callback(e);
      }
    },
    // 设置价格标签
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
      max-height: 100%;
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
  .empty-water-mark{
    width: 200px;
    height: 160px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M39.153 69.27V972.8h963.765V69.27H39.153zm60.235 843.295V789.082l162.636-168.658 105.411 117.458-171.67 177.694H99.388zm843.294 0h-665.6l433.694-439.718 228.895 219.859v219.859zm-231.906-530.07L406.588 683.67 262.024 533.082 99.388 701.742V129.505h843.294v475.859l-231.906-222.87z' fill='%232c2c2c'/%3E%3Cpath d='M262.024 201.788c-51.2 0-90.353 39.153-90.353 90.353s39.153 90.353 90.353 90.353 90.352-39.153 90.352-90.353-39.152-90.353-90.352-90.353zm0 120.47c-18.071 0-30.118-12.046-30.118-30.117s12.047-30.117 30.118-30.117 30.117 12.047 30.117 30.117-12.047 30.118-30.117 30.118z' fill='%232c2c2c'/%3E%3C/svg%3E");
    background-size: contain;
    background-position: center;
    background-repeat:no-repeat;
  }
  .option-block-wrap{
    background-color: #fefefe;
    padding: 10px;
    border: 1px solid #dddddd;
  }
</style>
