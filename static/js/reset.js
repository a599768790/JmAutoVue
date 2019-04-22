function fnResize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
      deviceWidth = 750
    }
    if (deviceWidth <= 320) {
      deviceWidth = 320
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  }


  //读取身份证
  function IDCardResultToJs(response){
    var pesson = eval('(' + response + ')');
    var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    list.unshift(pesson);
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