<template>
 <div class="content">
    <mt-header fixed title="您录入的信息" class="header" ref="header"></mt-header>
    <!-- <swipe></swipe> -->
    <div class="form" ref="form">
      <div class="enterPerson" v-for="(item,index) in list" :key='item.id'>
        <mt-field label="姓名" placeholder="请输入姓名" v-model="item.name"></mt-field>
        <mt-field label="身份证" placeholder="请输入身份证号" v-model="item.hkidCardNumber"></mt-field>
        <mt-field label="关系" placeholder="请输入关系" v-model="item.relation" class='enter-relation'>
          <van-button round type="danger" size="small" @click="del(index,item.id,item.relation)">删除</van-button>
        </mt-field>
        
      </div>
    </div>
    <returnnext :url="urlList" :dataList="list" class="fix-renturn"></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
 import swipe from '@/common/swipe/swipe'
 import returnnext from '@/common/returnnext/returnnext'
 import bottom from '@/common/footer/footer'
 import axios from 'axios'
 export default {
   data () {
     return {
      list:[],
      urlList:{
        homeurl:'/',
        nexturl:'/',
        addspouse:'/Business/addspouse',
        addchildren:'/Business/addchildren',
        spousedisplay:true,
        childrendisplay:true,
        nextdisplay:false,
        submitdisplay:true,
        getsfzdisplay:false
      },
     }
   },
   components: {
    swipe,
    returnnext,
    bottom
   },
   mounted () {
      this.loadPersons();
    },
   methods:{
          loadPersons () {
            var list = JSON.parse(localStorage.getItem("PrintList"));
            this.list = list;
          },
          // addPersonNext () {
          //   alert("111");
          // },
          del (index,id,relation) {
            console.log(id)//当前id
            console.log(index)
            if(this.list.length == 1){
              alert('必须保留至少一条数据');
              return;
            }else if(relation == '户主'){
              console.log(relation);
              alert('户主不允许删除');
              return;
            }
            // else if(relation == '配偶'){
            //   console.log(relation)
            // }
            else{
              this.list.splice(index,1); //删除当前行
            }
            var PrintList = JSON.parse(localStorage.getItem("PrintList") || '[]')
            PrintList.splice(index,1);
            localStorage.setItem('PrintList',JSON.stringify(PrintList));

          },
    }
 }
</script>

<style lang="scss" scoped>
  .mint-header-title{
    overflow:initial;
  }
  .form{
    margin-top:1.1rem;
    padding:0.2rem 0.6rem 0 0.6rem;
    height: 9.8rem;
    overflow: auto;
    .enter-relation{
      width:98%;
    }
  }
  .mint-cell{
    min-height:0.68rem;
  }
  .enterPerson{
    border:1px dashed #ccc;
  }
</style>
