function callback(ele){
  //ele.remove();
  console.log("hello");
}
window.onload = function(){
  var danmuData;
  $.ajax({
    url:"danmu.json",
    async:false,
    success:function(data){
      danmuData=data;
    }
  });
  for(var i=0;i<danmuData.length;i++)
  {
    $("#danmuList").append("<div class='item'>"+danmuData[i].wordsTime+"s : "+danmuData[i].content+"</div>");
  }
  var pos=0;
  var v_width = $("video").css("width");
  var v_height = $("video").css("height");
  $(".danmu-box").css({"width":v_width,"height":v_height});
  /*
  $("#player").on("timeupdate",function(){
    //console.log(true);
    currentTime = $("#player")[0].currentTime;
    //console.log(currentTime);
    if(pos<danmuData.length && Math.abs(currentTime-danmuData[pos].wordsTime)<=0.24)
    {
      console.log(true);
      $(".danmu-box").append("<span class='words'></span>");
      var words = $(".words:last");
      var w_top = (Math.random()*0.8+0.1)*parseInt(v_height.substr(0,v_height.length-2));
      words.text(danmuData[pos].content);
      words.css({"left":"100%","top":w_top,"color":danmuData[pos].color});
      var w_width = words.css("width");
      w_width="-"+w_width;
      words.animate({"left":w_width}, 6000, callback(words));
      pos++;
    }
  });
  */
  $("#playButton").click(function(){
      if($("#player")[0].paused==false)
      {
        $("#playButton").removeClass("pause");
        $("#playButton").addClass("play");
        $("#player")[0].pause();
      }
      else {
        $("#playButton").removeClass("play");
        $("#playButton").addClass("pause");
        $("#player")[0].play();
      }
  });

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

  setInterval(function(){
    //console.log(true);
    var currentTime = $("#player")[0].currentTime;
    var duration = $("#player")[0].duration;
    var per=100*currentTime/duration;
    $("#progresser").progress({percent:per});
    $("#progresser .label span:eq(1)").text(parseInt(duration/60)+":"+parseInt(duration%60));
    $("#progresser .label span:eq(0)").text(parseInt(currentTime/60)+":"+parseInt(currentTime%60));
    //console.log(currentTime);
    if(pos<danmuData.length && Math.abs(currentTime-danmuData[pos].wordsTime)<0.01)
    {
      console.log(true);
      $(".danmu-box").append("<span class='words'></span>");
      var words = $(".words:last");
      var w_top = (Math.random()*0.8+0.1)*parseInt(v_height.substr(0,v_height.length-2));
      words.text(danmuData[pos].content);
      words.css({"left":"100%","top":w_top,"color":danmuData[pos].color});
      var w_width = words.css("width");
      w_width="-"+w_width;
      words.animate({"left":w_width}, 6000, callback(words));
      pos++;
    }
  },1);
}
