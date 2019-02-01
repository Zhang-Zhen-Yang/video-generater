/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:42:36 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-02-dd 13:45:28
 */
<template>
    <svg viewBox="25 25 50 50" class="md-spinner-draw">
        <circle cx="50" cy="50" r="20" stroke-width="3.5" stroke="#1284e7" class="md-spinner-path" fill="rgba(255, 255, 255, 0)">
        </circle>
    </svg>
</template>

<script>
export default {
    name: 'material-spinner',
    data () {
        return {
            msg: 'material-spinner'
        };
    }, // end data
    computed: {

    }, // end computed
    methods: {

    } // end methods
};
</script>

<style>
  .md-spinner-draw{
    width: 60px;
    height: 60px;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: rotate(270deg) translateZ(0);
    transform-origin: center center;
    will-change: transform,opacity;
    animation:d 1.9s linear infinite;transform:rotate(0deg) translateZ(0)
  }
  .md-spinner-path{
      stroke-dasharray: 2,200;
      animation: f 1.425s ease-in-out infinite;
  }
  @keyframes d{
      to{transform:rotate(1turn) translateZ(0)}
  }
  @keyframes f{
      0%{stroke-dasharray:2,200;stroke-dashoffset:0}
      50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}
      to{stroke-dasharray:89,200;stroke-dashoffset:-124px}
  }

</style>