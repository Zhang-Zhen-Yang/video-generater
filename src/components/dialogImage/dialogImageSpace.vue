/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:27:47 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-09 15:33:17
 */

// 图片空间
<template>
  <div class="dialog-image-space scrollbar-overwrite">
    <div v-if="pictureCategory">
      <imgSpaceItem v-for="item,index in pictureCategory" :data="item" :key="index">
      </imgSpaceItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog-image-space',
  data () {
    return {
    }
  },
  computed: {
    pictureCategory() {
      return this.$store.state.dialogImage.pictureCategory;
    }
  },
  methods: {

  },
  created() {
    // console.log('created');
    
  }
}
</script>

<style lang="scss">
  .dialog-image-space{
    width: 100%;
    height: 100%;
    padding-left: 5px;
  }
</style>
