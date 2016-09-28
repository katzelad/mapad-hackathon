//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('fileUploadCtrl', ['$scope', 'Upload', '$timeout', '$http',
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
            //            file.upload = Upload.upload({
            //                url: '/clientFile/upload', //S3 upload url including bucket name 
            //                method: 'POST',
            //                data: {
            //                    "Content-Type": file.type != '' ? file.type : 'application/octet-stream',
            //                    filename: "assessment",
            //                    file: file
            //                }
            //            });
            //            file.upload = Upload.upload({
            //                url: '/clientFile/upload',
            //                data: {
            //                    username: $scope.username,
            //                    file: file
            //                },
            //            });

            //            file.upload.then(function(response) {
            //                $timeout(function() {
            //                    file.result = response.data;
            //                });
            //            }, function(response) {
            //                if (response.status > 0)
            //                    $scope.errorMsg = response.status + ': ' + response.data;
            //            }, function(evt) {
            //                // Math.min is to fix IE which reports 200% sometimes
            //                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            //            });
        }
    }
]);