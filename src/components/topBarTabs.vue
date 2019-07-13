<template>
  <table id="top-bar-tabs" cellspacing="0" cellpadding="0">
      <tr>
        <td :class="['tab-option', dialogTemplate.show ? 'active' : '']" @click="showDialog(0)">
          <span>视频模板</span>
          <div class="tab-active-line"></div>
        </td>
        <td class="empty-td"></td>
        <td :class="['tab-option', dialogAudio.show ? 'active' : '']" @click="showDialog(1)">
          <span>音频模板</span>
          <div class="tab-active-line"></div>
        </td>
        <td class="empty-td"></td>
        <td :class="['tab-option', dialogSetting.show ? 'active' : '']" @click="showDialog(2)">
          <span>设置模板</span>
          <div class="tab-active-line"></div>
        </td>
        <td class="empty-td"></td>
        <td :class="['tab-option', dialogFeedBack.show ? 'active' : '']" @click="showDialog(3)">
          <span>反馈</span>
          <div class="tab-active-line"></div>
        </td>
        <td class="empty-td"></td>
        <td :class="['tab-option']" @click="showDialog(4)">
          <a :href="helpLink" target="_blank"><span>帮助</span></a> 
          <div class="tab-active-line"></div>
        </td>
      </tr>
    </table>
</template>

<script>
export default {
  name: 'temp',
  data () {
    return {
      msg: 'temp'
    }
  },
  computed: {
    // 帮助链接
    helpLink() {
      let id = window.user.id,name=window.user.name,appkey=window.user.appkey;
      return `http://faqs.wonbao.net/home/list/index.html?version=1&appkey=${appkey}&username=${name}&userid=${id}&id=423&selMenu=17-423`;
    },
    dialogTemplate() {
      return this.$store.state.dialogTemplate;
    },
    dialogAudio() {
      return this.$store.state.dialogAudio;
    },
    dialogSetting() {
      return this.$store.state.dialogSetting;
    },
    dialogFeedBack() {
      return this.$store.state.dialogFeedBack;
    },
  },
  methods: {
    hideModalUnless(index) {
      const list = ['dialogTemplate', 'dialogAudio', 'dialogSetting', 'dialogFeedBack'];
      list.forEach((item, itemIndex)=>{
        if(index!=itemIndex) {
          this.$store.state[item].show = false;
        }
      })
    },
    showDialog(index) {
      switch(index){
        case 0:
          this.hideModalUnless(index);
          this.$store.state.dialogTemplate.show = true;
          break;
        case 1:
          this.hideModalUnless(index);
          this.$store.state.dialogAudio.show = true;
          break;
        case 2:
          this.hideModalUnless(index);
          this.$store.state.dialogSetting.show = true;
          break;
        case 3:
          this.hideModalUnless(index);
          this.$store.state.dialogFeedBack.show = true;
          break;
        case 4:
          break;
        default: break;
      }
    }
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #top-bar-tabs{
    float: right;
    height: 100%;
    margin-right: 90px;
  }
  #top-bar-tabs .empty-td{
    width: 65px;
  }
  #top-bar-tabs .tab-option{
    cursor: pointer;
  }
  #top-bar-tabs td{
    position: relative;
  }
  #top-bar-tabs span{
    float:right;
    font-size: 18px;
    color: #242424;
    font-weight: normal;
    margin-left: 0;
  }
  #top-bar-tabs td.active span{
    color: #073c6e;
  }
  #top-bar-tabs .tab-active-line{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #073c6e;
    display: none;
  }
  #top-bar-tabs .active .tab-active-line{
    display: block;
  }
</style>
