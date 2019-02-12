/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:27 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 11:01:01
 */ 
<template>
  <div class="mask-replace" @click="click">
    <slot></slot>
    <div class="mask-view">
      <table>
        <tr>
          <td>
          <button :class="['btn', 'primary', btnSize]" @click.stop="select">{{ text }}</button>
          <label :class="['btn', 'primary', 'upload-btn', btnSize]" v-if="showImageUpload">
            <span style="color:transparent;">图片</span><span>本地</span>
            <input type="file" accept=".jpg,.jpeg,.png,.gif,.bmp" @change="imagechange($event)">
          </label>
          </td>
        </tr>
      </table> 
      <div class="actions-wrap" v-if="showActions">
        <div
          class="goods-action-icon goods-delete"
          @click.stop="setAction('del')">&times;</div>
        <div
          class="goods-action-icon goods-down"
          v-if="index+1 < count"
          @click.stop="setAction('d')"
          :style="{backgroundImage: `url(${d})`}"></div>
        <div
          class="goods-action-icon goods-up"
          v-if="index>0"
          @click.stop="setAction('u')"
          :style="{backgroundImage: `url(${u})`}"></div>
      </div>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: 'mask-replace',
  props: {
    text: {
      type: String,
      default: '选择图片',
    },
    showImageUpload: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 1,
    },
    btnSize: {
      type: String,
      default: 'medium',
    }
  },
  data () {
    return {
    }
  },
  computed: {
    uploadIcon() {
      return `data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M767.718 256.282c-2.258-.564-4.516-1.693-5.645-3.951-45.16-117.98-140.56-193.059-284.507-193.059-182.898 0-311.603 137.173-324.587 316.12 0 2.822-1.693 5.08-4.516 5.644C62.095 411.52 0 502.968 0 605.706c0 127.577 98.787 235.397 216.203 235.397h92.578c17.499 0 32.176-14.677 32.176-32.741s-14.112-32.741-32.176-32.741h-92.578c-82.417 0-152.98-77.901-152.98-170.479 0-81.852 56.45-155.801 127.013-168.22l23.144-3.952c3.387-.564 5.645-3.951 5.645-7.338l-2.258-23.71v-.564c0-157.495 102.175-277.168 260.799-277.168 127.012 0 198.703 63.788 231.444 172.172l5.645 17.5c1.129 2.822 3.387 4.515 6.21 4.515l18.063.565c119.11 2.258 222.977 100.48 222.977 222.412 0 110.642-72.256 234.267-181.768 234.267h-73.385c-17.5 0-32.176 14.677-32.176 32.74 0 18.065 14.112 32.742 32.176 32.742h72.82c160.318-4.516 243.299-159.753 243.299-299.185C1024 392.891 910.536 273.782 767.718 256.282z' fill='%23ffffff'/%3E%3Cpath d='M536.273 514.822l-8.467-9.031c-4.516-4.516-10.161-7.339-16.37-7.339-5.645 0-11.855 2.258-16.371 7.339l-7.903 8.467s0 .564-.564.564L370.875 644.657c-8.467 9.032-9.032 24.274-.564 33.87.564.565 1.129 1.129 1.693 1.129l7.339 5.08c9.032 9.597 23.709 6.21 32.176-2.822l56.45-63.788c3.952-4.516 11.855-1.694 11.855 4.516v309.91c0 18.063 14.112 32.74 32.176 32.74 17.5 0 32.176-14.677 32.176-32.74v-309.91c0-6.21 7.903-9.032 11.855-4.516l58.708 65.481c9.032 9.597 23.144 12.42 32.176 2.823l7.339-5.08c.564-.565 1.129-.565 1.693-1.13 8.468-9.596 7.903-24.273-.564-33.87l-119.11-131.528z' fill='%23ffffff'/%3E%3C/svg%3E`;
    },
    u() {
      return `${window.assets}up.svg`;
    },
    d() {
      return `${window.assets}down.svg`;
    },
    del() {
      return `${window.assets}delete.svg`;
    },
  },
  methods: {
    click(){
      this.$emit('click');
    },
    select() {
      this.$emit('select');
    },
    setAction(type) {
      this.$emit('setAction', {
        type,
        index: this.index,
      })
    },
    imagechange(e) {
      let file = e.target.files[0];
      e.target.value = '';
      this.$emit('change', {file})

      return ;
      let files = e.target.files;
      if(files.length > 0) {
        let formdata=new FormData();
        formdata.append('imgUpload', files[0]);
        formdata.append('taobao_url', '');
        // formdata.append('WONBAO_USER_SESSION_ID', 105227988);
        // formdata.append('WONBAO_USER_SESSION_ID', 105284763);
        e.target.value = '';
        /* this.$store.dispatch('saveImageUpload', {formdata, callback: (link) => {
          this[type] = link;
        }})*/
        // alert('ddd');
        this.$store.dispatch('imageUpload', {formdata, callback: (img)=>{
          this.$emit('selectedImage', img);
        }});
      }
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .mask-replace{
    position: relative;
    width: 100%;
    max-width: 300px;
    .btn{
      margin: 5px 0;
    }
  }
  .mask-view{
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    table{
      width: 100%;
      height: 100%;
    }
    td{
      text-align: center;
    }
  }
  .mask-replace:hover .mask-view{
    display: block;
  }
  .actions-wrap{
    position: absolute;
    right:5px;
    top:5px
  }

  .upload-btn{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M379.094 197.91c72.324 119.976 68.833 116.128 132.41 116.128h371.26v500.688H137.2V199.854h257.146m2.467-75.782H134.734c-40.483 0-73.315 32.832-73.315 73.315v619.809c0 40.482 32.832 73.316 73.315 73.316h750.499c40.487 0 73.316-32.834 73.316-73.316V311.508c0-40.487-32.828-73.32-73.316-73.32H511.504c-72.309-96.944-62.006-114.116-114.69-114.116zm0 0' fill='%23ffffff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 30px center;
    background-size: 20px auto;
  }
  .upload-btn input{
    display: none;
  }
  .upload-btn.small{
    background-position: 10px center;
    background-size: 15px auto;
  }
</style>
