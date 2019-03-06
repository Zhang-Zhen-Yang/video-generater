/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-19 10:24:09 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-06 17:58:37
 */

<template>
  <modal-dialog
    @dismiss="dismiss"
    @confirm="dismiss"
    title="生成完毕"
    :sty="'width: 600px;height:420px'"
    :showFooter="false"
    :showHeader="true"
  >
    
    <div class="dialog-download-content" slot="content" style="padding: 50px 20px 0 10px;">
      <div class="font14">
        视频生成完毕，您可以填写下列表单上传到图片空间或点击下方按钮下载到本地！
      </div>
      <div id="download-wrap" class="btn primary font14 relative" style="margin:5px 0"></div> 
      <table cellspacing="0" cellpadding="0" style="width: 100%;" class="upload-table">
        <tr>
          <td class="font14" style="width: 4em;">标题</td>
          <td>
            <input type="text" class="content-item-input" v-model="title">
          </td>
        </tr>
        <tr>
          <td class="font14">标签</td>
          <td>
            <input type="text" class="content-item-input" v-model="label">
          </td>
        </tr>
        <tr>
          <td class="font14">封面</td>
          <td>
            <div class="relative current-video-cover" style="width: 150px;height: 150px;border:1px solid #1284e7;">
              <img :src="coverUrl" alt="" style="width:100%;height: 100%;object-fit:contain;object-position:center;">
              <div class="sub-cover-imgs absolute" style="width: 350px;">
                <aspect v-for="goods in goodsList" :css="{width:'25%', display: 'inline-block'}">
                  <div style="width: 100%;height: 100%;padding:5px;">
                    <img :src="goods.url" class="pointer" alt="" style="max-width: 100%;max-height;" @click="selectCover(goods.url);">
                  </div>
                </aspect>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td></td>
          <td style="text-align: right">
            <div class="upload-file-btn btn primary font14 relative" @click="uploadFile">
              &emsp;上传
            </div>
          </td>
        </tr>
      </table>
        
    </div>
    


    <!--footer-->
    <table slot="footer">
      <tr>
        <td class="left">
        </td>
        <td>
        </td>
        <td class="right">
          <button class="btn white" @click="dismiss(false)">取消</button>
          <button v-if="false" class="btn primary" @click="confirm(true)">确定</button>
        </td>
      </tr>
    </table>
  </modal-dialog>
</template>

<script>
// import VueSlideBar from 'vue-slide-bar';
export default {
  name: 'dialog-generate',
  components: {  },
  data () {
    return {
      loading: 50,
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.goods.list;
    },
    modal(){
      return this.$store.state.dialogDownload;
    },
    title: {
      get() {
        return this.modal.title;
      },
      set(val){
        this.modal.title = val;
      }
    },
    label: {
      get() {
        return this.modal.label;
      },
      set(val) {
        this.modal.label = val;
      }
    },
    coverUrl() {
      return this.modal.coverUrl;
    }

  },
  methods: {
    dismiss(){
      this.modal.show = false;
    },
    confirm() {
      
    },
    selectCover(url) {
      this.modal.coverUrl = url;
    },
    uploadFile() {
      
    }

  },
  created() {
    
  }
}
</script>

<style lang="scss">
  .dialog-download-content{
    .video-download-icon{
      position: absolute;
      top: 0px;
      right: 5px;
    }
    .video-download-text{
      margin-right: 1em;
    }
    .upload-table{
      width: 100%;
      td{
        padding: 5px;
      }
    }
    .upload-file-btn{
      background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M767.718 256.282c-2.258-.564-4.516-1.693-5.645-3.951-45.16-117.98-140.56-193.059-284.507-193.059-182.898 0-311.603 137.173-324.587 316.12 0 2.822-1.693 5.08-4.516 5.644C62.095 411.52 0 502.968 0 605.706c0 127.577 98.787 235.397 216.203 235.397h92.578c17.499 0 32.176-14.677 32.176-32.741s-14.112-32.741-32.176-32.741h-92.578c-82.417 0-152.98-77.901-152.98-170.479 0-81.852 56.45-155.801 127.013-168.22l23.144-3.952c3.387-.564 5.645-3.951 5.645-7.338l-2.258-23.71v-.564c0-157.495 102.175-277.168 260.799-277.168 127.012 0 198.703 63.788 231.444 172.172l5.645 17.5c1.129 2.822 3.387 4.515 6.21 4.515l18.063.565c119.11 2.258 222.977 100.48 222.977 222.412 0 110.642-72.256 234.267-181.768 234.267h-73.385c-17.5 0-32.176 14.677-32.176 32.74 0 18.065 14.112 32.742 32.176 32.742h72.82c160.318-4.516 243.299-159.753 243.299-299.185C1024 392.891 910.536 273.782 767.718 256.282z' fill='%23ffffff'/%3E%3Cpath d='M536.273 514.822l-8.467-9.031c-4.516-4.516-10.161-7.339-16.37-7.339-5.645 0-11.855 2.258-16.371 7.339l-7.903 8.467s0 .564-.564.564L370.875 644.657c-8.467 9.032-9.032 24.274-.564 33.87.564.565 1.129 1.129 1.693 1.129l7.339 5.08c9.032 9.597 23.709 6.21 32.176-2.822l56.45-63.788c3.952-4.516 11.855-1.694 11.855 4.516v309.91c0 18.063 14.112 32.74 32.176 32.74 17.5 0 32.176-14.677 32.176-32.74v-309.91c0-6.21 7.903-9.032 11.855-4.516l58.708 65.481c9.032 9.597 23.144 12.42 32.176 2.823l7.339-5.08c.564-.565 1.129-.565 1.693-1.13 8.468-9.596 7.903-24.273-.564-33.87l-119.11-131.528z' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size:auto 70%;
      background-repeat: no-repeat;
      background-position: 10px center;
    }
    .sub-cover-imgs{
      left: 100%;
      top: 0;
      height: 100%;
      // background-color: antiquewhite;
      display: none;
    }
    .current-video-cover:hover .sub-cover-imgs{
      display: block;
    }
  }
</style>
