document.addEventListener('DOMContentLoaded', function () {
  var urls = JSON.parse(localStorage["urls"]);
  
  if (localStorage["index"]==undefined)
    localStorage["index"] = 0
  else {
    localStorage["index"] = (parseInt(localStorage["index"]) + 1) % urls.length;
  }
  
  while (urls[localStorage["index"]]==null) {
    localStorage["index"] = (parseInt(localStorage["index"]) + 1) % urls.length;
  }
  //console.log(urls[localStorage["index"]])
  document.body.style.background="url('"+urls[localStorage["index"]]+"')"
  document.body.style.backgroundPosition="center"
  document.body.style.backgroundSize="cover"
});

