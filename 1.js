function discount(grade, qty ){
    var total= [];
    if(grade = "A" && qty>13){
        
        total= (4550*qty-(231*qty));
    }
    else if(grade = "B" && qty>7){
        total= (5330*qty-(2.3*(5330*qty)));
    }
    else if(grade = "C"){
        total= (8653*qty);
    }
    
}
return discount(B, 15);
console.log(total)
