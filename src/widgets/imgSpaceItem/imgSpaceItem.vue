/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:10 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2018-11-10 09:31:27
 */
// 图片空间项
<template>
  <div class="img-space-item" @click="click">
    <div class="left img-category-title relative">
      <div :class="['folder-toggle-icon', 'absolute', 'pointer', data.picture_category_id == -1 ? 'top-toggle-icon' : '']" v-if="data.children.length > 0" @click="toggleFolder">
        {{ showChild ? '-' : '+' }}
      </div><span
        class="pointer"
        @click="selectCategory(data.picture_category_id, data.picture_category_name.trim())"
        :class="{'active-category': pictureCategoryId == data.picture_category_id}">{{data.picture_category_name.trim()}}</span>
    </div>
    <div class="left img-category-children" v-if="data.children.length > 0 && showChild">
      <imgSpaceItem v-for="item,index in data.children" :data="item" :key="index">
      </imgSpaceItem>
    </div>
    <!--{{ data }}-->
  </div>
</template>

<script>
export default {
  name: 'img-space-item',
  props:{
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      showChild: true,
    }
  },
  computed: {
    pictureCategoryId (){
      return this.$store.state.dialogImage.pictureCategoryId
    }
  },
  methods: {
    click(){
      this.$emit('click');
    },
    toggleFolder() {
      this.showChild = !this.showChild;
    },
    selectCategory(id, name) {
      // alert(id);
      this.$store.state.dialogImage.pictureCategoryId = id;
      this.$store.state.dialogImage.pictureCategoryName = name;
      this.$store.dispatch('getPictureItems', {pageNo: 1});
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .img-space-item{
    padding-left: 10px;
    // padding-top:5px;
    // padding-bottom: 5px;
    // border-left: 1px solid red;
    margin-left: 10px;
    position: relative;
  }
  .img-space-item:before{
    content: '';
    position: absolute;
    left:0;
    top: -11px;
    width: 1px;
    height: 100%;
    background-color: #7D8699;
  }
  .img-category-title{
    color: #7D8699;
    font-size: 12px;
    padding-left:20px;
    line-height: 2em;
    white-space: nowrap;
  }
  .active-category{
    color: red;
  }
  .img-category-title:before{
    content: '';
    width: 20px;
    height: 1px;
    background-color: #7D8699;
    position: absolute;
    left: -9px;
    top: 12px;
  }
  .img-category-children{
    // padding-left:10px;
  }
  .folder-toggle-icon{
    width:15px;
    height: 15px;
    border: 1px solid #7D8699;
    line-height: 12px;
    text-align: center;
    left:-18px;
    top: 6px;
    background-color: white;
    z-index: 1;
  }
  .top-toggle-icon:before{
    content: '';
    position: absolute;
    left:0;
    top: -21px;
    width: 100%;
    height: 20px;
    background-color: white;
  }
</style>
