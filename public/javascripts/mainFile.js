var isMapLoaded = false;
var customLayerSRC = null;
var customLayerBOUNDS = null;
var customLayersData = null;

function getCustomLayerProperties(src, bounderies)
{
    customLayerSRC = src;
    customLayerBOUNDS = bounderies;
//    customLayersData = customLayersDataRequest;
    initAutocomplete();
}

function initAutocomplete() {
    debugger;
    if (!isMapLoaded || true)
    {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {

                lat: 31.771959,
                lng: 35.217018
            },
            zoom: 7,
            mapTypeId: 'roadmap'
        });

        
        
        // Create the search box and link it to the UI element.
//        var input = document.getElementById('pac-input');
//        var searchBox = new google.maps.places.SearchBox(input);
//        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//        // Bias the SearchBox results towards current map's viewport.
//        map.addListener('bounds_changed', function() {
//          searchBox.setBounds(map.getBounds());
//        });
        
        isMapLoaded = true;
    }
    
    // drawing custom layer
    if (customLayerSRC != null && customLayerBOUNDS != null)
    {
        drawCustomLayer(customLayerSRC, customLayerBOUNDS);
        
        customLayerSRC = null;
        customLayerBOUNDS = null;
    }
    
    function drawCustomLayer(srcImage, bounderies)
    {
        let overlay;
        USGSOverlay.prototype = new google.maps.OverlayView();
        let bounds = new google.maps.LatLngBounds(
//            new google.maps.LatLng(32.0824669, 34.818229),
//            new google.maps.LatLng(32.089307, 34.823809));
            new google.maps.LatLng(bounderies[0], bounderies[1]),
            new google.maps.LatLng(bounderies[2], bounderies[3]));
//            new google.maps.LatLng(31.771959, 35.217018),
//            new google.maps.LatLng(31.971959, 35.417018));

        // The photograph is courtesy of the U.S. Geological Survey.
//        var srcImage = "/assets/images/Israel_googleMap.png";

        // The custom USGSOverlay object contains the USGS image,
        // the bounds of the image, and a reference to the map.
        new USGSOverlay(bounds, srcImage, map);

        function USGSOverlay(bounds, image, map) {
            // Initialize all properties.
            this.bounds_ = bounds;
            this.image_ = image;
            this.map_ = map;

            // Define a property to hold the image's div. We'll
            // actually create this div upon receipt of the onAdd()
            // method so we'll leave it null for now.
            this.div_ = null;

            // Explicitly call setMap on this overlay.
            this.setMap(map);
        }
        
    
    
        USGSOverlay.prototype.onAdd = function() {
            var div = document.createElement('div');
            div.style.borderStyle = 'none';
            div.style.borderWidth = '0px';
            div.style.position = 'absolute';

            // Create the img element and attach it to the div.
            var img = document.createElement('img');
            img.src = this.image_;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            div.appendChild(img);

            this.div_ = div;

            // Add the element to the "overlayLayer" pane.
            var panes = this.getPanes();
            panes.overlayLayer.appendChild(div);
        };

      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

//          google.maps.event.addDomListener(window, 'load', initMap);
    }

        //----------------------
      
      
      
      
     
      
      if (!isMapLoaded)
      { 
          var markers = [];
          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.
          searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                  return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                  marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                  if (!place.geometry) {
                      console.log("Returned place contains no geometry");
                      return;
                  }
                  var icon = {
                      url: place.icon,
                      size: new google.maps.Size(71, 71),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(17, 34),
                      scaledSize: new google.maps.Size(25, 25)
                  };

                  // Create a marker for each place.
                  markers.push(new google.maps.Marker({
                      map: map,
                      icon: icon,
                      title: place.name,
                      position: place.geometry.location
                  }));

                  if (place.geometry.viewport) {
                      // Only geocodes have viewport.
                      bounds.union(place.geometry.viewport);
                  } else {
                      bounds.extend(place.geometry.location);
                  }
              });
              map.fitBounds(bounds);
          });
      }
  }
   //-----------------------------------------------------------------------------------------
  var FileApp = angular.module("FileApp", ["ngFileUpload"]);



  FileApp.controller('fileUploadCtrl', ['$scope', 'Upload', '$timeout', '$http',
      function($scope, Upload, $timeout, $http) {
          $scope.uploadPic = function(file) {
              var fd = new FormData();
              fd.append('file', file);

              $http.post("/clientFile/upload", fd, {
                  transformRequest: angular.identity,
                  headers: {
                      'Content-Type': undefined
                  }
              }).success(function(success) {
                  debugger;
                  
                  for(var i = 0; i < success.length; i++)
                  {
                    var bounds = [];
                    bounds.push(success[i].bottom);
                    bounds.push(success[i].left);
                    bounds.push(success[i].top);
                    bounds.push(success[i].right);
                    var src = success[i].imagePath;
                      
                    getCustomLayerProperties(src, bounds);
                  }
                  
                  
//                  $('.modal-content').modal().hide();
//                  $(".modal-content").css({ opacity: 0 });
              }).error(function(err) {
                  console.log("error uploaded your file");
              }).then(function(){
                    $('.modal-content').modal().hide();
              });
          }
          
          
//        $('#modalFileUpload').on('hidden', function (e) {
//            debugger;
//            alert('d');
//            });
      }
  ]);

//FileApp.controller('GroundoverlayCustomCtrl', ['$scope', '$timeout', '$http', 'NgMap',
//      function($scope, $timeout, $http, NgMap) {
//          NgMap.getMap().then(function(map) {
//          var swBound = new google.maps.LatLng(62.281819, -150.287132);
//          var neBound = new google.maps.LatLng(62.400471, -150.005608);
//          var bounds = new google.maps.LatLngBounds(swBound, neBound);
//          var srcImage = 'https://developers.google.com/maps/documentation/javascript/';
//          srcImage += 'examples/full/images/talkeetna.png';
//          new USGSOverlay(bounds, srcImage, map);
//      }
//]};











