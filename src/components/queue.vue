<template>
  <div id="queue">
    <div style="width: 100px;height: 100%;position: relative;">
      <v-center :css="{width: '100%', height: '100%', fontWeight: 'bold'}">
        <div class="queue-title">


        </div>
        <span class="font14">图片序列</span> 
      </v-center>
    </div>
    <div style="flex: 1;" class="queue-item-wrap scrollbar-overwrite" @mousewheel="mousewheel($event)" @DOMMouseScroll="mousewheel($event)" ref="wrap">
      <div
        v-for="item,index in queue"
        :class="{pointer: true, 'queue-item': true, 'queue-item-active': index == activeIndex}"
        @click="setAciveIndex(index)"
      >
        <div class="queue-img-display relative" :style="{backgroundImage: `url(${item.pic_url})`}">
          <mask-replace :text="'选择图片'"  :showImageUpload="true" @select="select(item)" @change="imageChange(0, $event)" :btnSize="'small'">
            <!--delete-->
            <div
              slot="after"
              v-if="queue.length > 1"
              class="queue-item-delete relative"
              @click.stop="action('delete',index)"
              title="删除"
            ></div>
            <!--left-->
            <div v-if="index !=0 "
              slot="after"
              class="queue-item-left queue-item-position relative"
              @click.stop="action('left',index)"
              title="左移"
            ></div>
            <!--right-->
            <div
              slot="after"
              v-if="(queue.length > 1) && (index + 1 < queue.length)"
              class="queue-item-right queue-item-position relative"
              @click.stop="action('right', index)"
              title="右移"
            ></div>
          </mask-replace>
        </div>
      </div>

      <!--添加图片-->
      <div class="pointer queue-item img-add-item" @click="addImage">
        <div class="queue-img-display " style="">
          +
        </div>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'temp',
  data () {
    return {
      msg: 'temp',
    }
  },
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
    project() {
      return this.$store.state.project;
    },
    queue() {
      return this.project.queue;
    }
    
  },
  methods: {
    
    setAciveIndex(index) {
      this.$store.state.activeIndex = index;
    },
    mousewheel(e,) {
      /* console.log(this.$refs.wrap.clientWidth);
      console.log(this.$refs.wrap.offsetWidth);
      console.log(this.$refs.wrap.scrollWidth);

      console.log(this.$refs.wrap.scrollLeft);*/

      // console.log(e);
      let scrollLeft = this.$refs.wrap.scrollLeft;
      let clientWidth = this.$refs.wrap.clientWidth;
      let scrollWidth = this.$refs.wrap.scrollWidth;
      let down = (e.deltaY > 0 || e.detail > 0) ? true : false;
      let o = 20;
      // 向下
      if(down) {
        if(scrollLeft + clientWidth + o >=  scrollWidth) {
          this.$refs.wrap.scrollLeft = scrollWidth - clientWidth;
        } else {
          this.$refs.wrap.scrollLeft += o;
        }
      } else {
        if(scrollLeft - o <= 0) {
          this.$refs.wrap.scrollLeft = 0
        } else {
          this.$refs.wrap.scrollLeft -= o;
        }
      }
    },
    // 添加图片
    addImage() {
      let img = `${window.assets}empty.jpg`;
      let queue = this.$store.state.project.queue;
      queue.push({
        ...queue[queue.length - 1],
        'pic_url': img,
      })
      this.$store.commit('update');
    },
    // 删除, 移动
    action(type, index) {
      this.$store.dispatch('setAction', {type, index});
    },
    select(item) {
      this.$store.state.dialogImage.selectedPic = item.pic_url.indexOf('data:image') > -1 ? '' : item.pic_url;
      this.$store.state.dialogImage.itemData = item;
      this.$store.state.dialogImage.show = true;
      this.$store.state.dialogImage.key = 'pic_url';
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
  },
  created() {
    
  },
}
</script>

<style lang="scss">
  #queue{
    height: 170px;
    background-color: #eeeeee;
    display: flex;
    border-top: 1px solid #cccccc;
    .mask-replace{
      height: 100%;
    }
  }
  .queue-item-wrap{
    white-space: nowrap;
    overflow-x:scroll;
    overflow-y: hidden;
  }
  .queue-item{
    display: inline-block;
    border: 2px solid #efefef;
    margin: 10px; 
    vertical-align: middle;
  }
  .queue-item:hover{
    border: 2px solid rgba(0, 0, 0, 0.3) 
  }
  
  .queue-item:hover .queue-item-position{
      display: block;
  }
  .queue-item:hover .queue-item-delete{
    display: block;
  }
  .queue-item.queue-item-active{
    border: 2px solid #1284e7;
  }
  .queue-img-display{
    width: 150px;
    height: 140px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .img-add-item{
    line-height: 130px;
    text-align: middle;
    text-align: center;
    font-size: 80px;
    color: #1284e7;
    border: 2px dashed #1284e7;
  }
  .queue-item.img-add-item:hover{
    border: 2px solid #1284e7;
  }
  // 删除
  .queue-item-delete{
    position: absolute;
    right: 0;
    top: 0;
    width: 25px;
    height: 25px;
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M256 810.667C256 857.6 294.4 896 341.333 896h341.334C729.6 896 768 857.6 768 810.667v-512H256v512zM361.173 506.88l60.374-60.373L512 536.96l90.453-90.453 60.374 60.373-90.454 90.453 90.454 90.454-60.374 60.373L512 657.707l-90.453 90.453-60.374-60.373 90.454-90.454-90.454-90.453zm300.16-336.213L618.667 128H405.333l-42.666 42.667H213.333V256h597.334v-85.333z' fill='%23d81e06'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgba(255,255,255,0.5);
    border-radius: 0 0 0 5px;
    display: none;
  }
  .queue-item-position{
    width: 25px;
    height: 25px;
    float: left;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: rgba(255,255,255,0.5);
    display: none;
  }
  .queue-item-position:last-child{
    border-radius: 0  0 5px 0;
  }
  .queue-item-left{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M904.533 503.467c0 11.946-3.96 22.186-11.946 30.72-8.534 7.987-18.774 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.186 4.267 30.72 12.8c7.987 7.97 11.946 17.92 11.946 29.867zM742.4 460.8c11.947 0 22.187 4.267 30.72 12.8 7.987 7.97 11.947 17.92 11.947 29.867s-3.96 22.186-11.947 30.72c-8.533 7.987-18.773 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8zM426.667 247.467c0 11.946-3.977 22.186-11.947 30.72-8.533 7.97-18.773 11.946-30.72 11.946s-21.897-3.976-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.187 4.267 30.72 12.8c7.97 7.97 11.947 17.92 11.947 29.867zM414.72 415.573c-8.533 7.97-18.773 11.947-30.72 11.947s-21.897-3.977-29.867-11.947c-8.533-8.533-12.8-18.773-12.8-30.72s4.267-21.896 12.8-29.866c7.97-8.534 17.92-12.8 29.867-12.8s22.187 4.266 30.72 12.8c7.97 7.97 11.947 17.92 11.947 29.866s-3.977 22.187-11.947 30.72zm-118.613 0c-8.534 7.97-18.774 11.947-30.72 11.947s-21.897-3.977-29.867-11.947c-8.533-8.533-12.8-18.773-12.8-30.72s4.267-21.896 12.8-29.866c7.97-8.534 17.92-12.8 29.867-12.8s22.186 4.266 30.72 12.8c7.97 7.97 11.946 17.92 11.946 29.866s-3.976 22.187-11.946 30.72zm11.946 87.894c0 11.946-3.976 22.186-11.946 30.72-8.534 7.987-18.774 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.186 4.267 30.72 12.8c7.97 7.97 11.946 17.92 11.946 29.867zm-119.466 0c0 11.946-3.977 22.186-11.947 30.72-8.533 7.987-18.773 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.187 4.267 30.72 12.8c7.97 7.97 11.947 17.92 11.947 29.867zm46.933 89.6c7.97-8.534 17.92-12.8 29.867-12.8s22.186 4.266 30.72 12.8c7.97 7.97 11.946 17.92 11.946 29.866s-3.976 22.187-11.946 30.72c-8.534 7.988-18.774 11.947-30.72 11.947s-21.897-3.96-29.867-11.947c-8.533-8.533-12.8-18.773-12.8-30.72s4.267-21.896 12.8-29.866zM653.653 473.6c7.988 7.97 11.947 17.92 11.947 29.867s-3.96 22.186-11.947 30.72c-8.533 7.987-18.773 11.946-30.72 11.946s-21.896-3.96-29.866-11.946c-8.534-8.534-12.8-18.774-12.8-30.72s4.266-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.866-12.8s22.187 4.267 30.72 12.8zm-107.52 29.867c0 11.946-3.96 22.186-11.946 30.72-8.534 7.987-18.774 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.186 4.267 30.72 12.8c7.987 7.97 11.946 17.92 11.946 29.867zM414.72 473.6c7.97 7.97 11.947 17.92 11.947 29.867s-3.977 22.186-11.947 30.72c-8.533 7.987-18.773 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.187 4.267 30.72 12.8zm11.947 149.333c0 11.947-3.977 22.187-11.947 30.72-8.533 7.988-18.773 11.947-30.72 11.947s-21.897-3.96-29.867-11.947c-8.533-8.533-12.8-18.773-12.8-30.72s4.267-21.896 12.8-29.866c7.97-8.534 17.92-12.8 29.867-12.8s22.187 4.266 30.72 12.8c7.97 7.97 11.947 17.92 11.947 29.866zm0 136.534c0 11.946-3.977 22.186-11.947 30.72-8.533 7.987-18.773 11.946-30.72 11.946s-21.897-3.96-29.867-11.946c-8.533-8.534-12.8-18.774-12.8-30.72s4.267-21.897 12.8-29.867c7.97-8.533 17.92-12.8 29.867-12.8s22.187 4.267 30.72 12.8c7.97 7.97 11.947 17.92 11.947 29.867z' fill='%231296db'/%3E%3C/svg%3E");
  }
  .queue-item-right{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M119.57 520.602c0-11.947 3.976-22.187 11.946-30.72 8.533-7.97 18.773-11.947 30.72-11.947s21.896 3.976 29.866 11.947c8.534 8.533 12.8 18.773 12.8 30.72s-4.266 21.896-12.8 29.85c-7.97 8.533-17.92 12.8-29.866 12.8s-22.187-4.267-30.72-12.8c-7.953-7.954-11.947-17.904-11.947-29.85zm162.115 42.65c-11.946 0-22.186-4.267-30.72-12.8-7.97-7.954-11.946-17.904-11.946-29.85 0-11.947 3.976-22.187 11.946-30.72 8.534-7.97 18.774-11.947 30.72-11.947s21.897 3.976 29.867 11.947c8.533 8.533 12.8 18.773 12.8 30.72s-4.267 21.896-12.8 29.85c-7.953 8.533-17.903 12.8-29.867 12.8zm315.7 213.315c0-11.946 3.976-22.186 11.946-30.72 8.534-7.987 18.774-11.946 30.72-11.946s21.897 3.96 29.867 11.946c8.533 8.534 12.783 18.774 12.783 30.72s-4.25 21.897-12.783 29.867c-7.97 8.533-17.92 12.8-29.867 12.8s-22.186-4.267-30.72-12.8c-7.97-7.97-11.946-17.92-11.946-29.867zm11.946-168.106c8.534-7.97 18.774-11.93 30.72-11.93s21.897 3.96 29.867 11.93c8.533 8.533 12.783 18.79 12.783 30.737 0 11.93-4.25 21.896-12.783 29.867-7.97 8.533-17.92 12.8-29.867 12.8s-22.186-4.267-30.72-12.8c-7.97-7.97-11.946-17.938-11.946-29.867 0-11.947 3.976-22.204 11.946-30.737zm118.596 0c8.534-7.97 18.774-11.93 30.72-11.93 11.913 0 21.88 3.96 29.867 11.93 8.533 8.533 12.8 18.79 12.8 30.737 0 11.93-4.267 21.896-12.8 29.867-7.987 8.533-17.954 12.8-29.867 12.8-11.946 0-22.186-4.267-30.72-12.8-7.97-7.97-11.946-17.938-11.946-29.867 0-11.947 3.993-22.204 11.946-30.737zm-11.946-87.86c0-11.946 3.976-22.186 11.946-30.72 8.534-7.97 18.774-11.946 30.72-11.946 11.913 0 21.88 3.976 29.867 11.947 8.533 8.533 12.8 18.773 12.8 30.72s-4.267 21.896-12.8 29.85c-7.987 8.533-17.954 12.8-29.867 12.8-11.946 0-22.186-4.267-30.72-12.8-7.953-7.954-11.946-17.904-11.946-29.85zm119.45 0c0-11.946 3.959-22.186 11.929-30.72 8.533-7.97 18.79-11.946 30.737-11.946 11.93 0 21.897 3.976 29.867 11.947 8.533 8.533 12.8 18.773 12.8 30.72s-4.267 21.896-12.8 29.85c-7.97 8.533-17.937 12.8-29.867 12.8-11.947 0-22.204-4.267-30.737-12.8-7.919-7.954-11.93-17.904-11.93-29.85zm-46.917-89.6c-7.987 8.534-17.954 12.8-29.867 12.8-11.946 0-22.186-4.266-30.72-12.8-7.97-7.97-11.946-17.92-11.946-29.866s3.976-22.187 11.946-30.703c8.534-7.97 18.774-11.947 30.72-11.947 11.913 0 21.88 3.977 29.867 11.947 8.533 8.533 12.8 18.756 12.8 30.703s-4.267 21.914-12.8 29.867zm-418.082 119.45c-7.97-7.953-11.947-17.903-11.947-29.85 0-11.946 3.977-22.186 11.947-30.72 8.533-7.97 18.756-11.946 30.703-11.946s21.896 3.976 29.867 11.947c8.533 8.533 12.8 18.773 12.8 30.72s-4.267 21.896-12.8 29.85c-7.97 8.533-17.92 12.8-29.867 12.8s-22.17-4.267-30.703-12.8zm107.503-29.85c0-11.946 3.976-22.186 11.947-30.72 8.533-7.97 18.773-11.946 30.72-11.946s21.896 3.976 29.85 11.947c8.533 8.533 12.8 18.773 12.8 30.72s-4.267 21.896-12.8 29.85c-7.954 8.533-17.904 12.8-29.85 12.8-11.947 0-22.187-4.267-30.72-12.8-7.97-7.954-11.947-17.904-11.947-29.85zm131.396 29.85c-7.97-7.953-11.946-17.903-11.946-29.85 0-11.946 3.976-22.186 11.946-30.72 8.534-7.97 18.774-11.946 30.72-11.946s21.897 3.976 29.867 11.947c8.533 8.533 12.783 18.773 12.783 30.72s-4.25 21.896-12.783 29.85c-7.97 8.533-17.92 12.8-29.867 12.8s-22.186-4.267-30.72-12.8zm-11.946-149.316c0-11.947 3.976-22.187 11.946-30.703 8.534-7.97 18.774-11.947 30.72-11.947s21.897 3.977 29.867 11.947c8.533 8.533 12.783 18.756 12.783 30.703s-4.25 21.896-12.783 29.867c-7.97 8.533-17.92 12.8-29.867 12.8s-22.186-4.267-30.72-12.8c-7.97-7.953-11.946-17.903-11.946-29.867zm0-136.516c0-11.947 3.976-22.187 11.946-30.703 8.534-7.97 18.774-11.947 30.72-11.947s21.897 3.977 29.867 11.947c8.533 8.533 12.783 18.756 12.783 30.703s-4.25 21.896-12.783 29.866c-7.97 8.534-17.92 12.8-29.867 12.8s-22.186-4.266-30.72-12.8c-7.97-7.953-11.946-17.903-11.946-29.866z' fill='%231296db'/%3E%3C/svg%3E");
  }
  .queue-title{
    background-image: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M960 578.01a286.656 286.656 0 0 0-147.2-40.41c-148.237 0-270.336 112-286.246 256H64V230.4h896v347.61z' fill='%231989FA' opacity='.3'/%3E%3Cpath d='M609.702 546.342l-157.324 78.682a38.4 38.4 0 0 1-55.578-34.355V433.33a38.4 38.4 0 0 1 55.578-34.342l157.324 78.669a38.4 38.4 0 0 1 0 68.684zM140.8 64h742.4a76.8 76.8 0 0 1 76.8 76.8v25.6H64v-25.6A76.8 76.8 0 0 1 140.8 64zm385.754 793.6A286.08 286.08 0 0 0 558.016 960H140.8A76.8 76.8 0 0 1 64 883.2v-25.6h462.554z' fill='%231989FA'/%3E%3Cpath d='M614.4000000000001 819.2a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0z' fill='%231989FA' opacity='.3'/%3E%3Cpath d='M844.8 793.6h76.8a25.6 25.6 0 1 1 0 51.2H819.2a25.6 25.6 0 0 1-24.794-32 25.651 25.651 0 0 1-.806-6.4V704a25.6 25.6 0 1 1 51.2 0v89.6z' fill='%231989FA'/%3E%3C/svg%3E");
    width: 100%;
    height:100px;
    background-size: contain;
    background-position: center;
  }
</style>
