<template>
 <div>
    <!-- <headertop :headerText="actualText"></headertop> -->
    <swipe></swipe>
    <div class="form" id="childrenForm">
      <!-- <div class="divTxt">
        <input id="numkeyboard1" class="numkeyboard" placeholder="请输入姓名222" onclick="showKB('numkeyboard1')" name="name" v-model="children.name">
      </div> -->
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input id="numkeyboard1" class="numkeyboard inputTxt" value="子女111" placeholder="请输入姓名" @click="showKB('numkeyboard1')" name="name">
      </div>
      <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" @click="chooseSex" value="性别男" name="sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input id="numkeyboard2" class="numkeyboard inputTxt" placeholder="请输入出生年月" @click="showKB('numkeyboard2')" name="born" v-model="children.born">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" @click="chooseNation" name="nation" v-model="children.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input id="numkeyboard3" class="numkeyboard inputTxt" placeholder="请输入地址" @click="showKB('numkeyboard3')" name="address" v-model="children.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input id="numkeyboard4" class="inputTxt" value="350212201010104515" placeholder="请输入身份证号" @touchstart.stop="idshow = true" @click="showKB('numkeyboard4')" name="idCardNo" v-model="children.idCardNo">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input id="numkeyboard5" class="inputTxt" placeholder="请输入签发机关" name="grantDept" @click="showKB('numkeyboard5')"  v-model="children.grantDept">
      </div>
    </div>
    <returnnext :url="urlList" @actualgetsfz='getsfz' @actualnextstep='nextstep'></returnnext>
    <bottom></bottom>
    <van-popup v-model="sexDisplay" :overlay="false">
        <van-picker
            show-toolbar
            :columns="columns"
            :visible-item-count="2"
            @confirm="sexonConfirm"
            @cancel="sexonCancel"
        />
    </van-popup>
    <calendar :show.sync="calendarshow" :mode="mode" @change="onChange"/>

    <van-popup class="nationPop" v-model="nationDisplay" :overlay="false">
        <van-picker
            show-toolbar
            :columns="nationcolumns"
            :visible-item-count="3"
            @confirm="nationonConfirm"
            @cancel="nationonCancel"
        />
    </van-popup>
    <van-number-keyboard
      :show="idshow"
      extra-key="."
      close-button-text="完成"
      @blur="idshow = false"
      @input="onInput"
      @delete="onDelete"
    />

 </div>
</template>

<script>
 import * as index from '@/api/index'
 import * as common from "@/api/base.js"
 import {serializeObject} from "@/api/base.js"
 //import headertop from '@/common/header/head'
 import swipe from '@/common/swipe/swipe'
 import returnnext from '@/common/returnnext/returnnext'
 import bottom from '@/common/footer/footer'
 import axios from 'axios'
 export default {
   data () {
     return {
      children:{},
      childrenList:[],
      urlList:{
        homeurl:'/',
        nexturl:'/Business/enterinfo',
        addspouse:'/Business/addspouse',
        addchildren:'/Business/addchildren',
        spousedisplay:false,
        childrendisplay:false,
        nextdisplay:true,
        getsfzdisplay:false
      },
      //actualText:"请刷取子女身份证",
      sexDisplay: false,
      birthDisplay:false,
      nationDisplay:false,
      columns: ['男', '女'],
      nationcolumns:["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
		"土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", 
		"达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", 
		"德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
      //日期控件
      calendarshow: false,
      mode: 'during',
      //身份证输入
      idshow: false
     }
   },
   components: {
    //headertop,
    swipe,
    returnnext,
    bottom
   },
   mounted () {
     //index.Test()//引入外部js
    },
   methods:{
          getsfz () {
            var jsonstr = '{"name": "郑小小","sex": "女","nation": "汉族","born": "20191103","address": "福建省福州市罗源县青禾家园6座406","idCardNo": "350212201911032424", "grantDept": "福州市公安分局罗源分局","relation":"未成年子女"}'
            var obj = JSON.parse(jsonstr)
            this.children = obj
            var ListObj = JSON.parse(localStorage.getItem("PrintList") || '[]')//获取浏览器缓存转对象
            ListObj.unshift(obj);//加入数组
            alert(JSON.stringify(ListObj))
            localStorage.setItem('PrintList',JSON.stringify(ListObj))
          },
          //子组件传来的事件
          nextstep () {
            // var obj = $('#childrenForm').serializeObject()
            // console.log(obj);

            // this.children = obj
            // var ListObj = JSON.parse(localStorage.getItem("PrintList") || '[]')//获取浏览器缓存转对象
            // ListObj.unshift(obj);//加入数组
            // alert(JSON.stringify(ListObj))
            // localStorage.setItem('PrintList',JSON.stringify(ListObj))


            var childYear = index.ReturnBirth(this.children.idCardNo)
            childYear = childYear.slice(0,4);
            var nowDate = new Date;
            var nowYear = nowDate.getFullYear(); //获取年份
            var childAge = nowYear - childYear;//
            console.log(nowYear)
            console.log(childYear);
            if (Object.keys(this.children).length == 0){
                alert("不能为空");
                return;
            }
            //大于18岁不可以输入
            if(childAge > 18){
              alert("请输入未成年子女");
              return false;
            }
            else{
                this.$router.push({
                path: this.urlList.nexturl,
                // query: {
                //   id: id
                // }
                })
              }
          },
          //选择性别
          chooseSex () {
              this.sexDisplay = true;
          },
          sexonConfirm(value, index) {
            this.children.sex = value;
            this.sexDisplay = false;
          },
          sexonCancel () {
            this.sexDisplay = false;
          },
          //选择日期
          chooseBirth(mode) {
            this.calendarshow = true;
            this.mode = mode;
            this.children.birthDate = '';
          },
          //填充
          onChange(date) {
            if (this.mode === 'single') {
              this.children.birthDate = date.format('YYYY-MM-DD');
            } 
            // else {
            //   this.date = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
            // }
          },
          //选择民族
          chooseNation () {
            this.nationDisplay = true;
          },
          nationonConfirm(value, index) {
            this.children.nation = value;
            this.nationDisplay = false;
          },
          nationonCancel () {
            this.nationDisplay = false;
          },
          //身份证
          onInput(value) {
            //alert(value);
            //console.log(value)
            this.children.certNo = value;
          },
          onDelete() {
            alert('delete');
          },

    }
 }
</script>

<style lang="scss" scoped>
  
  .form{
    padding:0.1rem 0.6rem 0 0.6rem;
    .divTxt{
      // line-height: 0.54rem;
      height: 0.50rem;
      margin-top:0.2rem;
    }
    .spanTxt{
      color:#707070;
      font-size:0.28rem;
      vertical-align: top;
      padding-top:0.1rem;
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
    input::-webkit-input-placeholder {
    font-size:0.28rem;
    color:#bbbaba;
    line-height: 0.48rem;
    }

  }
  .van-popup{
      width: 7.52rem;
      top: 83%;
      height: 3rem;
  }
  .nationPop{
    height: 4rem;
    top: 79%;
  }
</style>
