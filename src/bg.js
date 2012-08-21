if (localStorage["urls"] == null) localStorage["urls"] = JSON.stringify(Array());

var http = new XMLHttpRequest();

function doCall(link) {
  http.open("GET", link, false );
  http.timeout = 3000;
  http.send( null );
  return http.responseText;
}

function PaperWallWallpaperOfTheDay() {
  response = doCall('http://thepaperwall.com/')
  m = response.match(new RegExp('<img src=".*?image=(.*?)"'));
  if (m==null) return null;
  return 'http://thepaperwall.com'+m[1];
}

function NationalGeographicPhotoOfTheDay() {
  response = doCall('http://photography.nationalgeographic.com/photography/photo-of-the-day/')
  m = response.match(new RegExp('<div class="download_link"><a href="(.*?)"'));
  if (m==null) {
    m = response.match(new RegExp('<img src="(http://images\.nationalgeographic\.com/wpf/media-live.*?)"'));
    if (m==null) return null;
  }
  return m[1];
}

function euronewsPictureOfTheDay() {
  response = doCall('http://www.euronews.com/picture-of-the-day/')
  m = response.match(new RegExp('<img src="(http://static.*?)"'));
  if (m==null) return null;
  return m[1];
}

function AstronomyPictureOfTheDay() {
  response = doCall('http://apod.nasa.gov/apod/astropix.html')
  m = response.match(new RegExp('<a href="(.*?)">\n'));
  if (m==null) return null;
  return 'http://apod.nasa.gov/apod/'+m[1];
}

function EarthObservatoryImageOfTheDay() {
  response = doCall('http://earthobservatory.nasa.gov/IOTD/')
  m = response.match(new RegExp('<img src="(.*?)"'));
  if (m==null) return null;
  return m[1];
}

services = [PaperWallWallpaperOfTheDay, NationalGeographicPhotoOfTheDay, euronewsPictureOfTheDay, AstronomyPictureOfTheDay, EarthObservatoryImageOfTheDay]

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-34191277-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function start(url) {
  var urls = JSON.parse(localStorage["urls"]);
  for (i=0; i<services.length; ++i) {
    var url = services[i]()
    urls[i] = url
  }
  localStorage["urls"] = JSON.stringify(urls);
  
  _gaq.push(['_trackEvent', 'Background', 'Start function']);
  
  setTimeout(start, 3600000);
}

start()