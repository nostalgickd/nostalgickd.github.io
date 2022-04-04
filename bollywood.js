let bollywood= {
"https://strm112.1.fm/bombaybeats_mobile_mp3":"Bombay Beats",
//"https://media-ice.co.uk:8000/DiverseAAC":"Diverse FM",
"https://a11.streamgb.com/proxy/radioxl?mp=/stream":"Diverse FM",
"https://eu1.fastcast4u.com/proxy/vvradio?mp=/;":"VV Radio",
"https://astro4.rastream.com/india?type=mp3":"India Beat",
"https://c5.radioboss.fm:18125/stream":"Manpasand",
"https://stream.zeno.fm/cngd2qk67reuv":"Taal",
"https://eu47-sonic.instainternet.com/8068/stream":"Himal Filmy",
"http://indifun.net:7000/;stream.nsv":"Indifun",
"http://peridot.streamguys.com:7150/Mirchi":"Mirchi FM",
"https://stream.zeno.fm/vmp0tkewzv8uv":"Caprice",
"https://prclive1.listenon.in/":"Radio City [Talk]",
"https://funasia.streamguys1.com/live9":"Big Melodies",
"https://tunein-icecast.mediaworks.nz/humm_128kbps":"Humm FM",
//"https://cp12.serverse.com/proxy/hummfm?mp=/live":"Humm FM",
"https://stream.zeno.fm/2vhb00mhky8uv":"Singham",
//"https://stream.zeno.fm/d22wrdbst5quv.mp3":"Radio Wow",
"http://hoth.alonhosting.com:1080/;stream.mp3" : "BollyHits",
"https://stream.zeno.fm/dhytbz6zfchvv":"Nitnut",
"https://stream.zeno.fm/a69txeenvzzuv":"SRK Online",
"https://stream.bongonet.net/proxy/rhi?mp=/stream":"RHI - Covers",
"https://stream.zeno.fm/eyxg23ky4x8uv" : "Marudhara",
"https://stream.zeno.fm/8wk1s0pt008uv" : "NP 24",
"https://drive.uber.radio/uber/bollywooduditnarayan/icecast.audio" : "Udit Narayan",
"https://drive.uber.radio/uber/bollywoodalkayagnik/icecast.audio" : "Alka Yagnik",
"https://stream.zeno.fm/8e9q38tg7zquv" : "Hindi Music",
"https://drive.uber.radio/uber/bollywoodvishalandshekhar/icecast.audio":"Vishal & Shekhar",
"https://stream.zeno.fm/4zg81bp7a5zuv" : "SB FM Parepare",
"https://stream.zeno.fm/4gfevnscvp8uv" : "DesiZone 90s",
"https://stream.zeno.fm/uspcm0rcvp8uv" : "DesiZone 2000s",
"https://stream.zeno.fm/y0ce4dbtfa0uv" : "Indias Movies"
};


//--------

let proxy0= "https://cors.bitwize.com.lb/";
let proxy1= "https://www.liveradio.es/";
let proxy2= "https://api.codetabs.com/v1/proxy?quest=";

function addProxy(oldobj,newobj){
for(let key in oldobj){
if(!key.startsWith("https")){
newobj[`${proxy0}${key}`]= `${oldobj[key]} !`;
}
else newobj[key]= oldobj[key];
}
}

let list= [bollywood];

//Add proxy, only when viewing over HTTPS
if(location.protocol=="https:"){
let bollywood1={};
let list1= [bollywood1];
list.forEach((i,x)=> addProxy(list[x],list1[x]));
list= list1;
}


let liststring= "bollywood";

let block= "[2,4,5,8,10,12,18,19]";
let blocklist= localStorage["_block"]|| block;
block= JSON.parse(blocklist);
