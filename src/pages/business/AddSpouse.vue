<template>
 <div>
    <mt-header fixed title="请刷取配偶身份证" class="header"></mt-header>
    <swipe></swipe>
    <div class="form">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="spouse.name"></mt-field>
      <mt-field label="性别" placeholder="请输入性别" v-model="spouse.sex"></mt-field>
      <mt-field label="出生" placeholder="请输入出生年月" v-model="spouse.birth"></mt-field>
      <mt-field label="民族" placeholder="请输入民族" v-model="spouse.nation"></mt-field>
      <mt-field class="address" label="地址" placeholder="请输入地址" v-model="spouse.address"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" v-model="spouse.hkidCardNumber"></mt-field>
      <mt-field label="签发机关" placeholder="请输入签发机关" v-model="spouse.signorganization"></mt-field>
      <mt-field label="有效期至" placeholder="有效期" v-model="spouse.effectivedate"></mt-field>
    </div>
    <returnnext :url="urlList" @actualgetsfz="getsfz" @actualnextstep='nextstep'></returnnext>
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
      spouse:{},
      urlList:{
        homeurl:'/',
        nexturl:'/Business/enterinfo',
        addspouse:'/Business/addspouse',
        addchildren:'/Business/addchildren',
        spousedisplay:false,
        childrendisplay:false,
        nextdisplay:true,
        getsfzdisplay:true
      },
     }
   },
   components: {
    swipe,
    returnnext,
    bottom
   },
   mounted () {

    },
   methods:{
          //子组件传过来的
          getsfz () {
            //扫描成功get数据，先把本人data保存到浏览器localstage
            axios.get('/static/index.json').then(this.getHomeInfoSucc)
            // if(Object.keys(this.spouse).length != 0){
            //   this.urlList.getsfzdisplay = false
            // }
            this.urlList.getsfzdisplay = false
          },
          getHomeInfoSucc (res) {
            res = res.data
            if (res.ret && res.data){
              const data = res.data
              this.spouse = data.housePropety.relationperson[0]
              //读取到消息才隐藏
              if (Object.keys(this.spouse).length != 0){
                this.urlList.getsfzdisplay = false
              }
            
              //保存到localstage
              var spouse = {
                id:Date.now(), 
                name:this.spouse.name, 
                sex:this.spouse.sex,
                birthDate:this.spouse.birth,//身份证birthDate
                nation:this.spouse.nation,
                address:this.spouse.address,
                hkidCardNumber:this.spouse.hkidCardNumber,
                signorganization:this.spouse.signorganization,
                effectivedate:this.spouse.effectivedate,
                relation:this.spouse.relation,
                isHouser:false
              }

              var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
              list.unshift(spouse);
              localStorage.setItem('PrintList',JSON.stringify(list))
            }
          },
          //子组件传来的事件
          nextstep () {
            if (Object.keys(this.spouse).length == 0){
                alert("配偶不能为空");
                return;
              }else{
                this.$router.push({
                path: this.urlList.nexturl,
                // query: {
                //   id: id
                // }
                })
              }
          }
    }
 }
</script>

<style scoped>
  .mint-header-title{
    overflow:initial;
  }
  .form{
    padding:0.2rem 0.6rem 0 0.6rem;
  }
  .mint-cell{
    min-height:0.82rem;
  }


</style>
