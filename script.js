let message= `Not all stations can be played, because you're viewing this page over https. Load the page over http to be able to play all stations.

Click "OK" to load now or "Cancel" to keep using https!`;


if(location.protocol=="https:"){
let alert= confirm(message);
if(alert) location= location.href.replace(location.protocol,"http:")
}


//------------------------------------------------
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let offline= "/resources/kdradiosorry.mp3",
srflag= select("#sr"),
inflag= select("#in"),
hide= select("#hide"),
toggle= select("#genre"),
left= select(".left"),
genre= select(".genre"),
right= select(".right"),
container= select("#container"),
pause= select("#pause"),
timer= select("#timer"),
audio= select("#audio");
let url,name,span;

if(left||right){
left.innerHTML= `<svg class="dir" viewBox="0 0 24 24"><g>
<path d="M2 11l7-9v5c11.953 0 13.332 9.678 13 15c-.502-2.685-.735-7-13-7v5l-7-9z"/>
</g></svg>`;
right.innerHTML= `<svg class="dir" viewBox="0 0 24 24"><g>
<path d="M22 11l-7-9v5C3.047 7 1.668 16.678 2 22c.502-2.685.735-7 13-7v5l7-9z"/>
</g></svg>`;
}


document.body.onselectstart=()=> false;
if(srflag) srflag.onclick=()=> location= "/";
if(inflag) inflag.onclick=()=> location= "bollywood.html";			
pause.onclick=()=> audio.paused ? audio.play() : audio.pause();

//------INITIAL SETUP --------
if(list.length > 1){
main(list[0]);
left.onclick=()=> change("left");
right.onclick=()=> change("right");
toggle.style.visibility= "visible";
}
else{
main(list[0]);
toggle.style.visibility= "hidden";	
}



//------SHOW/HIDE BUTTON--------
let hidden= true;
if(block.length > 0){
expand();
hide.onclick= expand;
hide.style.visibility= "visible";
}
else{
hide.style.visibility= "hidden";
}


//----------------------------------⭐⭐⭐⭐
function main(list){
url= Object.keys(list);
name= Object.values(list);

name.forEach(i=>{
let a= create("span");
a.className= "span idle";
a.innerHTML= i;
a.dataset.nosnippet= "";
container.append(a);
});

span= selectAll(".span");

span.forEach((i,x)=>{
i.onclick= function(){
showControls(i.innerHTML,x);
if(/idle|paused/.test(this.className)){
span.forEach(i=> i.className= "span idle");							
audio.innerHTML=`<source src="${url[x]}"><source src="${offline}">`;
audio.load(); audio.play();
stationInfo(i);
}
};
});

}
//----------------------------------⭐⭐⭐⭐





//Helper---functions---❤



//Display current station info-----
function stationInfo(x){
audio.ontimeupdate=()=>{

if(audio.currentTime>1){
if(audio.currentSrc.includes("kdradiosorry")){
  x.className= "span offline";
  document.title= x.innerHTML + " [offline] - KD Radio";
  timer.innerHTML= x.innerHTML + " is offline";
  pause.innerHTML= "&bull; &bull; &bull;";
  pause.style.pointerEvents= "none";
}
else{
  let paused= audio.paused;
  document.title= paused ? x.innerHTML + " [paused] - KD radio" : x.innerHTML + " - KD Radio";
  paused ? updateTime(x.innerHTML,"paused") : updateTime(x.innerHTML);
  x.className= paused ? "span paused" : "span playing";
  pause.innerHTML= paused ? "PLAY" : "PAUSE";
  pause.style.pointerEvents= "auto";
}
}
else{
x.className= "span clicked";
document.title= x.innerHTML + " - KD Radio";
timer.innerHTML= "Loading " + x.innerHTML;
pause.innerHTML=  "&bull; &bull; &bull;";
pause.style.pointerEvents= "none";
}

};
}


//Skip stations-------------
function skip(a,b){
let limit= url.length-1; let z= a;
if(b=="next"){
if(z==limit) z= -1;
span[z+1].click();
}
if(b=="prev"){
if(z==0) z= limit+1;
span[z-1].click();
}
}



//Show controls-------------
function showControls(station,x){
if ('mediaSession' in navigator) {

navigator.mediaSession.setActionHandler("nexttrack", ()=>skip(x,"next"));
navigator.mediaSession.setActionHandler("previoustrack", ()=>skip(x,"prev"));
navigator.mediaSession.metadata = new MediaMetadata({
title: station,
artist: "KD Radio @ " + location.hostname,
artwork: [
{ src: '/resources/artwork/background-96x96.png',   sizes: '96x96',   type: 'image/png' },
{ src: '/resources/artwork/background-128x128.png', sizes: '128x128', type: 'image/png' },
{ src: '/resources/artwork/background-192x192.png', sizes: '192x192', type: 'image/png' },
{ src: '/resources/artwork/background-256x256.png', sizes: '256x256', type: 'image/png' },
{ src: '/resources/artwork/background-384x384.png', sizes: '384x384', type: 'image/png' },
{ src: '/resources/artwork/background-512x512.png', sizes: '512x512', type: 'image/png' },
]
});

}
}


//Update time-------------
function updateTime(a,b){
let hms= new Date(audio.currentTime*1000).toISOString().substr(11,8).split(":");
let h= Number(hms[0]), m= Number(hms[1]), s= Number(hms[2]);
let H,M;

switch(h){
case 0: H= ""; break;
case 1: H= "1 hour, "; break;
default:H= `${h} hours, `;
}

switch(m){
case 0: M= ""; break;
case 1: M= "1 minute and "; break;
default:M= `${m} minutes and `;
}

if(b=="paused"){
timer.innerHTML= `${a} paused after ${H}${M}${s} seconds`;
}
else timer.innerHTML= `Listening to ${a} for ${H}${M}${s} seconds`;
}



//Hiding stations-------------
function expand(){
hide.innerHTML= hidden ? "ALL" : "FEW";
block.forEach(i=> span[i].style.display= hidden ? "none" : "flex");
hidden= !hidden;
}

//Check genre--------------
function checkGenre(x){
if(x==0) genre.innerHTML= "sarnamie";
if(x==1) genre.innerHTML= "general";
if(x==2) genre.innerHTML= "sranang";
if(x==3) genre.innerHTML= "christian";
if(x==4) genre.innerHTML= "javanese";
if(x==5) genre.innerHTML= "other";
}


//-----Change genres-----------
let current= 0;
function change(direction){
//audio.pause();
container.innerHTML= "";

if(direction=="right"){
if(current==5) current= -1;
current++;
main(list[current]);
checkGenre(current);
}
else if(direction=="left"){
if(current==0) current= 6;
current--;
main(list[current]);
checkGenre(current);
}
}


//KARVANISTA
