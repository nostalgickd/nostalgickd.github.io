let
create= document.createElement.bind(document),
select= document.querySelector.bind(document),
selectAll= document.querySelectorAll.bind(document);

let
url= Object.keys(list),
name= Object.values(list),
offline= "../resources/sorry-kd-radio.mp3",
stop= create("p"),
timer= create("div"),
container= create("div");
stop.id= "stop";
timer.id= "timer";
container.id= "container";
stop.innerHTML= "STOP";
timer.innerHTML= "NO RADIO PLAYING";
container.append(stop,timer);	
document.body.append(container);
document.body.onselectstart=()=> {return false;};

let country= select("#in") || select("#sr");
country.onclick=()=> location= switchradio;

name.forEach((i,x)=>{
let
a= create("span"),
b= create("audio");
    
a.innerHTML= i;
a.append(b);
stop.before(a);
});
         
let
audio= selectAll("audio"),
span= selectAll("span");

//-------------------------------DURATION-------------------------------

function duration (a,b,c){

a.ontimeupdate= function() {
let time= new Date(a.currentTime * 1000).
          toISOString().substr(11, 8).split(":");

let h= time[0], m= time[1], s= time[2];

if (h<=9 && h>0) h= h.replace("0","");
if (m<=9 && m>0) m= m.replace("0","");
if (s<=9 && s>0) s= s.replace("0","");
if (s==00      ) s= s.replace("0","");

let
no= `Loading ${b}...`,
ok= `Listening to ${b} for`;

let
H1= 1 + " hour",
HH= h + " hours",
M1= 1 + " minute",
MM= m + " minutes",
SS= s + " seconds";


if(!a.paused){

let
x=[
h==0 && m==0 && s==0,
h==0 && m==0 && s >0,
h==0 && m==1 && s>=0,
h==0 && m >1 && s>=0,
h==1 && m==0 && s>=0,
h==1 && m==1 && s>=0,
h==1 && m >1 && s>=0,
h >1 && m==0 && s>=0,
h >1 && m==1 && s>=0,
h >1 && m >1 && s>=0
];

if (x[0]) timer.innerHTML= no;
if (x[1]) timer.innerHTML= `${ok} ${SS}`;
if (x[2]) timer.innerHTML= `${ok} ${M1} & ${SS}`;
if (x[3]) timer.innerHTML= `${ok} ${MM} & ${SS}`;
if (x[4]) timer.innerHTML= `${ok} ${H1} & ${SS}`;
if (x[5]) timer.innerHTML= `${ok} ${H1}, ${M1} & ${SS}`;
if (x[6]) timer.innerHTML= `${ok} ${H1}, ${MM} & ${SS}`;
if (x[7]) timer.innerHTML= `${ok} ${HH} & ${SS}`;
if (x[8]) timer.innerHTML= `${ok} ${HH}, ${M1} & ${SS}`;
if (x[9]) timer.innerHTML= `${ok} ${HH}, ${MM} & ${SS}`;

if(a.currentSrc.includes("sorry-kd-radio")){
c.style.border= "1px solid red";
c.style.color= "red";
document.title= c.innerText + " [offline] - KD Radio";
timer.innerHTML= c.innerText + " is currently offline";			
}
}

};}

//-------------------------------HIDE-------------------------------
let
hidden= true,
expand= select("#hide");

if(block.length==0){
expand.style.display= "none";
}
else{
block.forEach(i=> span[i].style.display= "none");
}

expand.onclick=()=>{
if(hidden){
block.forEach(i=>span[i].style.display= "flex");
expand.innerHTML= "FEW";			
hidden= false;
}	
else{
block.forEach(i=>span[i].style.display= "none");				
expand.innerHTML= "ALL";	
hidden= true;						
}	
};

//-------------------------------STOP-------------------------------
function stopAll(){
audio.forEach((i,x)=>{
i.innerHTML= ""; 
i.load();		
span[x].style.border= "1px solid darkgray";	
span[x].style.color= "white";	
});	
}

stop.onclick=()=>{
stopAll();
document.title= title;
timer.innerHTML= "NO RADIO PLAYING";
};

//-------------------------------PLAY-------------------------------
function play(a,b){
stopAll();
let source1= create("source"),
    source2= create("source");

source1.src= b;
source2.src= offline;
a.append(source1,source2);

a.load();
a.play();
}


//-------------------------BROWSER--CONTROLS------------------------
let limit= url.length-1;

function skip(a,b){
let z= a;
if(b=="next"){
if (z==limit) z= -1;
play(audio[z+1],url[z+1]);
timer.innerHTML= `Loading ${name[z+1]}...`;
}
if(b=="prev"){
if (z==0) z= limit+1;
play(audio[z-1],url[z-1]);
timer.innerHTML= `Loading ${name[z-1]}...`;
}
}

//--------------------------MAIN--FUNCTION-------------------------

span.forEach((i,x)=>{

audio[x].onplay=()=>{
duration(audio[x],name[x],span[x]);
i.style.border= "1px solid #39ff14";
i.style.color= "#39ff14";
document.title= name[x] + " - KD Radio";
navigator.mediaSession.setActionHandler("nexttrack", ()=>skip(x,"next"));
navigator.mediaSession.setActionHandler("previoustrack", ()=>skip(x,"prev"));
};

//----------------------
audio[x].onpause=()=>{
i.style.border= "1px solid red";
i.style.color= "red";
document.title= name[x] + " [Paused] - KD Radio";
timer.innerHTML= name[x] + " is currently paused";
};

//----------------------
i.onclick=()=>{
if(!audio[x].paused){
return false;
}
else{
play(audio[x],url[x]);
timer.innerHTML= `Loading ${i.innerHTML}...`;
}
};
});


//THE END
