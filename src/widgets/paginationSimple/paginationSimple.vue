/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:43:06 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2018-10-31 15:43:06 
 */
// 只有上一页，下一页的分页
<template>
  <div class="pagination-simple">
    <span class="prev" @click="goTo('prev')" :style="{cursor: pageNo == 1? 'not-allowed': 'pointer'}">上一页</span><span>{{ pageNo }}</span><span class="next" @click="goTo('next')" :style="{cursor: hasNext ? 'pointer' : 'not-allowed'}">下一页<slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'pagination-simple',
  props: {
    pageNo: {
      type: Number,
      default:1,
    },
    hasNext: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    goTo(type){
      let page = this.pageNo
      if(type == 'prev') {
        if(this.pageNo == 1) {
          return;
        }
        page -= 1;
      } else {
        if(this.hasNext) {
          page += 1;
        }else{
          return;
        }
      }
      this.$emit('goToPage', page)
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .pagination-simple{
    display: inline-block;
    font-size: 14px;
    &>span{
      display: inline-block;
      border: 1px solid #cccccc;
      line-height: 2em;
      min-width: 30px;
      text-align: center;
      padding: 0 5px;
      border-right: none;
    }
    &>span:last-child{
      border-right: 1px solid #cccccc;
    }
  }
</style>
