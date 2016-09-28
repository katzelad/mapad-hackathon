  var FileApp = angular.module("FileApp", []);


  FileApp.controller("FileController", function($scope) {

      $scope.fileChange = function(fileValue) {
          console.log(fileValue);
      }

  })