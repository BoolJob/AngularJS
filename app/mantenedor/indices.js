var app = angular.module('indicesModule', ['lbServicesApp']);

app.controller('indicesController', function($scope,FrontIndices) {
	
	console.log("init indicesController ");
	
	var tmpDiv;
	
	$scope.bloqueActivo = 0;
	
	$scope.indice = {
		indice: "",
		indice_sandp: "",
		estado :"",
		mercado: "",
		dividendo: "",
		mila: undefined,
		valido: false
	}
	$scope.indices = [];
	
	var indicesGrid = null;
	
	$(document).keyup(function(event){
		if(event.which==27)
		{
		  $(".filters-box").addClass("left-to-right");
		  $(".bcs-filters").fadeOut(200);
		}
	});
	
	$scope.despliegaPanel = function(action){
		
		$scope.bloqueActivo = action;
		
		if(action == 0){
			$scope.indice.indice = "";
			$scope.indice.indice_sandp = "";
			$scope.indice.estado = "";
			$scope.indice.mercado = "";
			$scope.indice.dividendo = "";
			$scope.indice.mila = "";
		}else{
			var grid = $("#IndicesGrid").data("kendoGrid");
			var selectedItem = grid.dataItem(grid.select());
			
			if(selectedItem == null){
				alert("Seleccione un registro");
				return;
			}else{
				$scope.indice.indice = selectedItem.indice;
				$scope.indice.indice_sandp = selectedItem.indice_sandp;
				$scope.indice.estado = selectedItem.estado;
				$scope.indice.mercado = valorMercado(selectedItem.mercado);
				$scope.indice.dividendo = valorDividendo(selectedItem.dividendo);
				$scope.indice.mila = valorMila(selectedItem.mila);
			}
		}
		
		$(".bcs-filters").fadeIn(200);
		$(".filters-box").removeClass("left-to-right");
		$(".filters-box").addClass("right-to-left");
		$("body").addClass("no-scroll");
	}
	
	$scope.ocultaPanel = function(event){
		if(event == null || event.which==27)
		{
		  $(".filters-box").addClass("left-to-right");
		  $(".bcs-filters").fadeOut(200);
		}
	}
	
	$scope.validarIndice = function(indice){
		indice.valido = false;
		if(indice.indice == undefined || indice.indice == null) return false;
		if(indice.indice.trim().length == 0) return false;
		
		if(indice.indice_sandp == undefined || indice.indice_sandp == null) return false;
		if(indice.indice_sandp.trim().length == 0) return false;
		
		if(indice.estado == undefined || indice.estado == null) return false;
		if(indice.estado.trim().length == 0) return false;
		
		if(indice.mercado == undefined || indice.mercado == null) return false;
		if(indice.mercado.trim().length == 0) return false;
		
		//if(indice.indice.trim().split(' ').length>1)  return false;		
		
		if(indice.mila == undefined || indice.mila == null) return false;
		
		// solo si es agregar
		if($scope.bloqueActivo == 0){
			var duplicado = $scope.indices.find(function(ind){
				return ind.indice.trim().toUpperCase() == indice.indice.trim().toUpperCase() && 
						valorDividendo(ind.dividendo.trim()) == indice.dividendo.trim().toUpperCase();
			});
			
			if(duplicado!= undefined) return false;
		}
		indice.valido = true;
		return true;
		
	}
	
	$scope.estados = [
		{value: 'A', text: 'Activo'},
		{value: 'I', text: 'Inactivo'}
	];
	  
	$scope.descripcionEstado = function(value){
		var descripcion = $scope.estados.find(function(estado){ return estado.value == value});		 
		return descripcion != undefined ? descripcion.text : 'No definido';
	}
	 
	$scope.mercados = [
		{value: 'RV', text: 'Renta Variable'},
		{value: 'RF', text: 'Renta Fija'}
	];
	  
	$scope.dividendo = [
		{value: 'X', text: 'No aplica'},
		{value: 'S', text: 'Sí'},
		{value: 'N', text: 'No'}
	];
	  
	$scope.mila = [
		{value: true, text: 'Sí'},
		{value: false, text: 'No'}
	];
	  
	  
	$scope.descripcionMercado= function(value){
		var descripcion = $scope.mercados.find(function(mercado){ return mercado.value == value});		 
		return descripcion != undefined ? descripcion.text : 'No definido';
	}
	 
	$scope.descripcionDividendo= function(value){		 
		var descripcion = $scope.dividendo.find(function(dividendo){ return dividendo.value == value});		 
		return descripcion != undefined && descripcion != "" ? descripcion.text : 'No aplica';
	}
	 
	$scope.descripcionMila= function(value){	 
		var descripcion = $scope.mila.find(function(mila){ return mila.value == value});
		return descripcion != undefined ? descripcion.text : 'No definido';
	}
	 
	function valorMercado(value){
		var descripcion = $scope.mercados.find(function(mercado){ return mercado.text == value});		 
		return descripcion != undefined ? descripcion.value : 'No definido';
	}
	
	function valorDividendo(value){
		var descripcion = $scope.dividendo.find(function(dividendo){ return dividendo.text == value});		 
		return descripcion != undefined ? descripcion.value : 'No definido';
	}
	
	function valorMila(value){
		var descripcion = $scope.mila.find(function(mila){ return mila.text == value});		 
		return descripcion != undefined ? descripcion.value : 'No definido';
	}
	
	$scope.guardarAccion = function(){
		if($scope.bloqueActivo == 0 || $scope.bloqueActivo == 1){
			$scope.updateIndice();
		}else{
			$scope.eliminar();
		}
	}
	
	$scope.eliminar = function(){
		
		var indice = $scope.indice;
		
		tmpDiv = indice.dividendo;
			
		if(indice.dividendo == "X")
			indice.dividendo = "";

		FrontIndices.delIndice({
			indice: indice.indice,
			dividendo : indice.dividendo
		},
		function(value, res) {
			var lista = [];
			if(value!=undefined && value.listaResult!=undefined && value.listaResult.length>0){
				if(value.listaResult[0].xstatus != 1){
					console.log("Error");
				}
			}
			
			$("#IndicesGrid").data("kendoGrid").dataSource.read();
			
		}, function(err) {
			console.log(err);
		});
		
		$scope.ocultaPanel();
	}
	
	$scope.updateIndice = function(){
		
		var indice = $scope.indice;
		
		if(!$scope.validarIndice($scope.indice)){
			alert("Todos los campos son obligatorios, o el registro ya existe");
			return;
		}
		
		if(indice.mercado == "RV" && indice.dividendo == "X"){
			alert("Columna dividendo inválida para el mercado seleccionado, cambios no guardados");
			return;
		}
		
		tmpDiv = indice.dividendo;
		
		if(indice.dividendo == "X")
			indice.dividendo = "";
		
		FrontIndices.setIndice({
			indice: indice.indice,
			indice_sandp : indice.indice_sandp,
			estado : indice.estado,
			mercado : indice.mercado,
			dividendo : indice.dividendo,
			mila : indice.mila
		},
		function(value, res) {
			var lista = [];
			if(value!=undefined && value.listaResult!=undefined && value.listaResult.length>0){
				if(value.listaResult[0].xstatus != 1){
					console.log("Error");
				}else{
					indice.dividendo = tmpDiv;
				}
			}
			
			$("#IndicesGrid").data("kendoGrid").dataSource.read();
			
		}, function(err) {
			console.log(err);
		});
		
		$scope.ocultaPanel();
	}
	
	$scope.mainGridOptions = {
		dataSource : {
			transport: {
				read: function(operation) {
					
					FrontIndices.getIndices({},
					function(value, res) {
						var lista = [];
						
						if(value!=undefined && value.listaResult!=undefined){
							angular.forEach(value.listaResult, function(indice, index) {
								indice.editando = false;
								indice.dividendo = indice.dividendo == undefined || indice.dividendo == "" ? "X" : indice.dividendo;
								
								indice.mercado = $scope.descripcionMercado(indice.mercado);
								indice.dividendo = $scope.descripcionDividendo(indice.dividendo);
								indice.mila = $scope.descripcionMila(indice.mila);
								
								lista.push(indice);
							});	
						}
						$scope.indices = lista;
						
						operation.success(lista);
						
						setAlturaBody();
						
					}, function(err) {
						console.log(err);
					});
				}
			},
			schema : {			
				model : {
					id: "indice",
					fields : {
						indice : {
							type : 'string'
						},
						indice_sandp : {
							type : 'string'
						},
						estado : {
							type : 'string'
						},
						mercado : {
							type : 'string'
						},
						dividendo : {
							type : 'string'
						},
						mila : {
							type : 'string'
						}
					}
				}
			}
		},
		columns: [{
			field: "indice",
			title: "Indice nombre BCS",
			headerAttributes: {"ng-non-bindable": true},
			width: "180px"
			},{
			field: "indice_sandp",
			title: "Indice nombre S&P",
			width: "120px"
			},{
			field: "estado",
			title: "Estado",
			width: "120px"
			},{
			field: "mercado",
			title: "Mercado",
			width: "120px"
			},{
			field: "dividendo",
			title: "Dividendo",
			width: "120px"
			},{
			field: "mila",
			title: "Mila",
			width: "120px"
		}],
		selectable: "single",
        persistSelection: true,
        allowCopy: true,
        filterable: true,
        sortable: true,
        resizable: true,
        pageable: false
	};

	function setAlturaBody(){
		var maxH = window.innerHeight;
		var hHeader = Number($(".bcs-header").css("height").replace("px",""));
		var hFooter = Number($(".bcs-footer").css("height").replace("px",""));
		var hGrilla = Number($(".k-grid-header").css("height").replace("px",""));
		var totalGrilla = maxH - (hHeader + hFooter + hGrilla + 3);
		$(".k-grid-content").css('height', totalGrilla + "px");
	}
	
	console.log("end indicesController ")
});