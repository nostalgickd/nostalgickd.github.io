<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="theme-color" content="black"/>
<meta name="msapplication-TileColor" content="#da532c"/>
<meta name="msapplication-navbutton-color" content="black"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>Sitemap</title>

<style>				
*{
box-sizing: border-box;
margin:0; padding:0; 
outline: none;
}	

body{
background: rgb(251,244,234) url("");
min-width: 100vw; 
max-width: 100vw; 
min-height: 100vh;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
}

#container{
height: auto;
width: 95%;
border: 0px solid red;
margin-top: 20px;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
}

.root{
width: 95%;
}

.root *{
text-transform: lowercase;
font: small-caps 14px Arial;
position: relative;
}



ul{
list-style-image:
url('https://api.iconify.design/ant-design/file-twotone.svg?color=gray');
}


details>summary{
list-style: none;
position: relative;
}

details[open]>summary{
color: red;
}




summary{
list-style: none;
margin-left: 10px;
}

details>summary::before{
content:
url('https://api.iconify.design/ant-design/folder-filled.svg?color=gold');
position: absolute;
left: -15px;
}


details[open]>summary::before{
content:
url('https://api.iconify.design/ant-design/folder-open-filled.svg?color=gold');
position: absolute;
left: -15px;
}




.root details ul{
margin-left: 15px;
}


li::before{
content: "\00a0\00a0\00a0";
border-top: 1px dotted black;
border-left: 1px dotted black;
height: 100%;
position: absolute;
left:-12px;
top: 0.6em;
z-index: -10;
}


li:last-child:before{
border-bottom: none;
border-left: none;
}

a{
bottom: 0px;
margin-left: 10px;
text-decoration: none;
}


.root>summary{
font-size: 20px;
}


li{
list-style:none;
}

a::before{
content: url('https://api.iconify.design/ant-design/file-filled.svg?color=rgb(100,150,150)');
position: absolute;
z-index: 9;
left:-13px;
transform: scale(0.8,0.8);
}


</style>
</head>
<body data-nosnippet>
<div id="container">

</div>
<script>				
let create= (x)=> document.createElement(x),
select= (x,y=document)=> y.querySelector(x),
selectAll= (x,y=document)=> y.querySelectorAll(x);

let list = {};

function createDetails(a,arr){
let det= create("details");
det.className= a;
let sum= create("summary");
sum.innerHTML=	a;
let ul= create("ul");
arr.forEach(i=>{
let li= create("li");
li.innerHTML= i;
ul.append(li);		
});
det.append(sum,ul);

list[a]= det.outerHTML;
};



let obj={
  "root": [
    "404.html",
    "CNAME",
    "about.html",
    "bollywood.html",
    "bollywood.js",
    "favicon.ico",
    "index.html",
    "robots.txt",
    "script.js",
    "settings.js",
    "sitemap.txt",
    "sitemap.xml",
    "style.css",
    "suriname.js",
    "template.html"
  ],
  "blackberry": [
    "blackberry/about.html",
    "blackberry/bookmarklet-maker.html",
    "blackberry/html-editor.html",
    "blackberry/index.html",
    "blackberry/radio.html"
  ],
  "radio": [
    "radio/bollywood.html",
    "radio/bollywood.js",
    "radio/index.html",
    "radio/script.js",
    "radio/style.css",
    "radio/suriname.js"
  ],
  "resources": [
    "resources/background.jpg",
    "resources/background2.jpg",
    "resources/chakrapetch.woff",
    "resources/contact.png",
    "resources/email.png",
    "resources/in.png",
    "resources/in.svg",
    "resources/kawiesh.jpg",
    "resources/kdradiosorry.mp3",
    "resources/loading.svg",
    "resources/oopshttps.mp3",
    "resources/playing.svg",
    "resources/sorry-kd-radio.mp3",
    "resources/sr.png",
    "resources/sr.svg"
  ],
  "radio>old": [
    "radio/old/bollywood.html",
    "radio/old/bollywood.js",
    "radio/old/index.html",
    "radio/old/index.js",
    "radio/old/script.js",
    "radio/old/style.css"
  ],
  "resources>artwork": [
    "resources/artwork/about.txt",
    "resources/artwork/background-128x128.png",
    "resources/artwork/background-192x192.png",
    "resources/artwork/background-256x256.png",
    "resources/artwork/background-384x384.png",
    "resources/artwork/background-512x512.png",
    "resources/artwork/background-96x96.png"
  ],
  "resources>icons": [
    "resources/icons/about.txt",
    "resources/icons/android-chrome-192x192.png",
    "resources/icons/android-chrome-512x512.png",
    "resources/icons/apple-touch-icon.png",
    "resources/icons/browserconfig.xml",
    "resources/icons/favicon-16x16.png",
    "resources/icons/favicon-32x32.png",
    "resources/icons/favicon.ico",
    "resources/icons/mstile-150x150.png",
    "resources/icons/safari-pinned-tab.svg",
    "resources/icons/site.webmanifest"
  ],
  "radio>old>resources": [
    "radio/old/resources/backgroundpic.jpg",
    "radio/old/resources/in.png",
    "radio/old/resources/loading.svg",
    "radio/old/resources/sorry-kd-radio.mp3",
    "radio/old/resources/sr.png"
  ]
};



let ax= Object.keys(obj);
let cx= Object.values(obj);


let bx= cx.map(i=>{
let lul= i.map(q=>{
let text= q.split("/").pop();
return `<a href="/${q}">${text}</a>`;
});
return lul;			
});



createDetails("radioresources",bx[7]);





bx[4].push(list["radioresources"]);
createDetails("radioold",bx[4]);
bx[2].push(list["radioold"]);
createDetails("radio",bx[2]);



createDetails("blackberry",bx[1]);



createDetails("resicon",bx[6]);
createDetails("artwork",bx[5]);
bx[3].push(list["resicon"],list["artwork"]);
createDetails("resources",bx[3]);





bx[0].push(list["radio"],list["blackberry"],list["resources"]);
createDetails("root",bx[0]);
container.innerHTML= list["root"];

selectAll(".root details").forEach(i=>{
i.closest("li").classList.add("closed");

i.firstElementChild.onclick=()=>{
(i.open) ?
i.closest("li").classList.remove("open"):
i.closest("li").classList.add("open");

};

});


select(".root").open= true;
select(".root summary").className= "open";
select(".root summary").onclick= function(){
this.className= (this.parentNode.open) ? "closed" : "open";				
}


/*
selectAll("a").forEach(i=>{
i.onclick=()=>{
return false;				
}	;		

});
*/

</script>	
</body>
</html>