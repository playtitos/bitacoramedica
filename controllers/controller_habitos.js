diplomado.controller("habitosController", function ($scope, $http, $compile, focus, ngDialog) {

	$scope.enfermedades = [];
	$scope.color_secc   = "naranja2";
    $scope.c_letra      = "c-naranja2";

	$scope.botones_habitos = function(){
		$scope.muestra_alertas('oculta');
		if(sessionStorage.usuario === "" || sessionStorage.usuario === undefined){
            $scope.principal();
        }else{
        	$scope.colores("naranja2", "c-naranja2", 'habitos');
        	$scope.busca_fechas();
		}
	};

	$scope.busca_fechas =  function(){
		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().men_busqueda 	= "Consultas previas";
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options 	= [];
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_usuario 	= true;
        var comidas   = JSON.parse(sessionStorage.Comidas);
        for(var i = 0; i < comidas.length; i++){
        	var fecha = comidas[i].fecha_reg;
        	if(fecha !== "" && fecha !== null && fecha !== undefined){
        		var obj = {
        			ID 		: comidas[i].fecha_reg + ' / ' + comidas[i].hora_reg,
        			valor 	: comidas[i].fecha_reg + ' / ' + comidas[i].hora_reg
        		};
        		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options.push(obj);
        		//angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha = "";
        	}
        }
        var no_vacio = angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options.length;
        if(no_vacio !== 0){
        	angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_usuario =  false;
        }
        $scope.valida_fil_fecha();
	};

	$scope.ligar_habitos = function(){
		var cabecera = "Confirmación guardar registros";
		var mensaje  = "¿Está seguro de guardar la información actual? Una vez realizada ésta operación, no podrá realizar cambios en los registros.";
        var template = "../views/modals/confirma_modal.html";
        $scope.openModal_confirm(template, '50%', '60%', cabecera, mensaje);
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().abrio = "habitos";
	};

	$scope.valida_comidas = function(){
		$scope.horario 	= $scope.validaSiNo($scope.horario);
		$scope.comidas 	= $scope.validaNS($scope.comidas);
		$scope.desayuno = $scope.validaNS($scope.desayuno);
		$scope.almuerzo = $scope.validaNS($scope.almuerzo);
		$scope.comida 	= $scope.validaNS($scope.comida);
		$scope.merienda = $scope.validaNS($scope.merienda);
		$scope.cena 	= $scope.validaNS($scope.cena);
		$scope.bebidas 	= $scope.validaNS($scope.bebidas);

		var food = {
			usuario 	: sessionStorage.usuario,
			fecha_reg 	: $scope.fecha_reg,
			hora_reg  	: $scope.hora_reg,
			horario 	: $scope.horario,
			num_comida  : $scope.comidas,
			desayuno 	: $scope.desayuno,
			almuerzo 	: $scope.almuerzo,
			comida 		: $scope.comida,
			merienda 	: $scope.merienda,
			cena 		: $scope.cena,
			bebidas 	: $scope.bebidas
		};
		return food;
	};

	$scope.aplica_comidas = function(){
		$scope.fecha_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_sel;
		$scope.hora_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().hora_sel;
		var comidas       		= JSON.parse(sessionStorage.Comidas);
		for(var i = 0; i < comidas.length; i++){
			if((comidas[i].fecha_reg === $scope.fecha_sel) && (comidas[i].hora_reg === $scope.hora_sel)){
				$scope.horario 		= $scope.valida_hora(comidas[i].horario);
			    $scope.comidas 		= comidas[i].num_comida;
			    $scope.desayuno 	= comidas[i].desayuno;
			    $scope.almuerzo 	= comidas[i].almuerzo;
			    $scope.comida 		= comidas[i].comida;
			    $scope.merienda 	= comidas[i].merienda;
			    $scope.cena 		= comidas[i].cena;
			    $scope.bebidas 		= comidas[i].bebidas;
			}
		}
	};

	$scope.guarda_habitos = function(){
		$scope.muestra_cargar('M');
		$scope.des_habitos 	=  true;
		$scope.hora_reg 	= sessionStorage.hora;
		$scope.fecha_reg 	= sessionStorage.fecha;
		$scope.comidas_obj  = $scope.valida_comidas();
		sessionStorage.setItem('Comidas', JSON.stringify($scope.comidas_obj));
	    var dir = "../php/inserta_comida.php";
		$scope.comunicar(dir, $scope.comidas_obj, $scope.comida_exito, $scope.comida_exito);
	};

	$scope.comida_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
			$scope.rec_comidas();
		}else{
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Hábitos"');
		}
		$scope.muestra_cargar('N');
		$scope.des_habitos = false;
	};
});