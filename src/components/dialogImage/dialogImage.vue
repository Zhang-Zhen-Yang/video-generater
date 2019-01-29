/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:27:40 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-12-dd 09:10:14
 */

/* 图片空间列表弹窗*/
<template>
  <modal-dialog @dismiss="dismiss(3)" @confirm="dismiss(3)" title="选择图片">
    <!-- subHeader-->
    <table slot="subHeader">
      <tr>
        <td class="left">
          <dialog-tab :tabs="['海报素材','我的海报','图片空间']" :tabIndex="tabIndex" @setTabIndex="(index)=>{tabIndex = index;}"></dialog-tab>
        </td>
        <td style="width:350px;">
          <!--手动输入图片链接-->
          <div class="left img-input">
            <input type="text" v-model="selectedPic"><button class="btn primary" @click="confirmImgLink">确定</button>
          </div>
        </td>
        <td class="right" style="width: 70px;">
          <!--<search-input value="ha ha ha" @search="search"></search-input>&emsp;-->
          <!--图片上传-->
          <dialogImageUpload v-if="tabIndex == 2"></dialogImageUpload>
        </td>
      </tr>
    </table>

    <!--图片空间  content-->
    <div class="dialog-image-content-wrap" slot="content" v-if="tabIndex == 2">
      <!--图片空间列表-->
      <div style="position: absolute;left:0;top:0;width: 250px;top: 90px;height:450px;overflow:auto;" class="scrollbar-overwrite" >
        <imageSpace></imageSpace>
      </div>
      <!--图片空间图片显示 -->
      <div class="dialog-image-content scrollbar-overwrite">
        <div v-for="item,index in goodslist" class="dialog-image-item" v-if="lastAction=='success'">
          <v-center :css="{width: '100%', height: '100%', border: selectedPic == item.pic_url ? '1px solid #1284e7' : '1px solid #cccccc'}">
            <div
              :style="{width: '100%', height: '100%', backgroundImage: `url(${item.pic_url})`}"
              class="dialog-image-img pointer relative"
              @click="selectImage(item.pic_url)"
            >
              <img class="absolute dialog-image-checked-icon" :src="checkedIcon" alt="" v-if="selectedPic == item.pic_url">
            </div>
          </v-center>
        </div>
        <content-notice :lastAction="lastAction" :count="goodslist.length"></content-notice>
        
        <!--{{ itemData }}-->
      </div>
    </div>
    <!--我的海报-->
    <dialogImageMyposter slot="content" v-if="tabIndex == 1"></dialogImageMyposter>




    <!--海报 content-->
    <div class="dialog-image-content-wrap" slot="content" v-if="tabIndex == 0" style="padding-left:0;padding-bottom: 90px;">
      <div class="left" style="padding-left:15px;">
        <dropdown
          :data="industrys"
          :width="100"
          :cbCustomSelectedText="()=>{return dropdownPosterLabel('industry')}"
          :cbChanged="(e) => { setDropdownPosterLabel('industry', e) }"
        ></dropdown> 
        <dropdown
          :data="tags"
          :width="100"
          :cbCustomSelectedText="()=>{return dropdownPosterLabel('tag')}"
          :cbChanged="(e) => { setDropdownPosterLabel('tag', e) }"
        ></dropdown> 
        <dropdown 
          :data="colors"
          :width="100"
          :cbCustomSelectedText="()=>{return dropdownPosterLabel('color')}"
          :cbChanged="(e) => { setDropdownPosterLabel('color', e) }"
        ></dropdown> 
        <dropdown 
          :data="posterSort"
          :width="100"
          :cbCustomSelectedText="()=>{return dropdownPosterLabel('sort')}"
          :cbChanged="(e) => { setDropdownPosterLabel('sort', e) }"
        ></dropdown> 
      </div>
      <div class="dialog-image-content scrollbar-overwrite">

        <div v-for="item,index in posterList" class="dialog-image-item" v-if="posterLastAction=='success'">
          <v-center :css="{width: '100%', height: '100%', border: selectedPic == item.pic_url ? '1px solid #1284e7' : '1px solid #cccccc'}">
            <div
              :style="{width: '100%', height: '100%', backgroundImage: `url(${item.pic_url})`}"
              class="dialog-image-img pointer relative"
              @click="selectImage(item.pic_url)"
            >
              <img class="absolute dialog-image-checked-icon" :src="checkedIcon" alt="" v-if="selectedPic == item.pic_url">
            </div>
          </v-center>
        </div>
        <content-notice :lastAction="posterLastAction" :count="posterList.length"></content-notice>
        <!--
        <img src="http://imgs.aixifan.com/content/2018_10_16/1.5396650631967232E9.png" alt="" style="width:100%;">
        <img src="http://imgs.aixifan.com/content/2018_10_16/1.5396650563707078E9.png" alt="" style="width:100%;">-->
      </div>
    </div>

    <!--footer-->
    <table slot="footer">
      <tr>
        <td class="left">
          <!--<span>已选{{ 555555 }}/{{ allowCount }}</span>-->
          <pagination-simple :pageNo="pageNo" @goToPage="goToPage" v-if="tabIndex == 2" :hasNext="hasNext"></pagination-simple>
          <!--海报素材-->
          <pagination v-if="tabIndex == 0" :pageSize="posterPageSize" :pageNo="posterPageNo" :count="posterCount" @goToPage="posterGoToPage"></pagination>
          <!--我的海报-->
          <pagination v-if="tabIndex == 1" :pageSize="myposterPageSize" :pageNo="myposterPageNo" :count="myposterCount" @goToPage="myposterGoToPage"></pagination>
        </td>
        <td>
        </td>
        <td class="right">
          <button class="btn white" @click="confirm(false)">取消</button>
          <button class="btn primary" @click="confirm(true)">确定</button>
        </td>
      </tr>
    </table>
  </modal-dialog>
</template>

<script>
import imageSpace from './dialogImageSpace';
// import goodslist from '../../script/fakegoodslist';
import dialogImageUpload from './dialogImageUpload';
import dialogImageMyposter from './dialogImageMyposter';

export default {
  name: 'temp',
  components: {imageSpace, dialogImageUpload, dialogImageMyposter},
  data () {
    return {
      posterSort:[{
        label: '综合人气',
        value: '综合人气'
      }, {
        label: '上新时间',
        value: '上新时间',
      }]
    }
  },
  computed: {
    md() {
      return this.$store.state.dialogImage;
    },
    tabIndex: {
      get() {
        return this.md.tabIndex;
      },
      set(index) {
        this.md.tabIndex = index;
      }
    },
    goodslist(){
      // return goodslist.list;
      return this.md.list;
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
    modal(){
      return this.$store.state.dialogImage;
    },
    lastAction() {
      return this.md.lastAction;
    },
    itemData() {
      return this.md.itemData;
    },
    itemIndex(){
      return this.md.itemIndex;
    },
    allowCount() {
      return this.md.allowCount;
    },
    pageNo() {
      return this.md.pageNo;
    },
    hasNext(){
      // alert([this.md.list.length, this.md.pageSize]);
      if(this.md.list.length < this.md.pageSize) {
        return false;
      }
      return this.md.hastNext;
    },
    numIids() {
      return this.itemData.list.map((item)=>{
        return item.num_iid;
      });
    },
    // 海报列表-------------------------------------------------------------------------------------------------------
    posterList() {
      return this.md.posters;
    },
    pictureCategory() {
      return this.$store.state.dialogImage.pictureCategory;
    },
    checkedIcon() {
      return `${window.assets}checked.svg`
    },
    posterLabel(){
      return this.$store.state.dialogImage.posterLabel;
    },
    // 颜色
    colors() {
      if(this.posterLabel && this.posterLabel.colors) {
        return this.posterLabel.colors.map((item)=>{
          return {
            label: item,
            value: item,
          }
        });
      }
    },
    // 分类
    industrys(){
      if(this.posterLabel && this.posterLabel.industrys) {
        return this.posterLabel.industrys.map((item)=>{
          return {
            label: item,
            value: item,
          }
        });
      }
    },
    // 标签
    tags(){
      if(this.posterLabel && this.posterLabel.tags) {
        return this.posterLabel.tags.map((item)=>{
          return {
            label: item,
            value: item,
          }
        });
      }
    },
    posterPageSize(){
      return this.md.posterPageSize;
    },
		posterPageNo(){
      return this.md.posterPageNo;
    },
		posterCount(){
      return this.md.posterCount;
    },
    posterLastAction(){
      return this.md.posterLastAction;
    },
    myposterPageSize(){
      return this.md.myposterPageSize;
    },
		myposterPageNo(){
      return this.md.myposterPageNo;
    },
		myposterCount(){
      return this.md.myposterCount;
    },
    myposterLastAction(){
      return this.md.myposterLastAction;
    }
  },
  methods: {
    dismiss(){
      this.modal.show = false;
    },
    confirm(replace) {
      if(replace) {
        // alert(this.selectedPic);
        if(this.selectedPic){
          this.itemData.pic_url = this.selectedPic;
          this.$store.commit('update');
        }
        // this.$store.dispatch('addStep');
        /* if(this.itemData.list) {
          if(this.itemData.list[this.itemIndex]) {
            this.itemData.list[this.itemIndex].pic_url = this.selectedPic;
          } else {
            this.itemData.list.push({
              pic_url: this.selectedPic,
              link: ''
            })
          }
        } else if(this.itemData.pic_url!= undefined){
          // alert(this.itemData.pic_url)
          // this.$set(this.itemData, 'pic_url', this.selectedPic)
          this.itemData.pic_url = this.selectedPic;
        }*/
      };
      this.dismiss();
    },

    // 搜索
    search(value) {
      alert(value);
    },
    selectImage(pic_url) {
      this.$store.state.dialogImage.selectedPic = pic_url;
    },
    goToPage(page) {
      // alert(page);
      this.$store.dispatch('getPictureItems', {pageNo: page})
    },
    dropdownPosterLabel(type){
      return this.md[type];
    },
    setDropdownPosterLabel(type, e) {
      let value = e[0].value;
      this.md[type] = value;
      this.posterGoToPage(1);
    },
    posterGoToPage(page) {
      this.$store.dispatch('getPosterTemplates', {pageNo: page});
    },
    myposterGoToPage(page) {
      this.$store.dispatch('myposerFetch', {pageNo: page});
    },
    confirmImgLink() {
      this.confirm(true)
    }
  },
  created() {
    if(this.posterList.length == 0){
      this.posterGoToPage(1);
    }
    if(!this.pictureCategory) {
      this.$store.dispatch('getPictureCategory');
    }
    if(this.goodslist.length == 0) {
      this.$store.dispatch('getPictureItems', {pageNo: 1});
    }
    if(!this.posterLabel || !this.posterLabel.success){
      this.$store.dispatch('getPosterLabel');
    }
  }
}
</script>

<style lang="scss">
  // content
  .dialog-image-content-wrap{
    width: 100%;
    height: 100%;
    padding-top: 90px;
    padding-left: 250px;
    padding-bottom: 60px;
    // position: relative;
  }
  .dialog-image-content{
    height: 100%;
    overflow: auto;
    padding: 0 10px;
    text-align: left;
    .dialog-goods-item{
      display: inline-block;
      width: 20%;
      padding: 5px;
      text-align: left;
      table{
        border: 1px solid #aaaaaa;
      }
      img{
        width: 100%;
      }
      td{
        // padding: 5px;
      }
    }
  }
  .dialog-image-item{
    display: inline-block;
    width: 20%;
    height: 116px;
    padding: 5px;
    // border: 1px solid #eeeeee;
    vertical-align: middle;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .dialog-image-img{
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;

  }
  .dialog-image-checked-icon{
    right: -1px;
    bottom: -1px;
    width: 40%;
  }
  .img-input{
    input{
      height: 25px;
      border: 1px solid #aaaaaa;
      border-right: none;
      outline: none;
    }
    input:focus{
      border: 1px solid #1284e7;
      border-right: none;
    }
    button{
      padding: 5px 8px;
      border-radius:0 3px 3px 0;
      vertical-align: -1px;
    }
  }
  
  
</style>
