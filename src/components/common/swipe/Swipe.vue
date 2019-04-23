<template>
 <div>
   <div class="swipe">
     <img src="@/assets/pic/xiq_02.png">
   </div>
    <!-- <mt-swipe :auto="0">
        <mt-swipe-item class="one">1</mt-swipe-item>
        <mt-swipe-item class="two">2</mt-swipe-item>
        <mt-swipe-item class="three">3</mt-swipe-item>
    </mt-swipe> -->
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {
     
   }
 }
</script>

<style lang="scss" scoped>
.swipe{
  width:100;
  img{
    border: 0;
    display: block;
    width: 100%;
    height:2.86rem;

  }
}
// .mint-swipe{
//   height:4.2667rem;
//   .one{
//     background:#ccc;
//     }
//   .two{
//     background:#ffc107;
//   }
//   .three{
//     background:#656b79;
//     }
//   .mint-swipe-items-wrap{
//     color:#fff;
//     }
//     text-align:center;
//     .mint-swipe-item{
//       line-height:4.2667rem;
//       }
// }
</style>

