let kliknav = 0;
function menu(){
 let nav = document.querySelector(".first-nav-list");
 kliknav++;
 if (kliknav == 1) {
     nav.style.left = "50%";
   } 
   
 if (kliknav == 2){
     nav.style.left = "-150%";
     kliknav = 0;
   }
}


let seznam = document.getElementsByClassName("categories");

let indexC = 0;
function clickCategory(){
  indexC++;
  if(indexC == 1){
    seznam[0].style.height = "200px";
  }
  if(indexC == 2){
    seznam[0].style.height = "24px";
    indexC = 0;
  }
}

let indexT = 0;
function clickType(){
  indexT++;
  if(indexT == 1){
    seznam[1].style.height = "150px";
  }
  if(indexT == 2){
    seznam[1].style.height = "24px";
    indexT = 0;
  }
}
let indexP = 0;
function clickPrice(){
  indexP++;
  if(indexP == 1){
    seznam[2].style.height = "150px";
  }
  if(indexP == 2){
    seznam[2].style.height = "24px";
    indexP = 0;
  }
}

let indexS = 0;
function clickSize(){
  indexS++;
  if(indexS == 1){
    seznam[3].style.height = "200px";
  }
  if(indexS == 2){
    seznam[3].style.height = "24px";
    indexS = 0;
  }
}


