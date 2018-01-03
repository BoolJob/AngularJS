angular.module('app')
.controller('rootCTRL', function($scope) {

    $scope.$on('test', function(data){
        console.log("Caught test emit in rootCTRL");
        console.log(data);
        $scope.$broadcast('test2');
    })

    $scope.$on('rejectEmit', function(data){
        console.log("Caught rejectEmit in rootCTRL");
        console.log(data);
        $scope.$broadcast('rejectEmit2');
    })
   
	$scope.$on('modifyEmit', function (data) {
		console.log("Caught modify in rootCTRL");
		console.log(data);
		$scope.$broadcast('modifyEmit2');
	})

	$scope.$on('modifyEmit', function (data) {
		console.log("Caught modify in rootCTRL");
		console.log(data);
		$scope.$broadcast('modifyEmit2');
	})

	$scope.$on('createEmit', function (data) {
		console.log("Caught create in rootCTRL");
		console.log(data);
		$scope.$broadcast('createEmit2');
	})

});