/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:59 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2018-10-31 15:42:59 
 */
// 分页
<template>
  <div>
    <paginate
      :page-count="pageCount"
      :click-handler="fn"
      :value="pageNo"
      :page-range="3"
      :initial-page="1"
      :prev-text="'上一页'"
      :next-text="'下一页'"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script>
import paginate from 'vuejs-paginate'
export default {
  name: 'pagination',
  components: { paginate },
  props: {
    pageSize: {
      type: Number,
      default: 15,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1501,
    }
  },
  data () {
    return {
      name: 'apple',
      /*fn: (e)=>{
        alert(e);
      },*/
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.pageSize);
    }
  },
  methods: {
    fn(e){
      // alert(e);
      this.$emit('goToPage', e);
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
  .pagination{
    font-size: 14px;
    height: 10px;
    white-space: nowrap;
    .active{
      color: red;
    }
    a[tabindex="-1"]:hover{
      cursor: not-allowed;
    }
  }
</style>
