//------------------------------------------------
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let offline= "../resources/kdradiosorry.mp3",
isoffline= new URL(offline, location),
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
if(srflag) srflag.onclick=()=> location= "index.html";
if(inflag) inflag.onclick=()=> location= "bollywood.html";			

pause.onclick=()=>{
let red= select(".paused");
let green= select(".playing");
if(audio.paused){
audio.play();
red.className= "span playing";
}
else{
audio.pause();
green.className= "span paused";
}
};



//------INITIAL SETUP --------
if(list.length > 1){
main(list[lang]);
left.onclick=()=> change("left");
right.onclick=()=> change("right");
toggle.style.visibility= "visible";
genre.innerHTML=location.hash=liststring[lang];
}
else{
main(list[0]);
toggle.style.visibility= "hidden";
}


window.onhashchange=()=>{
lolz();
//alert(hash + ":"+ lang);
container.innerHTML= "";
main(list[lang]);
genre.innerHTML=liststring[lang];


};




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


//----------------------------------â­â­â­â­
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
showControls(i.innerText,x);
if(/idle|paused/.test(this.className)){
span.forEach(i=> i.className= "span idle");							
audio.innerHTML=`<source src="${url[x]}"><source src="${offline}">`;
audio.load(); audio.play();
stationInfo(i);
}
};
});


saveState();
}




//*****HELPER*****FUNCTIONS*****



//Display current station info-----
function stationInfo(x){
audio.ontimeupdate=()=>{
if(audio.currentTime>1){
if(audio.currentSrc==isoffline){
  x.className= "span offline";
  document.title= x.innerText + " [offline] - KD Radio";
  timer.innerHTML= x.innerHTML + " is offline";
  pause.innerHTML= "&bull; &bull; &bull;";
  pause.style.pointerEvents= "none";
}
else{
  let paused= audio.paused;
  document.title= paused ? x.innerText + " [paused] - KD radio" : x.innerText + " - KD Radio";
  paused ? updateTime(x.innerHTML,"paused") : updateTime(x.innerHTML);
  x.className= paused ? "span paused" : "span playing";
  pause.innerHTML= paused ? "PLAY" : "PAUSE";
  pause.style.pointerEvents= "auto";
}
}
else{
x.className= "span clicked";
//document.title= x.innerHTML + " - KD Radio";
document.title= "Kawiesh's Radio Collection";
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
{ src: '../resources/artwork/background-96x96.png',   sizes: '96x96',   type: 'image/png' },
{ src: '../resources/artwork/background-128x128.png', sizes: '128x128', type: 'image/png' },
{ src: '../resources/artwork/background-192x192.png', sizes: '192x192', type: 'image/png' },
{ src: '../resources/artwork/background-256x256.png', sizes: '256x256', type: 'image/png' },
{ src: '../resources/artwork/background-384x384.png', sizes: '384x384', type: 'image/png' },
{ src: '../resources/artwork/background-512x512.png', sizes: '512x512', type: 'image/png' },
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
case 1: M= "1 min. & "; break;
default:M= `${m} min. & `;
}

if(b=="paused"){
timer.innerHTML= `${a} paused after ${H}${M}${s} sec.`;
}
else timer.innerHTML= `Listening to ${a} for ${H}${M}${s} sec.`;
}



//Hiding stations-------------
function expand(){
hide.innerHTML= hidden ? "ALL" : "FEW";
block.forEach(i=> span[i].style.display= hidden ? "none" : "flex");
hidden= !hidden;
}


//Check genre--------------
function checkGenre(index){
liststring.split(",").forEach((i,x)=>{
if(index==x) genre.innerHTML= i;
});
}




//-----Change genres-----------
let maxstations= list.length;
function change(direction){
//audio.pause();
container.innerHTML= "";

if(direction=="right"){
if(lang==maxstations-1) lang= -1;
lang++;
}
else if(direction=="left"){
if(lang==0) lang= maxstations;
lang--;
}

main(list[lang]);
genre.innerHTML=location.hash= liststring[lang];


}


//KARVANISTA 


let allStations= Object.values(Object.assign({}, ...list));
let keywords= allStations.map(i=>{
if(!i.includes("Radio")){
return "Radio " + i;
}
else return i;
});

let meta1= select("meta[name='keywords']");
let meta2= create("meta");
meta2.name= "keywords";
meta2.content= keywords.join(", ");
meta1.after(meta2);


//INFO LINK
let about= create("a");
about.dataset.nosnippet= true;
document.body.append(about);
about.className= "info";
about.href= "https://kawiesh.tk/about.html";
about.target= "_blank";
about.innerHTML= `
<svg class= "info" viewBox="0 0 63 64">
<path d="M55.826.723H7.916A7.29 7.29 0 0 0 .625 8.014v47.91a7.29 7.29 0 
0 0 7.291 7.291h47.91a7.29 7.29 0 0 0 7.291-7.291V8.014A7.29 7.29 0 0 0 
55.826.723zm-24.25 53.874c-12.508 0-22.648-10.139-22.648-22.649c0-12.509 
10.139-22.649 22.648-22.649c12.508 0 22.648 10.14 22.648 22.649c0 
12.508-10.14 22.649-22.648 22.649z"/>
<path d="M31.576 14.362c-9.713 0-17.587 7.874-17.587 17.586c0 9.713 7.873 
17.588 17.587 17.588c9.713 0 17.587-7.875 17.587-17.588c0-9.713-7.874-17.586-17.587-17.586zm2.673 
32.722h-5.181v-5.318h5.181v5.318zm5.182-16.554c-2.182 2.916-5.182 
1.745-5.182 6.408v3.055h-5.181V34.81c0-2.317.927-3.98 2.891-4.963c2.774-1.387 
5.208-4.008 3.026-6.708c-.933-1.155-2.1-1.281-3.463-1.281c-2.29 0-4.582 1.254-4.582 
4.827c0 1.201-.01 1.81-.01 1.81l-5.035-.011c-.818-6.517 3.435-9.547 4.636-10.363c1.445-.982 
6.628-2.782 11.208.846c4.004 3.169 4.642 7.618 1.692 11.563z"/>
</svg>`;



selectAll("body *").forEach(i=>{
i.dataset.nosnippet= "true";
});


function saveState(){
let source= select("source",audio);
if(!source) return;

for(let i=0; i<url.length; i++){
if(source.src==url[i]){

   if(audio.currentSrc==isoffline){
   span[i].className= "span offline";
   return;
   }

   span[i].className= (audio.paused) ? "span paused" : "span playing";
   return;
}}
}
