<template>
 <div class="content">
   
    <!-- <headertop :headerText="actualText"></headertop> -->
    <div class="form">
      <div class="divTxt" v-for="(item,index) in list" :key='item.id'>
        <p class="pName">
          <span class="spanTxt">姓名</span>
          <input class="inputTxt" placeholder="请输入姓名" :value="item.name">
        </p>
        <p class="pIdCard">
          <span class="spanTxt">身份证</span>
          <input class="inputTxt" placeholder="请输入身份证" :value="item.idCardNo">
        </p>
        <p class="pRelation">
          <span class="spanTxt">性别</span>
          <input class="inputTxt" placeholder="请输入关系" :value="item.sex">
        </p>
        <button class="delBtn" @click="del(index,item.id,item.relation)">删除</button>
      </div>
    </div>
    <returnnext :active="actualActive" :url="urlList" :dataList="list" class="fix-renturn"></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
 //import headertop from '@/common/header/head'
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
      //actualText:'您录入的信息',
      actualActive:"active"//动态绑定样式
     }
   },
   components: {
    //headertop,
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
            // for(let i=0; i<list.length; i++) {
            //     if(list[i].relation == "配偶") {
            //         this.urlList.spousedisplay =false;
            //     }
            // }
            // let v;
            //判断数组里面是否存在某个值
            for(let v of list) {
                if(v.relation == "配偶") {
                    this.urlList.spousedisplay =false;
                }
            }
          },
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
          }
    }
 }
</script>

<style lang="scss" scoped>
  .form{
    //margin-top:1.1rem;
    padding:0.2rem 0.6rem 0 0.6rem;
    height: 10.4rem;
    overflow: auto;
    .enter-relation{
      width:98%;
    }
    .divTxt{
        margin-top: 0.24rem;
        position: relative;
        background: #63bfeb;
        border-radius: 0.15rem;
        padding:0.1rem 0.2rem;
      .pName{
        height:0.5rem;
        border-bottom:0.02rem dashed #fff;
      }
      .pIdCard{
        height:0.5rem;
        border-bottom:0.02rem dashed #fff;
      }
      .pRelation{
        height:0.5rem;
      }
      .delBtn{
        position: absolute;
        right: 0.2rem;
        bottom: 0.02rem;
        font-size: 0.3rem;
        width: 1rem;
        height: 0.52rem;
        background: #c53238;
        border: none;
        color: #fff;
        border-radius:0.1rem;
      }
    }
    .spanTxt{
      color:#707070;
      font-size:0.28rem;
      vertical-align: top;
      padding-top:0.1rem;
      display: inline-block;
      width:1rem;
      color:#fff;

    }
    .inputTxt{
        // padding: 0.05rem 0;
        width: 75%;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.34rem;
        vertical-align: top;
        text-indent: 0.2rem;
        border-radius: 0.1rem;
        border:none;
        font-size:0.28rem;
        color:#fff;
        background:none;
    }
  }
</style>
