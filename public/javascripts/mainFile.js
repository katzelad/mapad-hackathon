var map;
function loadMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : 31.771959,
			lng : 35.217018
		},
		zoom : 7,
		mapTypeId : 'satellite'
	});
}


function initAutocomplete(src, bounds, map, USGSOverlay) {

	
	let
	mapBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds[0],
			bounds[1]), new google.maps.LatLng(bounds[2], bounds[3]));

	// The custom USGSOverlay object contains the USGS image,
	// the bounds of the image, and a reference to the map.
	new USGSOverlay(mapBounds, src, map);

}
// -----------------------------------------------------------------------------------------
var FileApp = angular.module("FileApp", [ "ngFileUpload" ]);

FileApp.controller('fileUploadCtrl', [ '$scope', 'Upload', '$timeout', '$http',
		function($scope, Upload, $timeout, $http) {
			$scope.uploadPic = function(file) {
				var fd = new FormData();
				fd.append('file', file);

				$http.post("/clientFile/upload", fd, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined
					}
				}).success(function(success) {

					USGSOverlay.prototype = new google.maps.OverlayView();

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
						// coordinates of the overlay to peg it to the correct position and
						// size.
						// To do this, we need to retrieve the projection from the overlay.
						var overlayProjection = this.getProjection();

						// Retrieve the south-west and north-east coordinates of this
						// overlay
						// in LatLngs and convert them to pixel coordinates.
						// We'll use these coordinates to resize the div.
						var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_
								.getSouthWest());
						var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_
								.getNorthEast());

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
					
					for (var i = 0; i < success.length; i++) {
						var bounds = [];
						bounds.push(success[i].bottom);
						bounds.push(success[i].left);
						bounds.push(success[i].top);
						bounds.push(success[i].right);
						var src = success[i].imagePath;
						initAutocomplete(src, bounds, map, USGSOverlay);
					}

				}).error(function(err) {
					console.log("error uploaded your file");
				}).then(function() {
					$('.modal-content').modal().hide();
				});
			}

		} ]);
