<template>
 <div>
     <div class="addrelation-div">
        <!-- <router-link :to=url.homeurl>
            <van-button type="default">返回首页</van-button>
        </router-link> -->

        <router-link :to=url.addspouse>
            <van-button round type="danger" size="small">添加配偶</van-button>
        </router-link>
        <router-link :to=url.addchildren>
            <van-button round type="danger" size="small">添加子女</van-button>
        </router-link>

        <!-- <router-link :to=url.nexturl>
            <van-button type="default">下一步</van-button>
        </router-link> -->
      </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         
     }
   },
   props:{
       url:{
           type:Object
       }
   },
   components: {

   }
 }
</script>

<style scoped>
.addrelation-div{
    text-align: center;
}
.van-button--danger{
    background-color:#1989fa;
    border:#1989fa;
}
 
</style>
