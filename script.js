//------------------------------------------------
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let offline= "resources/kdradiosorry.mp3",
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
let urls,names,spans;


if(left||right){
left.innerHTML= `<svg class="dir" viewBox="0 0 24 24"><g>
<path d="M2 11l7-9v5c11.953 0 13.332 9.678 13 15c-.502-2.685-.735-7-13-7v5l-7-9z"/>
</g></svg>`;
right.innerHTML= `<svg class="dir" viewBox="0 0 24 24"><g>
<path d="M22 11l-7-9v5C3.047 7 1.668 16.678 2 22c.502-2.685.735-7 13-7v5l7-9z"/>
</g></svg>`;
}


//SET GENRE
let lang= 0;
let liststring= Object.keys(ibl);
let hash= liststring[lang];

//PROXY OVER HTTPS
if(location.protocol=="https:"){
let proxiedList= [];
list.forEach(i=>{
let clonedObject= {};
proxiedList.push(clonedObject);
});

list.forEach((i,x)=> addProxy(list[x],proxiedList[x]));
list= proxiedList;
}



document.body.onselectstart=()=> false;
if(srflag) srflag.onclick=()=> location= "/";
if(inflag) inflag.onclick=()=> location= "bollywood.html";			

pause.onclick=()=>{
let red= select(".paused");
let green= select(".playing");
if(audio.paused){
audio.play();
addThisClass(green,"playing")
}
else{
audio.pause();
addThisClass(red,"paused");
}
};





//------INITIAL SETUP --------
checkGenre();
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
container.innerHTML= "";
checkGenre(); //alert(hash + ":"+ lang);
main(list[lang]);
genre.innerHTML= location.hash= liststring[lang];
manageHidden();
};




//----------------------------------
function main(list){
urls= Object.keys(list);
names= Object.values(list);

names.forEach(i=>{
let a= create("span");
a.dataset.nosnippet= true;
addThisClass(a,"span");
addThisClass(a,"idle");
a.innerHTML= i;
a.dataset.nosnippet= "";
container.append(a);
});

spans= selectAll(".span");
spans.forEach((i,x)=>{
i.onclick= function(){
showControls(i.innerText,x);
if(/idle|paused/.test(this.className)){
spans.forEach(i=> addThisClass(i,"idle"));							
audio.innerHTML=`<source src="${urls[x]}">
<source src="${offline}">`;
audio.load(); audio.play();
stationInfo(i);
}
};
});

/*&& audio.currentTime>0
for(let i=0; i<url.length; i++){
if(audio.currentSrc==url[i]){
span[i].className=(audio.paused) ? "span paused" : "span playing";
break;
}
}

//adding ?v=1 to url clashes with saveState
*/

saveState();
}


//Helper---functions--


//Display current station info-----
function stationInfo(x){
audio.ontimeupdate=()=>{
if(audio.currentTime>1){
if(audio.currentSrc==isoffline){
  addThisClass(x,"offline");
  document.title= x.innerText + " [offline] - KD Radio";
  timer.innerHTML= x.innerHTML + " is offline";
  pause.innerHTML= "&bull; &bull; &bull;";
  pause.style.pointerEvents= "none";
}
else{
  let paused= audio.paused;
  document.title= paused ? 
  x.innerText + " [paused] - KD radio" : x.innerText + " - KD Radio";
  paused ? 
  updateTime(x.innerHTML,"paused") : updateTime(x.innerHTML,"playing");
  pause.innerHTML= paused ? "PLAY" : "PAUSE";
  pause.style.pointerEvents= "auto";
  if(paused) addThisClass(x,"paused");
  else addThisClass(x,"playing");
}
}
else{
addThisClass(x,"clicked");
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
let limit= urls.length-1; let z= a;
if(b=="next"){
if(z==limit) z= -1;
spans[z+1].click();
}
if(b=="prev"){
if(z==0) z= limit+1;
spans[z-1].click();
}
}

//Show controls-------------
let btns= selectAll("#bottombar button");
let nms= false;

function showControls(station,x){
btns[0].onclick=()=>{skip(x,"prev")};
btns[1].onclick=()=>{skip(x,"next")};
if (nms || 'mediaSession' in navigator) {
nms= true;
navigator.mediaSession.setActionHandler("nexttrack", ()=>skip(x,"next"));
navigator.mediaSession.setActionHandler("previoustrack", ()=>skip(x,"prev"));
navigator.mediaSession.metadata = new MediaMetadata({
title: station,
artist: "KD Radio @ " + location.hostname,
artwork: [
{ src: 'resources/artwork/background-96x96.png',   sizes: '96x96',   type: 'image/png' },
{ src: 'resources/artwork/background-128x128.png', sizes: '128x128', type: 'image/png' },
{ src: 'resources/artwork/background-192x192.png', sizes: '192x192', type: 'image/png' },
{ src: 'resources/artwork/background-256x256.png', sizes: '256x256', type: 'image/png' },
{ src: 'resources/artwork/background-384x384.png', sizes: '384x384', type: 'image/png' },
{ src: 'resources/artwork/background-512x512.png', sizes: '512x512', type: 'image/png' },
]
});

}
}


//Update time-------------
function formatTime(time){
let hms= new Date(time).toISOString().substr(11,8).split(":");
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

return `${H}${M}${s} sec.`;

}






//Update time-------------
function updateTime(a,b){
let time= formatTime(audio.currentTime*1000);
timer.innerHTML= (b=="paused") ? 
`${a} paused after ${time}` : `Listening to ${a} for ${time}`;
}




//-----Change genres-----------
let maxstations= list.length;
function change(direction){ //audio.pause();

if(direction=="right"){
if(lang==maxstations-1) lang= -1;
lang++;
}

if(direction=="left"){
if(lang==0) lang= maxstations;
lang--;
}

genre.innerHTML=location.hash= liststring[lang];
}



//CHECK GENRE
function checkGenre(){
hash= location.hash.replace("#","");
for(let i=0; i<liststring.length; i++){
if(liststring[i]==hash){
lang= i;
break;
}
else lang= 0;

}
}





//save audio state when switching genres
function saveState(){
let source= select("source",audio);
if(!source) return;

for(let i=0; i<urls.length; i++){
if(source.src==urls[i]){

    if(audio.currentSrc==isoffline){
    addThisClass(spans[i],"offline");
    return;
    }
		
    if(audio.paused){
    addThisClass(spans[i],"paused");
    return;
    }
    
    if(audio.currentTime>1){
    addThisClass(spans[i],"playing");
    return;
    }
    else{
    addThisClass(spans[i],"clicked");
    return;
    }

return;
}
}
}


//ADD CLASS
function addThisClass(element,klass){
element.classList.remove("idle","clicked","playing","offline","paused");
element.classList.add(klass);
}


//PROXY FUNCTION
function addProxy(oldobj,newobj){
let proxy0= "https://cors.bitwize.com.lb/";
let proxy1= "https://www.liveradio.es/";
let proxy2= "https://api.codetabs.com/v1/proxy?quest=";

for(let key in oldobj){
if(!key.startsWith("https")){
newobj[`${proxy1}${key}`]= `${oldobj[key]} !`;
}
else newobj[key]= oldobj[key];
}
}



//add meta tags
let allStations= Object.values(Object.assign({}, ...list));
let keywords= allStations.map(i=> i.includes("Radio") ? i : `Radio ${i}`);

let meta1= select("meta[name='keywords']");
let meta2= create("meta");
meta2.name= "keywords";
meta2.content= keywords.join(", ");
meta1.after(meta2);
