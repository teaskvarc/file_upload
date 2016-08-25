angular.module('fileUpload').controller('UploadCtrl',function($scope, Upload){


    $scope.upload = (file)=>{

        Upload.upload({

            url: 'http://localhost:3000/upload',
            data: { file: file }

        }).then(function(res){
            // executes on successful upload / finish
            $scope.uploaded = true;

        }, function(err){
            // executes on error
            console.log('err: ',err);
        }, function(evt){
            // shows progress
            $scope.uploaded = false;

        });
    };

});
