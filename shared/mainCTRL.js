angular.module('app')
.controller('mainCTRL', function($rootScope, $scope, detailsService) {

	$scope.selectedRow = false;

    //GRID HEIGHT
    $scope.$on('$routeChangeSuccess', function(events, next, current) {
        console.log('calculate height');
        var hHeader = Number($(".bcs-header").css("height").replace("px",""));
        var hFooter = Number($(".bcs-footer").css("height").replace("px",""));
        $(".grid-container").css("height","calc(100% - " + (hHeader + hFooter) + "px)");
    });

	$rootScope.$on('tableItemSelected', function(item) {		
		$scope.$evalAsync(() => {
			$scope.selectedRow = true;
		});
	});

    //WINDOW WIDTH CONSIDERING MENU LEFT
    var wMenuL = Number($("#menu-left").css("width").replace("px",""));
      $("#window").css("width","calc(100% - " + (wMenuL) + "px)");

      $("#menu-left .btnMenu").click(function(){
        if($("body").hasClass("ml-colapsed")) {
          $("body").removeClass("ml-colapsed");
          $("#menu-left .container").fadeIn(0);
          $("#menu-left .header h2").fadeIn(0);
        }
        else {
          $("body").addClass("ml-colapsed");
          $("#menu-left .container").fadeOut(0);
          $("#menu-left .header h2").fadeOut(0);
        }
     });

	//detailsService.initRightPanel();
	$scope.show = function() {
		detailsService.showCreateModify();
		$scope.$emit('createEmit');
	}

	//Timepicker 
	$("#timepicker").kendoTimePicker({
		min: new Date(2000, 0, 1, 8, 0, 0) //date part is ignored
	});

	//Combo 
	$("#combobox").kendoComboBox({ //Prepopulates data for right sidebar options
	autoWidth: true,
	dataSource: {
		data: ["Acciones", "Simultáneas", "CFI", "Opciones", "Monetarios", "Futuros", "IRF", "IIF", "MILA"]
		}
	});

    //LOOKUP TOOLBAR 
    var data = []; //Autofill for search bar in header

    $("#toolbar-search").kendoAutoComplete(data);

    var autocomplete = $("#toolbar-search").data("kendoAutoComplete"),
        setValue = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                autocomplete.value($("#value").val());
        },
        setSearch = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                autocomplete.search($("#word").val());
        };

        // Active link function
        $('.no-list a').click(function(e) {
            $('.no-list a').removeClass('active');
            $(this).addClass('active');
        });

    $("#set").click(setValue);
    $("#value").keypress(setValue);
    $("#search").click(setSearch);
    $("#word").keypress(setSearch);
   
    
});
