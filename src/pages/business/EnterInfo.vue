<template>
 <div class="content">
    <!-- <mt-header fixed title="您录入的信息" class="header" ref="header"></mt-header> -->
    <headertop :headerText="actualText"></headertop>
    <div class="form">
      <div class="enterPerson" v-for="(item,index) in list" :key='item.id'>
        <div class="divTxt">
          <p class="pName">
            <span class="spanTxt">姓名</span>
            <input class="inputTxt" placeholder="请输入姓名" :value="item.name">
          </p>
          <p class="pIdCard">
            <span class="spanTxt">身份证</span>
            <input class="inputTxt" placeholder="请输入身份证" :value="item.hkidCardNumber">
          </p>
          <p class="pRelation">
            <span class="spanTxt">关系</span>
            <input class="inputTxt" placeholder="请输入关系" :value="item.relation">
          </p>
          <button @click="del(index,item.id,item.relation)">删除</button>
        </div>

        <!-- <mt-field label="姓名" placeholder="请输入姓名" v-model="item.name"></mt-field>
        <mt-field label="身份证" placeholder="请输入身份证号" v-model="item.hkidCardNumber"></mt-field>
        <mt-field label="关系" placeholder="请输入关系" v-model="item.relation" class='enter-relation'>
          <van-button round type="danger" size="small" @click="del(index,item.id,item.relation)">删除</van-button>
        </mt-field> -->
        
      </div>
    </div>
    <returnnext :active="actualActive" :url="urlList" :dataList="list" class="fix-renturn"></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
 import headertop from '@/common/header/head'
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
        getsfzdisplay:false,
        
      },
      actualText:'您录入的信息',
      actualActive:"active"//动态绑定样式
     }
   },
   components: {
    headertop,
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
          //设置
          Setbtnwidth () {

          }
    }
 }
</script>

<style lang="scss" scoped>
  // .mint-header-title{
  //   overflow:initial;
  // }
  .form{
    //margin-top:1.1rem;
    padding:0.2rem 0.6rem 0 0.6rem;
    height: 9.8rem;
    overflow: auto;
    .enter-relation{
      width:98%;
    }
    .divTxt{
      // line-height: 0.54rem;
      height: 0.50rem;
      margin-top:0.2rem;
    }
    .spanTxt{
      color:#707070;
      font-size:0.28rem;
      vertical-align: top;
      padding-top:0.2rem;
      display: inline-block;
      width:1.3rem;

    }
    .inputTxt{
        // padding: 0.05rem 0;
        width: 72%;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.34rem;
        vertical-align: top;
        text-indent: 0.2rem;
        border-radius: 0.1rem;
        border:1px solid #eee;
        font-size:0.28rem;
        color:#bbbaba;
    }
  }
  // .mint-cell{
  //   min-height:0.68rem;
  // }
  // .enterPerson{
  //   border:1px dashed #ccc;
  // }
</style>
