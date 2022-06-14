
let overlay= create("div");
overlay.dataset.nosnippet= true;
overlay.id= "overlay"; overlay.className= "hidden";
document.body.append(overlay);
overlay.innerHTML=`
<div class="normalflex modal">
	
	<div class="centerflex" data-nosnippet><b>select stations to hide</b></div>
	<div class="normalflex" data-nosnippet>
		<select class="select" multiple></select>
		<button class="save">SAVE</button>
	</div>
	
	<div class="centerflex msg" data-nosnippet>
		<i><span class="nr" data-nosnippet>0</span>&nbsp; stations hidden!</i>
	</div>
	
	<div class="centerflex" data-nosnippet><b>Close tab after ?? minutes<b></div>
	<div class="normalflex" data-nosnippet>
		<input class="input" type="number">
		<button class="sleep">SLEEP</button>
	</div>
	
	<div class="centerflex close" data-nosnippet>&times;</div>
</div>`;


let stationList= select(".modal .select");
let save= select(".modal .save");
let msg= select(".modal .nr");

let lsblock=()=> genre.innerHTML + "block";
let selectedStations=()=> [...stationList.selectedOptions].map(i=> i.index);



function manageHidden(){
stationList.value= stationList.innerHTML= "";
let optgroup= create("optgroup");
optgroup.label= "Select stations to hide:";
stationList.append(optgroup);
spans.forEach(i=>{
let option= create("option");
option.innerHTML= i.textContent;
stationList.append(option);
});

let blocklist= localStorage[lsblock()];
blocklist= blocklist ? JSON.parse(blocklist) : ibl[genre.innerHTML];

let options= selectAll(".modal option");
blocklist.forEach(i=>{
options[i].selected= true;
spans[i].classList.add("hidden");
});

hide.innerHTML= "ALL";
}







hide.onclick=()=>{
let hidden= select(".span.hidden");
if(hidden){
hide.innerHTML= "FEW";
spans.forEach(i=>i.classList.remove("hidden"));
}
else{
hide.innerHTML= "ALL"
selectedStations().forEach(i=> spans[i].classList.add("hidden"));
}
};



	
//hide.onclick=()=> manageHidden(false);
select(".about").onclick=()=> window.open("about");
select(".modal .close").onclick=()=> overlay.className= "hidden";
stationList.oninput=()=> save.innerHTML= "SAVE";

select(".settings").onclick=()=>{
overlay.className= "unhidden";
save.innerHTML= "SAVE";
msg.innerHTML= selectedStations().length;
};

save.onclick=()=>{
save.innerHTML= "SAVED";
hide.innerHTML= "ALL";
msg.innerHTML= selectedStations().length;
spans.forEach(i=> i.classList.remove("hidden")); 
selectedStations().forEach(i=> spans[i].classList.add("hidden"));
localStorage[lsblock()]= JSON.stringify(selectedStations());
};

manageHidden(true);

//Sleeptimer-------------------------------------------
select(".sleep").onclick=()=>{
let mins= select(".input").value;
let html= select("html");
if(mins){
let tab= window.open(location.href);
let time= mins*60*1000;
let left= time;
writeIt(time,html,left);

setTimeout(()=>{
tab.close();
},time);
}
else alert("INVALID TIME");
};



function writeIt(x,y,z){
if(x>1000){
y.innerHTML= `>>Tab opened in a new tab!<br>
>>It will close in ${formatTime(x)}`;
x= x-1000;
setTimeout(()=>{
writeIt(x,y,z);
document.title= "Sleep Timer - KD Radio";
},1000);
}
else{
y.innerHTML= `>>Tab opened in a new tab!<br>
>>Closed after ${formatTime(z)}`;
document.title= "Sleep Timer - KD Radio";
}
}
