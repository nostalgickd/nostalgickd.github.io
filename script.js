let message= `You're viewing this page over https. Not all stations can be played over https.
Load the http version of this page to be able to play all stations.
Click on "OK" to load it now or click "Cancel" to keep using https!`;


if(location.protocol=="http:"){
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
pagetitle= "",
button= select(".button"),
container= select("#container"),
stop= select("#stop"),
timer= select("#timer");

if(inflag){
pagetitle= "KD Radio - Suriname";
inflag.onclick=()=> location= "bollywood.html";				
}

if(srflag){
pagetitle= "KD Radio - Bollywood";
srflag.onclick=()=> location= "/";			
}

document.body.onselectstart=()=>{
return false;
};


//Using button to switch genres
if(list.length > 1){
main(list[0]);
button.onclick= change;
//button.style.display= "flex";
button.style.visibility= "visible";
}
else{
main(list[0]);
//button.style.display= "none";
button.style.visibility= "hidden";	
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

//Check genre-------------
function taal(a,b,c){
if(a){
block= b;
button.innerHTML= c;		
}		
}

//Switch genre-------------
function change(){
stopAll();
document.title= pagetitle;
timer.innerHTML= "NO RADIO PLAYING";
span.forEach(i=>i.remove());
hide.classList.remove("clicked");
hide.innerHTML= "ALL";
if(sr==list.length) sr=0;
//taal((sr==0),[0,4,5,6,8,9],"Sarnamie");
taal((sr==0),[],"Sarnamie");
taal((sr==1),[],"General");
taal((sr==2),[],"Javanese");
taal((sr==3),[],"Sranang");
taal((sr==4),[],"Christian");
taal((sr==5),[],"Other");
main(list[sr]);
sr++;
}


//Media controls-----------------
function controls(a){
if ('mediaSession' in navigator) {
navigator.mediaSession.metadata = new MediaMetadata({
title: a,
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
