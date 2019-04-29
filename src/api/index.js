

export function Test(xx) {
    alert(xx)

}


export function ReturnBirth(idCard){

    var birthday = "";  
    if(idCard != null && idCard != ""){  
        if(idCard.length == 15){  
            birthday = "19"+idCard.substr(6,6);  
        } else if(idCard.length == 18){  
            birthday = idCard.substr(6,8);  
        }  
        birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
    }
        
    return birthday;  
}
  