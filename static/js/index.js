
// function aa(){
//   alert("111")
// }

// function aa(){
//   alert("222")
// }

//读取身份证
function IDCardResultToJs(response){
    alert("开始读取身份证");
    alert(response);
    var responseObj = eval('(' + response + ')');//字符串转对象
    if(responseObj.status == 1){
      alert("读取成功...");
    }
    var ListObj = JSON.parse(localStorage.getItem("PrintList") || '[]')//获取浏览器缓存转对象
    var personObj = responseObj.idCardMsg;
    ListObj.unshift(personObj);//加入数组
    alert(JSON.stringify(ListObj))
    localStorage.setItem('PrintList',JSON.stringify(ListObj))
}

  //打印
  // function IDCardResultToJs(response){
  //   // var pesson = eval('(' + response + ')');
  //   // var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
  //   // list.unshift(pesson);
  //   // localStorage.setItem('PrintList',JSON.stringify(list))
  //   var request = {

  //   }
  //   window.external.UniteMethod("OfficePrintByJs",request)
  // }