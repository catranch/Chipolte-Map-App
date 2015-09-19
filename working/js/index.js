$(document).ready(function() {
                  var map;
                  var markers = [];
                  
                  
                  function initMap() {
                  console.log('map created');
                  map = new google.maps.Map(document.getElementById('map'), {
                                            center: {lat: 200.714504, lng: -117.166698},
                                            zoom: 18
                                            });
                  }
                  
                  function initMap2() {
                  console.log('map2 created');
                  map2 = new google.maps.Map(document.getElementById('map2'), {
                                            center: {lat: 100.714504, lng: -117.166698},
                                            zoom: 18
                                            });
                  }
                  
                  
                  
                  
                  //Added by Adrian
                  var markerOptions = {
                  position: new google.maps.LatLng(32.714504, -117.166698),
                  map: map2
                      
                  };
                  var marker = new google.maps.Marker(markerOptions);
                  marker.setMap(map);

                  //Where Adrian and Celena are
                  //32.714504, -117.166698
                  
                  
                  
                  
                  function displayResults(count) {
                  $("#loadmask").text('There are ' + count + ' Chipotle Restaurants near your current location')
                  }
                  
                  function addLocationToMap(i, location) {
                  markers.push(new google.maps.Marker({
                                                      position: new google.maps.LatLng(location.address.latitude, location.address.longitude),
                                                      map: map,
                                                      title: 'Hello World!'
                                                      }));
                  }
                  
                  function widenMap() {
                  var bounds = new google.maps.LatLngBounds();
                  
                  for(var i = 0; i < markers.length; i++) {
                  bounds.extend(markers[i].getPosition());
                  }
                  
                  map.fitBounds(bounds);
                  }
                  
                  function getRestaurants(location) {				
                  initMap2();
                  initMap();
                  //initMap2();
                  
                  
                  var center = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
                  
                  console.log('panning');
                  map.panTo(center);
                  
                  $.getJSON("http://linux.cwserve.com:24785/restaurants/" + location.coords.latitude + "/" + location.coords.longitude, function(data) {
                            console.log(data);
                            
                            $.each(data, addLocationToMap);
                            
                            widenMap();
                            
                            displayResults(data.length);
                            });
                  }
                  
                  function load() {
                  navigator.geolocation.getCurrentPosition(getRestaurants);
                  }
                  
                  load();
                  });