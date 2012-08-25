function setBG() {
  var urls = JSON.parse(localStorage["urls"]);

  while (urls[localStorage["index"]]==null) {
    localStorage["index"] = (parseInt(localStorage["index"]) + 1) % urls.length;
  }
  
  document.body.style.background="url('"+urls[localStorage["index"]]+"')"
  document.body.style.backgroundPosition="center"
  document.body.style.backgroundSize="cover"
  document.body.style.margin = 0;
}


document.addEventListener('DOMContentLoaded', function () {
  var urls = JSON.parse(localStorage["urls"]);
  
  if (localStorage["index"]==undefined)
    localStorage["index"] = 0
  else {
    localStorage["index"] = (parseInt(localStorage["index"]) + 1) % urls.length;
  }
  setBG();

  window.onclick = function()
  {
    if (document.webkitIsFullScreen)
      document.webkitCancelFullScreen();
    else 
      document.documentElement.webkitRequestFullScreen();
  }
  
  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if(e.keyCode=='39') {
      localStorage["index"] = (parseInt(localStorage["index"]) + 1) % urls.length;
      setBG();
    }
    else if(e.keyCode=='37') {
      localStorage["index"] = (parseInt(localStorage["index"]) - 1 + urls.length) % urls.length;
      setBG();
    }
  }
});
