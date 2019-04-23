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
   },
   components: {

   }
 }
</script>

<style lang="scss" scoped>
  .header-top{
    text-align: center;
    height: 0.5rem;
    background: #26a2ff;
    line-height: 0.5rem;
    .text{
      font-size:0.28rem;
      color:#fff;
    }
  }
  
</style>
