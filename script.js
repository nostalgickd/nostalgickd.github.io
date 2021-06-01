let
create= document.createElement.bind(document),
select= document.querySelector.bind(document),
selectAll= document.querySelectorAll.bind(document);

let
url= Object.keys(list),
name= Object.values(list),
offline= "resources/sorry-kd-radio.mp3",
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
let hey="Listening to " + b +" for",
time= new Date(a.currentTime * 1000).toISOString().substr(11, 8).split(":"),
   h= time[0], m= time[1], s= time[2];

if (h<=9 && h>0) h= h.replace("0","");
if (m<=9 && m>0) m= m.replace("0","");
if (s<=9 && s>0) s= s.replace("0","");
if (s==00) s= s.replace("0","");

if(!a.paused){
if(h==0 && m==0 && s==0) timer.innerHTML= "Loading " + b +"....";
if (h==0 && m<1) timer.innerHTML=`${hey} ${s} seconds`;
if (h==0 && m==1) timer.innerHTML=`${hey} 1 minute and ${s} seconds`;
if (h==0 && m>1) timer.innerHTML=`${hey} ${m} minutes and ${s} seconds`;
if (h==1 && m<1) timer.innerHTML=`${hey} 1 hour and ${s} seconds`;
if (h==1 && m==1) timer.innerHTML=`${hey} 1 hour, 1 minute and ${s} seconds`;
if (h==1 && m>1) timer.innerHTML=`${hey} 1 hour, ${m} minutes and ${s} seconds`;
if (h>1 && m<1) timer.innerHTML=`${hey} ${h} hours and ${s} seconds`;
if (h>1 && m==1) timer.innerHTML=`${hey} ${h} hours, 1 minute and ${s} seconds`;
if (h>1 && m>1) timer.innerHTML= `${hey} ${h} hours, ${m} minutes and ${s} seconds`;

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
hideCalled= false,

expand= select("#hide");

function hide(){

expand.onclick=	()=>{
if(hidden){
block.forEach(i=> i.style.display= "flex");
expand.innerHTML= "FEW";			
hidden= false;
}	
else{
block.forEach(i=> i.style.display= "none");				
expand.innerHTML= "ALL";	
hidden= true;						
}	
};
hideCalled= true;			
}


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
