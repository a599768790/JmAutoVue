


//读取身份证
function IDCardResultToJs(response){
    alert("开始读取身份证");
    alert(response);
    var person = eval('(' + response + ')');
    var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    list.unshift(person);
    localStorage.setItem('PrintList',JSON.stringify(list))

  }

  //打印
  function IDCardResultToJs(response){
    // var pesson = eval('(' + response + ')');
    // var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    // list.unshift(pesson);
    // localStorage.setItem('PrintList',JSON.stringify(list))
    var request = {

    }
    window.external.UniteMethod("OfficePrintByJs",request)
  }