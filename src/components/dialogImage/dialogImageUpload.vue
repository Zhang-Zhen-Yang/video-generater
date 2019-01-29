/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:27:57 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2018-10-31 15:27:57 
 */

<!--图片空间图片上传-->
<template>
  <label class="image-upload pointer" title="上传本地图片到图片空间">
    <span class="middle font14">
      上传&nbsp;
    </span>
    <img :src="uploadIcon" alt="" class="middle">
    <input type="file" accept=".jpg,.jpeg,.png,.gif,.bmp" @change="change">
  </label>
</template>

<script>
export default {
  name: 'image-upload',
  data () {
    return {
      
    }
  },
  computed: {
    uploadIcon() {
      return `${window.assets}upload.svg`;
    }
  },
  methods: {
    change(e) {
      console.log(e);
      let files = e.target.files;
      if(files.length > 0) {
        let formdata=new FormData();
        formdata.append('imgUpload', files[0]);
        formdata.append('taobao_url', '');
        // formdata.append('WONBAO_USER_SESSION_ID', 105227988);
        // formdata.append('WONBAO_USER_SESSION_ID', 105284763);
        // e.target.value = '';
        this.$store.dispatch('imageUpload', {formdata})
      }

    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .image-upload{
    display: inline-block;
    margin-right: 10px;
    color: #1284e7;
    img{
      height: 20px;
    }
    input{
      display:none;
    }
  }
</style>
