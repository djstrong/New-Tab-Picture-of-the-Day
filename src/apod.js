document.addEventListener('DOMContentLoaded', function () {
  var http = new XMLHttpRequest();

  function doCall(link) {
    http.open("GET", link, false );
    http.timeout = 3000;
    http.send( null );
    return http.responseText;
  }
  
  function NationalGeographicPhotoOfTheDay() {
    response = doCall('http://photography.nationalgeographic.com/photography/photo-of-the-day/')
    m = response.match(new RegExp('<div class="download_link"><a href="(.*?)"'));
    if (m==null) return null;
    return m[1];
  }
  
  function PaperWallWallpaperOfTheDay() {
    response = doCall('http://thepaperwall.com/')
    m = response.match(new RegExp('<img src=".*?image=(.*?)"'));
    if (m==null) return null;
    return 'http://thepaperwall.com'+m[1];
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

  if (localStorage["index"]==undefined)
    localStorage["index"] = 0
  else {
    localStorage["index"] = (parseInt(localStorage["index"]) + 1) % services.length;
  }

  console.log(services[localStorage["index"]]())
  document.body.style.background="url('"+services[localStorage["index"]]()+"')"
  document.body.style.backgroundPosition="center"
  document.body.style.backgroundSize="cover"
});

