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


let offline= "../resources/kdradiosorry.mp3",
srflag= select("#sr"),
inflag= select("#in"),
hide= select("#hide"),
pagetitle= "",
toggle= select("#genre"),
left= select(".left"),
genre= select(".genre"),
right= select(".right"),
container= select("#container"),
stop= select("#stop"),
timer= select("#timer");

if(left || right){
left.innerHTML= `<svg class="dir" viewBox="0 0 24 24">
<path d="M2 11l7-9v5c11.953 0 13.332 9.678 13 
15c-.502-2.685-.735-7-13-7v5l-7-9z"/></svg>`;

right.innerHTML= `<svg class="dir" viewBox="0 0 24 24">
<path d="M22 11l-7-9v5C3.047 7 1.668 16.678 
2 22c.502-2.685.735-7 13-7v5l7-9z"/></svg>`;
}


if(inflag){
pagetitle= "KD Radio - Suriname";
inflag.onclick=()=> location= "bollywood.html";				
}

if(srflag){
pagetitle= "KD Radio - Bollywood";
srflag.onclick=()=> location= "index.html";			
}

document.body.onselectstart=()=>{
return false;
};


//Using button to switch genres
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



/*________________________________Main_Function__________________*/
function main(list){
let url= Object.keys(list);
let name= Object.values(list);

//Create players
name.forEach((i,x)=>{
let a= create("span");
a.className= "span white";
a.innerHTML= i +`<audio class="audio"></audio>`;
container.append(a);
});

//Select players
audio= selectAll(".audio");
span= selectAll(".span");

audio.forEach((i,x)=>{

//Clicked
i.parentNode.onclick=()=>{
if(i.paused){
play(i,url[x]);
timer.innerHTML= `Loading ${i.parentNode.innerText}...`;
}
else{
return false;				
}
};



//Playing
i.onplay=()=>{
duration(i);
i.parentNode.className= "span green";
document.title= `${i.parentNode.innerText} - KD Radio`;
navigator.mediaSession.setActionHandler("previoustrack", ()=>skip(x,"prev"));
navigator.mediaSession.setActionHandler("nexttrack", ()=>skip(x,"next"));

};
				

//Paused
i.onpause=()=>{
i.parentNode.className= "span red";
document.title=  `${i.parentNode.innerText} [Paused] - KD Radio`;
timer.innerHTML= `${i.parentNode.innerText} is currently paused`;
};

});

//Stopping all stations 
stop.onclick=()=>{
stopAll();
document.title= pagetitle;
timer.innerHTML= "NO RADIO PLAYING";
};

//Hiding stations
if(block.length > 0){
spanDisplay("none");
hide.onclick= expand;
//hide.style.display= "inline-flex";
hide.style.visibility= "visible";
}
else{
//hide.style.display= "none";
hide.style.visibility= "hidden";
}


//Skip station via notification panel
function skip(a,b){
let limit= url.length-1;
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



}//End of main function







/*________________________________Helper_Functions__________________*/

//Stop all stations
function stopAll(){
audio.forEach(i=>{
i.innerHTML= ""; i.load();		
i.parentNode.className= "span white";
});
document.title= pagetitle;
timer.innerHTML= "NO RADIO PLAYING";
}

//Play this station--------------------------
function play(a,b){
stopAll();
a.innerHTML=`<source src="${b}"><source src="${offline}">`;
a.load(); a.play();
}


//Display duration---------------------------
function duration (station){
function tijd(x,y="1"){
if(y==0){
timer.innerHTML= `Loading ${station.parentNode.innerText}...`;
}
else{
timer.innerHTML= `Listening to ${station.parentNode.innerText} for ${x} seconds`;
}
}

station.ontimeupdate= function(){



let time= new Date(this.currentTime * 1000).
toISOString().substr(11, 8).split(":");
let h= +time[0], m= +time[1], s= +time[2];

if(this.currentTime>0) this.parentNode.className= "span playing";

if(!this.paused){
if(h==0){
if(m==0) s==0 ? tijd(s,0) : tijd(s);
if(m==1) tijd(`1 minute & ${s}`);
if(m >1) tijd(`${m} minutes & ${s}`);
}

if(h==1){
if(m==0) tijd(`1 hour & ${s}`);
if(m==1) tijd(`1 hour, 1 minute & ${s}`);
if(m >0) tijd(`1 hour, ${m} minutes & ${s}`);
}

if(h >1){
if(m==0) tijd(`${h} hours & ${s}`);
if(m==1) tijd(`${h} hours, 1 minute & ${s}`);
if(m >0) tijd(`${h} hours, ${m} minutes & ${s}`);
}

if(this.currentSrc.includes("kdradiosorry")){
this.parentNode.className= "span red";
document.title=  `${this.parentNode.innerText} [offline] - KD Radio`;
timer.innerHTML= `${this.parentNode.innerText} is currently offline`;
}
}

controls(document.title.replace(/ ?- ?KD Radio/g,""));

};
}

//Hiding stations--------------------
function spanDisplay(a){
block.forEach(x=> {
span[x].style.display= a;
});
}

//Initiating hide stations-------------
function expand(){
hide.classList.toggle("clicked");
if(hide.classList.contains("clicked"))	{
hide.innerHTML= "FEW";
spanDisplay("flex");
}
else{
hide.innerHTML= "All";
spanDisplay("none");				
}	
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
stopAll();
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


//Media controls-----------------
function controls(a){
if ('mediaSession' in navigator) {
navigator.mediaSession.metadata = new MediaMetadata({
title: a,
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
