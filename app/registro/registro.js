var app = angular.module('registroModule', ['lbServices']);

app.controller('registroController', function($scope,Usuario) {
	
	console.log("init registroController ");
	
	var tmpDiv;
	
	$scope.bloqueActivo = 0;
	
	$scope.usuario = {
        Nombre: "",
        Apellido: "",
        Email: "",
        Telefono: "",
        Pais: 1,
        Region: 1,
        Ciudad: 1,
        Comuna: 1,
        Password: ""
	}
	
	$scope.registro = function(){

		Usuario.regUsuario({
			Nombre: $scope.usuario.Nombre,
            Apellido: $scope.usuario.Apellido,
            Email: $scope.usuario.Email,
            Telefono: $scope.usuario.Telefono,
            Pais: $scope.usuario.Pais,
            Region: $scope.usuario.Region,
            Ciudad: $scope.usuario.Ciudad,
            Comuna: $scope.usuario.Comuna,
            Password: $scope.usuario.Password
		},
		function(value, res) {
			if(value!=undefined && value.listaResult!=undefined && value.listaResult.length>0){
				if(value.listaResult[0].xstatus != 1){
					console.log("Error");
				}
			}
			
		}, function(err) {
			console.log(err);
		});
	}
	
	
	console.log("end registroController ")
});