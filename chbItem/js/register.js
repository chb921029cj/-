(function(){
    let arr = ["url(img/timg1.jpg) no-repeat 50% 0 ","url(img/timg2.jpg) no-repeat 50% 0 ",
                "url(img/timg3.jpg) no-repeat 50% 0 ","url(img/timg4.png) no-repeat 50% 0 "];
    let  arrn = 0;

    let timer = setInterval(function(){
             arrn++;
          if( arrn==4){arrn=0}
           document.body.style.background = arr[arrn];

     },6000)
    let arrStr = ["以后有人说你讨厌你可以回一句“我知道我讨人喜欢，百看不厌～”",
        "十年汉晋十年唐，万事遣来剩得狂","幸福要走那么多路，用那么漫长的时间，做出那么多努力，毁坏它却只要迈出一步，一瞬之间，不费吹灰。"
    , "我很好。我们都还好。这才是最重要的。","世界上，唯独骗不了的，是自己的心，它总在你最没提防时，暴露你的欢喜忧愁。"
    ];

var canvas ;
setInterval(function(){
    var arrs = arrStr[`${parseInt(Math.random()*arrStr.length)}`];
       var arrss = arrs.split("");
    if( canvas !== undefined )    { for(var i of document.querySelectorAll("body>canvas") ){
        console.log(i);
        document.body.removeChild(i);
    }
};
if(!document.querySelectorAll("body>canvas")){
    for(var i of document.querySelectorAll("body>canvas") ){
        console.log(i);
        document.body.removeChild(i);
    }
};

         canvas = document.createElement("canvas");
         canvas.id="aa";
        canvas.width = 1200;
        canvas.height=30;
        canvas.style.cssText=`position:absolute;left:${Math.random()*1200}px;top:${Math.random()*700}px;z-index:10;`;
    document.body.prepend(canvas);
        let ctx = document.getElementById("aa").getContext("2d");
        ctx.beginPath();

        ctx.textBaseline = "top";
        ctx.font = "italic bold 24px/50px Arial,宋体";


        for(var i=0 ;i<arrss.length;i++){
            ctx.fillStyle=`rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)})`;
            ctx.fillText(arrss[i],i*20,0);
        }
    ctx.fill();
    document.body.prepend(canvas);
},4000)
let ctxmsg = mess.getContext("2d");
    ctxmsg.textBaseline = "top";
    ctxmsg.fillStyle="#f2c943";
    ctxmsg.font="italic bold 24px/50px arial,宋体";
    ctxmsg.fillText("老铁没事留个言呗",0,0);
    let ctxmsg1 = mess1.getContext("2d");
    ctxmsg1.textBaseline = "top";



    setInterval(function(){
        ctxmsg1.clearRect(0,0,150,50);
        ctxmsg1.beginPath();
        ctxmsg1.fillStyle=`rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)})`;
        ctxmsg1.font="italic bold 24px/50px arial,宋体";
        ctxmsg1.fillText("点击留爪",0,0);

    },1000)
    var canvas1;
    let wordButton = document.querySelector("#word>button");
    let wordInput = document.querySelector("#word>input");
    wordButton.onclick = function(){
        arrStr.push( wordInput.value);
        wordInput.value="";
          var    arrs1 = arrStr[arrStr.length-1];
           var  arrss1 = arrs1.split("");
            canvas1 = document.createElement("canvas");
            canvas1.id="bb";
            canvas1.width = 1200;
            canvas1.height=30;
            canvas1.style.cssText=`position:absolute;left:${Math.random()*1200}px;top:${Math.random()*700}px;z-index:10;`;
            document.body.prepend(canvas1);
            let ctx = document.getElementById("bb").getContext("2d");
            ctx.beginPath();

            ctx.textBaseline = "top";
            ctx.font = "italic bold 24px/50px Arial,宋体";


            for(var i=0 ;i<arrss1.length;i++){
                ctx.fillStyle=`rgb(${parseInt(Math.random()*256)},${parseInt(Math.random()*256)},${parseInt(Math.random()*256)})`;
                ctx.fillText(arrss1[i],i*20,0);
            }
            ctx.fill();
            document.body.prepend(canvas1);
        }
    document.querySelector("#word>span").onclick=function(){
        for(var i of document.querySelectorAll("body>canvas") ){
            console.log(i);
            document.body.removeChild(i);
        }
    }


})()