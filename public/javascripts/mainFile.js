      function initAutocomplete() {
          var map = new google.maps.Map(document.getElementById('map'), {
              center: {

                  lat: 31.771959,
                  lng: 35.217018
              },
              zoom: 7,
              mapTypeId: 'roadmap'
          });

          // Create the search box and link it to the UI element.
          var input = document.getElementById('pac-input');
          var searchBox = new google.maps.places.SearchBox(input);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          // Bias the SearchBox results towards current map's viewport.
          map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
          });

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
                  }).error(function(err) {
                      console.log("error");
                  })

              }
          }
      ]);

      FileApp.controller("FileController", function($scope, $timeout) {

          $scope.fileChange = function(fileValue) {
              console.log(fileValue);
          }

          $scope.uploadPic = function(file) {
              file.upload = Upload.upload({
                  url: 'C:\GitProjects\mapad-hackathon\files\orYoung.pptx',
                  data: {
                      username: $scope.username,
                      file: file
                  },
              });

              file.upload.then(function(response) {
                  $timeout(function() {
                      file.result = response.data;
                  });
              }, function(response) {
                  if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
              }, function(evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
          }

      });