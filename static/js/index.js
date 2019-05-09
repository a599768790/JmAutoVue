
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

//键盘接口
function showKB(tagId){
  var request="{'tagId':'numkeyboard','skin':'blue'}";
  window.external.UniteMethod("ShowKeyBordByJs",request );
}

//打印反馈
function OfficePrintResultToJs(response){
  var responseObj = eval('(' + response + ')');//字符串转对象
    if(responseObj.status == 1){
      alert("打印成功...");
    }
    if(responseObj.status == 0){
      alert("打印失败...");
    }
}