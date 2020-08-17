let day = document.querySelector('.day');
let time = document.querySelector('.time');

function getTime(){
    let dt= new Date();
    let yy= dt.getFullYear();
    let MM = dt.getMonth()+1;
    let dd =dt.getDate();
    let DayOfWeek = dt.getDay();
    let day_list = ['Sun', 'Mon', 'Thu', 'Wed', 'Ths', 'Fri', 'Sat'];
    let week = day_list[DayOfWeek];    
    let hh =dt.getHours();
    let mm =dt.getMinutes();
    let ss =dt.getSeconds();
    MM = addZero(MM);
    mm = addZero(mm);
    dd = addZero(dd);
    ss = addZero(ss);

    let TodayDate = `${yy}/${MM}/${dd}/${week}`;
    let NowTime =` ${hh}:${mm}:${ss}`;
    day.innerHTML=TodayDate;
    time.innerHTML=NowTime;
}

function addZero(i){

    if(i<10){
        i = "0"+i;
    }
    return i;

}

setInterval(getTime,1000);


//Add-list

let list = document.querySelector('.list');
let btn = document.querySelector('.btn');
let data = JSON.parse(localStorage.getItem('listData')) || []; 
btn.addEventListener('click',AddList,false);
list.addEventListener('click',ToggleDone,false);

UpdateList(data);

//加入代辦事項到localStorage
function AddList(e){
    e.preventDefault();
    let text =document.querySelector('.txt').value; //撈出輸入框的值
    let status =document.querySelector('.status');
    let inputTxt = document.querySelector('.txt');
    if(text.trim() !== "" ){
    let todo = {
        content : text
    };

    data.push(todo);
    UpdateList(data);//更新頁面把data丟進去執行
    localStorage.setItem('listData',JSON.stringify(data));//加入key,把data字串化
    status.innerHTML = "";
    inputTxt.value = '';
   
}else{
    status.innerHTML = "請輸入代辦事項";
}

}

//動態新增li
function UpdateList(item){
    let str ='';
    let len =item.length;

    for(let i=0; i<len ; i++){
        str+=`<li><span>${i+1}.${item[i].content}</span> <a href="#" data-index='${i}'>刪除</a></li>`;
    }

    list.innerHTML= str;
}

//刪除代辦事項

function ToggleDone(e){

    e.preventDefault();
    if(e.target.nodeName!=='A'){return}; //如果不是按A則中斷不執行後面的程式碼
    
    let index = e.target.dataset.index; //撈出data-index的值
    data.splice(index,1); //刪除該筆資料
    localStorage.setItem('listData', JSON.stringify(data)); //同步更新localStorage
    UpdateList(data); //同步更新頁面

}