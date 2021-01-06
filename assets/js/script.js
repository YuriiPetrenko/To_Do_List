
//Select elements
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGHT = "lineThrought";

let LIST, id;


//get item from local storage
let data = localStorage.getItem("ToDo");

//check if data is not empty

if(data){
         LIST = JSON.parse(data);
         id = LIST.length;
         loadList(LIST);
}else{
         LIST = [];
         id = 0;
}

//load items
function loadList(array){
         array.forEach(function(item){
                  addToDo(item.name, item.id, item.done, item.trash);
         });
}

//clear list
clear.addEventListener("click", function(){
         localStorage.clear();
         location.reload();
});

//today date

const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US",options);


//add toDo

function addToDo(toDo, id, done, trash){

         if(trash){
                  return;
         }

         const DONE = done ? CHECK : UNCHECK;
         const LINE = done ? LINE_THROUGHT : "";


         const item = `
                  <li class="list__item">
                           <i class="far ${DONE}" job="complete" id="${id}"></i>
                           <p class="content__text ${LINE}">${toDo}</p>
                           <i class="far fa-trash-alt" job="delete" id="${id}"></i>
                  </li>
                  `;


         const position = "beforeend";

         list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(event){
         if(event.keyCode == 13){
                  const toDo = input.value;
                  if(toDo){
                           addToDo(toDo, id , false, false);

                           LIST.push({
                                    name : toDo,
                                    id : id,
                                    done : false,
                                    trash : false
                           });

                           //add item to local storage
                           localStorage.setItem("ToDo", JSON.stringify(LIST));
                           id++;
                  }
                  input.value = "";
         }
});

//complete to do

function completeToDo(element){
         element.classList.toggle(CHECK);
         element.classList.toggle(UNCHECK);
         element.parentNode.querySelector(".content__text").classList.toggle(LINE_THROUGHT);
         
         LIST[element.id].done = LIST[element.id].done ? false : true;
     }

//remove to do
function removeToDo(element){
         element.parentNode.parentNode.removeChild(element.parentNode)

         LIST[element.id].trash = true;
}


//target the items created dynamically

list.addEventListener("click", function(event){
         const element = event.target; // return the clicked element inside list
         const elementJob = element.attributes.job.value; // complete or delete
     
         if(elementJob == "complete"){
             completeToDo(element);
         }else if(elementJob == "delete"){
             removeToDo(element);
         }
         
         // add item to localstorage
         localStorage.setItem("ToDo", JSON.stringify(LIST));
     });


btn.addEventListener("click",function(event){
         const toDo = input.value;
         if(toDo){
                  addToDo(toDo, id , false, false);

                  LIST.push({
                           name : toDo,
                           id : id,
                           done : false,
                           trash : false
                  });

                  //add item to local storage
                  localStorage.setItem("ToDo", JSON.stringify(LIST));
                  id++;
         }
         input.value = "";
         
});