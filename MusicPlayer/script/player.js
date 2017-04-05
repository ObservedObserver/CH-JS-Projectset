var info,bgImage;
var musicPointer=0;
$.ajax({
  url: './config/settings.json',
  async:false,
  success: function(data){
    bgImage=data.background;
  }
});
//console.log(bgImage);
$.ajax({
  url: './sql/music.json',
  async: false,
  success: function(data){
    info=data;
  }
});
var musicNumber=info.list.length;
for(i=0;i<musicNumber;i++)
{
  var Litem="<a class='item'>"
      +"<div class='ui grid'>"
        +"<div class='eight wide column'>"+info.list[i].name+"</div>"
        +"<div class='three wide column'>"+info.list[i].singer+"</div>"
        +"<div class='three wide column'>"+info.list[i].set+"</div>"
      +"</div>"
      +"</a>";
  $(".ui.vertical.fluid.basic.menu").append(Litem);
  $(".ui.vertical.fluid.basic.menu .item:eq("+i+")").click(mid(info.list[i],i));
}
//---------------------------------------初始化
// $("#player").attr("src",info.list[musicPointer].src);
// $(".ui.vertical.inverted.fluid.text.trans.menu .item:eq(0) p").text(info.list[musicPointer].name);
// $("#player").on("loadedmetadata",function(){
//   var duration=$("#player")[0].duration;
//   $("#progresser .label span:eq(1)").text(parseInt(duration/60)+":"+parseInt(duration%60));
// })
changeMusic(info.list[musicPointer],musicPointer);
//var playButton_Status=true;//ture==playing
//console.log($("#player")[0].paused)
$("#playButton").click(function(){
  if($("#player")[0].paused==false)
  {
    $("#playButton i").removeClass("Pause");
    $("#playButton i").addClass("Play");
    $("#player")[0].pause();
  }
  else {
    $("#playButton i").removeClass("Play");
    $("#playButton i").addClass("Pause");
    $("#player")[0].play();
  }
});

// $("#likeButton").click(function(event) {
//   if($(".Heart.inverted.big.link.icon.red"))
//   {
//     $(".Heart.inverted.big.link.icon.red").removeClass("red");
//     $(".Heart.inverted.big.link.icon").addClass("pink");
//     return;
//   }
//   //顺序很重要
//   if($(".Heart.inverted.big.link.icon.pink"))
//   {
//     $(".Heart.inverted.big.link.icon.pink").removeClass("pink");
//     $(".Heart.inverted.big.link.icon").addClass("red");
//     return;
//   }
//
// });
//---------------------------------------初始化
$("#player").on("timeupdate",function(){
  var currentTime=$("#player")[0].currentTime;
  var duration=$("#player")[0].duration;
  var per=100*currentTime/duration;
  $("#progresser").progress({percent:per});
  $("#progresser .label span:eq(1)").text(parseInt(duration/60)+":"+parseInt(duration%60));
  $("#progresser .label span:eq(0)").text(parseInt(currentTime/60)+":"+parseInt(currentTime%60));
  if(duration==currentTime)
  {
    changeMusic(info.list[(musicPointer+1)%musicNumber],(musicPointer+1)%musicNumber);
  }
});
//------------------------------TimeDrag
var timeDrag=false;
$("#progresser").mousedown(function(event) {
  timeDrag=true;
  updateBar(event.pageX);
});
$(document).mouseup(function(event) {
  if(timeDrag==true)
  {
    timeDrag=false;
    updateBar(event.pageX);
  }
});
$(document).mousemove(function(event) {
  if(timeDrag==true)
  {
    updateBar(event.pageX);
  }
});
function updateBar(x)
{
  var dis=x-$("#progresser").offset().left;
  var per=100*dis/$("#progresser").width();
  if(per>=100)per=100;
  if(per<=0)per=0;
  $("#player")[0].currentTime=$("#player")[0].duration*per/100;
  $("#progresser").progress({percent:per});
  $("#progresser .label span:eq(0)").text(parseInt($("#player")[0].currentTime/60)+":"+parseInt($("#player")[0].currentTime%60));
  $("#progresser .label span:eq(1)").text(parseInt($("#player")[0].duration/60)+":"+parseInt($("#player")[0].duration%60));

}
//-------------------------------End
// $("#player").on('timeupdate', function() {
//    $('#progresser .label span:eq(0)').text($("#player")[0].currentTime);
// });
function mid(music,ind)
{
  return function(){
    changeMusic(music,ind);
  }
}
function changeMusic(music,ind)
{
  $("#player").attr("src",music.src);
  $(".ui.vertical.inverted.fluid.text.trans.menu .item:eq(0) p").text(music.name);
  $(".ui.vertical.fluid.basic.menu .item.chLanse").removeClass('chLanse');
  $(".ui.vertical.fluid.basic.menu .item:eq("+ind+")").addClass('chLanse');
  $("#player").on("loadedmetadata",function(){
    var duration=$("#player")[0].duration;
    $("#progresser .label span:eq(1)").text(parseInt(duration/60)+":"+parseInt(duration%60));
  });
  $(".bg").css({"background-image":"url('"+bgImage[ind%bgImage.length]+"')","opacity":"0.3"});
  $(".bg").animate({opacity:"1"}, 2000, function(){console.log("success");});
  musicPointer=ind;
  //console.log(musicSrc);
}
