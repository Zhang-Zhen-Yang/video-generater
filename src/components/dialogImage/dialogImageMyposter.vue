/*
 * @Author: zhangzhenyang 
 * @Date: 2018-12-20 08:58:55 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-12-dd 08:59:41
 */

<template>
  <!--海报 content-->
    <div class="dialog-image-content-wrap" slot="content" style="padding-left:0;padding-bottom: 58px;">
      <div class="dialog-image-content scrollbar-overwrite">
        <!--{{ lastAction }} {{ selectedPic }}-->
        <div v-for="item,index in list" class="dialog-image-item" v-if="lastAction=='success'">
          <v-center :css="{width: '100%', height: '100%', border: selectedPic == item.pictureUrl ? '1px solid #1284e7' : '1px solid #cccccc'}">
            <div
              :style="{width: '100%', height: '100%', backgroundImage: `url(${item.pictureUrl})`}"
              class="dialog-image-img pointer relative"
              @click="selectImage(item.pictureUrl)"
            >
              <img class="absolute dialog-image-checked-icon" :src="checkedIcon" alt="" v-if="selectedPic == item.pictureUrl">
            </div>
          </v-center>
        </div>
        <content-notice :lastAction="lastAction" :count="list.length"></content-notice>
        <!--
        <img src="http://imgs.aixifan.com/content/2018_10_16/1.5396650631967232E9.png" alt="" style="width:100%;">
        <img src="http://imgs.aixifan.com/content/2018_10_16/1.5396650563707078E9.png" alt="" style="width:100%;">-->
      </div>
    </div>
</template>

<script>
export default {
  name: 'dialogImageMyposter',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    md() {
      return this.$store.state.dialogImage;
    },
    lastAction() {
      return this.md.myposterLastAction;
    },
    list() {
      return this.md.myposterList;
    },
    // 选中的图片
    selectedPic: {
      get() {
        return this.md.selectedPic;
      },
      set(url) {
        this.md.selectedPic = url;
      }
    },
    checkedIcon() {
      return `${window.assets}checked.svg`
    },

  },
  methods: {
    selectImage(pic_url) {
      this.$store.state.dialogImage.selectedPic = pic_url;
    },
  },
  created() {
    // console.log('created');
    if(this.list.length == 0){
      this.$store.dispatch('myposerFetch', {pageNo: 1});
    }
  }
}
</script>

<style lang="scss">

</style>
