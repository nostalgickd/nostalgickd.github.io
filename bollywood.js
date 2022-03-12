let bollywood= {
"http://sc-bb.1.fm:8017":"Bombay Beats",
"http://109.169.46.197:8011/stream":"Diverse FM",
"http://music2.vvradio.co.in:2802/stream2":"VV Radio",
"https://astro4.rastream.com/india?type=mp3":"India Beat",
"https://c5.radioboss.fm:18125/stream":"Manpasand",
"http://radio.punjabrocks.com:9998/taal":"Taal",
"https://eu47-sonic.instainternet.com/8068/stream":"Himal Filmy",
"http://indifun.net:7000/;stream.nsv":"Indifun",
"http://peridot.streamguys.com:7150/Mirchi":"Mirchi FM",
"http://79.120.39.202:8002/indiancinema":"Caprice",
//"https://prclive1.listenon.in/":"Radio City [Talk]",
"https://funasia.streamguys1.com/live9":"Big Melodies",
"https://cp12.serverse.com/proxy/hummfm?mp=/live":"Humm FM",
"https://stream.zeno.fm/2vhb00mhky8uv":"Singham",
//"https://stream.zeno.fm/d22wrdbst5quv.mp3":"Radio Wow",
"http://hoth.alonhosting.com:1080/;stream.mp3":"BollyHits",
"http://103.179.56.26:8000/radio.aac":"Nitnut",
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
"https://stream.zeno.fm/y0ce4dbtfa0uv" : "Indias Movies"
};


let bollywood1= {
"//strm112.1.fm/bombaybeats_mobile_mp3":"Bombay Beats",
"//media-ice.co.uk:8000/DiverseAAC":"Diverse FM",
"//music2.vvradio.co.in:2802/stream2":"VV Radio",
"//astro4.rastream.com/india?type=mp3":"India Beat",
"//c5.radioboss.fm:18125/stream":"Manpasand",
"//stream.zeno.fm/cngd2qk67reuv":"Taal",
"//eu47-sonic.instainternet.com/8068/stream":"Himal Filmy",
"//indifun.net:7000/;stream.nsv":"Indifun",
"//peridot.streamguys.com:7150/Mirchi":"Mirchi FM",
"//stream.zeno.fm/vmp0tkewzv8uv":"Caprice",
"//prclive1.listenon.in/":"Radio City [Talk]",
"//funasia.streamguys1.com/live9":"Big Melodies",
"//cp12.serverse.com/proxy/hummfm?mp=/live":"Humm FM",
"//stream.zeno.fm/2vhb00mhky8uv":"Singham",
//"https://stream.zeno.fm/d22wrdbst5quv.mp3":"Radio Wow",
"//stream.zeno.fm/6rth3ywheg8uv":"BollyHits",
"//stream.zeno.fm/dhytbz6zfchvv":"Nitnut",
"//stream.zeno.fm/a69txeenvzzuv":"SRK Online",
"//stream.bongonet.net/proxy/rhi?mp=/stream":"RHI - Covers",
"//stream.zeno.fm/eyxg23ky4x8uv" : "Marudhara",
"//stream.zeno.fm/8wk1s0pt008uv" : "NP 24",
"//drive.uber.radio/uber/bollywooduditnarayan/icecast.audio" : "Udit Narayan",
"//drive.uber.radio/uber/bollywoodalkayagnik/icecast.audio" : "Alka Yagnik",
"//stream.zeno.fm/8e9q38tg7zquv" : "Hindi Music",
"//drive.uber.radio/uber/bollywoodvishalandshekhar/icecast.audio":"Vishal & Shekhar"
};



let list= [bollywood];
let liststring= "bollywood";

let block= "[2,3,4,5,8,11,17,18]";
let blocklist= localStorage["_block"]|| block;
block= JSON.parse(blocklist);
