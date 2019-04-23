<template>
 <div class="">
      <headertop :headerText="actualheaderText"></headertop>
      <swipe></swipe>
      <maincontent></maincontent>
     <!-- <homefooter></homefooter> -->
      <bottom></bottom>
 </div>
</template>

<script>
//  import homeheader from '@/pages/HomeIndex/HomeHeader'
 import headertop from '@/common/header/head'
 import swipe from '@/common/swipe/swipe'
//  import swipe from '@/pages/HomeIndex/swipe'
 import maincontent from '@/pages/HomeIndex/MainContent'
 import bottom from '@/common/footer/footer'

 export default {
   data () {
      return {
        actualheaderText:'厦门市城镇房屋权属登记查询'
     }
   },
   components: {
        headertop,
        swipe,
        maincontent,
        bottom
   }
 }
</script>

<style>
    /* .wrapper{
        height: 12.54rem;
    } */
 
</style>
