<template>
  <div>
    <div class="header-top">
      <div class="text">{{headerText}}</div>
    </div>
    <!-- 厦门市城镇房屋权属登记查询 -->
  </div>
</template>

<script>



 export default {
   data () {
     return {

     }
   },
   props:{
     headerText:String
     //父组件向子组件传值
   },
   components: {

   }
 }
</script>

<style lang="scss" scoped>
  .header-top{
    text-align: center;
    height: 0.8rem;
    background: #2365c4;
    line-height: 0.8rem;
    .text{
      font-size:0.32rem;
      color:#fff;
    }
  }
  
</style>
