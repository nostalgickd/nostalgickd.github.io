let _style= create("style");
document.body.append(_style);
_style.innerHTML= `
#overlay{
position: absolute;
width: 100%; height: 100%;
left:0; right:0; top:0; left:0;
background: rgb(0,0,0,0.5);
display: none;
}



#modal{
height: auto; width: 80%;
background: white;
position: absolute;
top: 50%; right: 50%;
transform: translate(50%,-150%);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 5px 10px 5px;
font: bold small-caps 12px Arial;
z-index: 1;
}


div.select{
height: 30px;
width: 70%;
display: flex;
justify-content: space-between;
font: small-caps 12px Arial;
}

div.select>*{
height: 100%;
border: 1px solid black;
font: small-caps 12px Arial;
display: flex;
justify-content: center;
align-items: center;
}


div.select>select{
height: 100%;
width: calc(100% - 5ch);
}

div.select>button{
width: 5ch;
border-left:none;
}


div.select.two{
margin-top: 10px;
visibility: hidden;
}

div.select.two>span{
font-weight: bold;
width: 49%;
cursor: pointer;
}


.now{color:green;}
.later{color:red;}


#modal button{
text-transform: none;
}

#modal p{
color: blue;
}

.msg{
color: blue;
margin: 10 0px;
visibility: hidden;
text-align: center;
}


.nr{
color: green;
display: block;
margin-bottom: 20px;
}


#modal path{
stroke:red;
stroke-width:5px;
}
    
#modal .close{
position:absolute;
top:0px; right: 0;
width:20px; height:20px;
border:1px solid red;
cursor: pointer;
}

#settings{
z-index: 1;
display: block;
background: pink;
padding: 1px; border-radius: 2px;
width: 30px; height: 30px;
position: absolute;
left: 5px; bottom: 20px;
overflow: hidden;
}


#settings svg{
width: 99%; height: 100%;
fill: darkblue;
}`;


let _div= create("div"); _div.id= "overlay";
document.body.append(_div);


_div.innerHTML=`
<div id="modal">
<span>select stations to hide</span>

<div class="select one">
<select multiple>
<optgroup label="Select stations to hide">
</optgroup>
</select>
<button>save</button>
</div>



<div class="msg">
<span class="nr"><span></span> stations hidden successfully!</span>
<br>
<p>the page needs to be reloaded, for the changes to take effect :)</p>
</div>

</p>
<div class="select two">
<span class="later">reload later</span>
<span class="now">reload now</span>
</div>

<svg class="close" viewbox="0 0 40 40">
<path d="M 10,10 L 30,30 M 30,10 L 10,30"/></svg>
</div>`;


function checkedOptions(el){
return [...el.selectedOptions].map(i=> i.index);
}

let _modal= select ("#modal");
let _select= select("select", _modal);
let _save= select("button", _modal);
let _stations= Object.values(list[0]);
let _msg= select(".msg", _modal);
let _nr= select(".nr span", _modal);
let _reload= select(".select.two");
let _reloadN= select(".later",_reload);
let _reloadY= select(".now",_reload);


_reloadN.onclick=()=>{
_div.style.display= "none";
};

_reloadY.onclick=()=>{
location= location.href;
_dic.style.display= "none";
};




_stations.forEach(i=>{
let a= create("option"); a.innerHTML= i;
select("optgroup", _modal).append(a);
});


block.forEach(i=>{
let a= selectAll("option", _modal);
a[i].selected= true;
});


_select.oninput=()=>{
_save.innerHTML= "Save";
};


_save.onclick= function(){
let _block= checkedOptions(_select);
_nr.innerHTML= _block.length;
localStorage["_block"]= JSON.stringify(_block);
_msg.style.visibility= "visible";
_reload.style.visibility= "visible";
};





let _settings= create("div");
_settings.id= "settings";
document.body.append(_settings);
_settings.innerHTML= `<svg viewBox="0 0 36 36">
<path d="M18.37 11.17a6.79 6.79 0 0 
0-2.37.43l8.8 8.8a6.78 6.78 0 0 0 
.43-2.4a6.86 6.86 0 0 0-6.86-6.83z" 
class="clr-i-solid clr-i-solid-path-1" 
fill="currentColor"/>
<path d="M34.29 17.53c-3.37-6.23-9.28-10-15.82-10a16.82 
16.82 0 0 0-5.24.85L14.84 10a14.78 14.78 0 0 1 
3.63-.47c5.63 0 10.75 3.14 13.8 8.43a17.75 17.75 
0 0 1-4.37 5.1l1.42 1.42a19.93 19.93 0 0 0 5-6l.26-.48z" 
class="clr-i-solid clr-i-solid-path-2" fill="currentColor"/>
<path d="M4.87 5.78l4.46 4.46a19.52 19.52 0 0 0-6.69 
7.29l-.26.47l.26.48c3.37 6.23 9.28 10 15.82 10a16.93 
16.93 0 0 0 7.37-1.69l5 5l1.75-1.5l-26-26zm8.3 
8.3a6.85 6.85 0 0 0 9.55 9.55l1.6 1.6a14.91 14.91 
0 0 1-5.86 1.2c-5.63 0-10.75-3.14-13.8-8.43a17.29 
17.29 0 0 1 6.12-6.3z" class="clr-i-solid clr-i-solid-path-3" 
fill="currentColor"/></svg>`;

_settings.onclick= function(){
this.classList.toggle("open");
if(this.classList.contains("open")){
_div.style.display= "block";
}
else{
_div.style.display= "none";
}

};

select("#modal .close").onclick=()=>{
_div.style.display= "none";
_settings.classList.toggle("open");
};
