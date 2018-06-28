diplomado.controller("generalController", function ($scope, $http, focus, ngDialog) {

	$scope.muestra_secc_general = false;
	$scope.disabled_fecha_reg 	= true;
	$scope.general_secc 		= false;
	$scope.servicio_secc 		= false;
	$scope.alerta_error_general = false;
	$scope.cargando_general 	= false;
	$scope.instrucciones_general= false;
	$scope.des_rfc 				= false;
	$scope.mensaje_error_general= "";
	$scope.color_secc           = "aqua";
    $scope.c_letra              = "c-aqua";
	$scope.botones = function(){
		$scope.hora_reg 		= sessionStorage.hora;
		$scope.fecha_reg 		= sessionStorage.fecha;
		$scope.muestra_alertas('oculta');
		$scope.boton_ligar			= false;
		$scope.colores("aqua", "c-aqua", 'general');
		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().men_busqueda = "Buscar paciente";
		if(sessionStorage.eleccion === "recupera"){
			$scope.des_general 		= true;
			$scope.ligarGenerales 	= true;
			$('#rfc').attr('readonly', true);
		}else{
			$scope.boton_ligar 		= true;
			$scope.des_general 		= false;
			$scope.ligarGenerales 	= false;
		}
	};

    $scope.ligar_general = function(){
    	if($scope.se_entero == "" || $scope.se_entero == undefined){
		    focus('se_entero');
	    }else if($scope.referenciado == "" || $scope.referenciado == undefined ){
	    	focus('referenciado');
    	}else if($scope.motivo_c == "" || $scope.motivo_c == undefined ){
	    	focus('motivo_c');
    	}else if($scope.nombre_com == "" || $scope.nombre_com == undefined ){
	    	focus('nombre_com');
    	}else if($scope.ap_paterno == "" || $scope.ap_paterno == undefined ){
	    	focus('ap_paterno');
    	}else if($scope.ap_materno == "" || $scope.ap_materno == undefined ){
	    	focus('ap_materno');
    	}else if($scope.rfc == "" || $scope.rfc == undefined ){
	    	focus('rfc');
    	}else if($scope.genero == null || $scope.genero == undefined ){
	    	focus('genero');
    	}else if($scope.civil == null || $scope.civil == undefined ){
	    	focus('civil');
    	}else if($scope.nacimiento == "" || $scope.nacimiento == undefined ){
	    	focus('nacimiento');
    	}else if($scope.escolar == "" || $scope.escolar == undefined ){
	    	focus('escolar');
    	}else if($scope.telefono == "" || $scope.telefono == undefined ){
	    	focus('telefono');
    	}else if($scope.email == "" || $scope.email == undefined ){
	    	focus('email');
    	}else if($scope.conf_email == "" || $scope.conf_email == undefined ){
	    	focus('conf_email');
    	}else if($scope.pais == "" || $scope.pais == undefined ){
	    	focus('pais');
    	}else{
		    $scope.hijos 			= $scope.validaCero($scope.hijos);
	    	$scope.cp 				= $scope.validaCero($scope.cp);
	    	$scope.tel_oficina 		= $scope.validaCero($scope.tel_oficina);
	    	$scope.tel_celular 		= $scope.validaCero($scope.tel_celular);
	    	$scope.ad_email 		= $scope.validaNS($scope.ad_email);
	    	$scope.conf_ad_email 	= $scope.validaNS($scope.conf_ad_email);
	    	$scope.conf_ad_email 	= $scope.validaNS($scope.conf_ad_email);
	    	$scope.direccion 		= $scope.validaNS($scope.direccion);
	    	$scope.estado 			= $scope.validaNS($scope.estado);
	    	$scope.delegacion 		= $scope.validaNS($scope.delegacion);
	    	$scope.colonia 			= $scope.validaNS($scope.colonia);
	    	$scope.name_municipio 	= $scope.validaNS($scope.name_municipio);
	    	$scope.pregunta_generales();
    	}
    };

    $scope.pregunta_generales = function(){
    	var cabecera = "Confirmación guardar registros";
		var mensaje  = "¿Está seguro de guardar la información actual? Una vez realizada ésta operación, no podrá realizar cambios en los registros.";
        var template = "../views/modals/confirma_modal.html";
        $scope.openModal_confirm(template, '50%', '60%', cabecera, mensaje);
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().abrio = "general";
    };

    $scope.guarda_general = function(){
    	$scope.cancelar_ligar();
    	$scope.muestra_cargar('M');
    	$scope.hora_reg 	= sessionStorage.hora;
		$scope.fecha_reg 	= sessionStorage.fecha;
	    var user_data = {
	    	entero 			: 	$scope.se_entero,
	    	referenciado 	: 	$scope.referenciado,
	    	motivo 			: 	$scope.motivo_c,
	    	fecha_reg 		: 	$scope.fecha_reg,
	    	hora_reg 		: 	$scope.hora_reg,
	    	nombre 			: 	$scope.nombre_com,
	    	ap_pat 			: 	$scope.ap_paterno,
	    	ap_mat 			: 	$scope.ap_materno,
	    	rfc 			: 	$scope.rfc,
	    	genero 			: 	$scope.genero,
	    	edo_civil 		: 	$scope.civil,
	    	hijos 			: 	$scope.hijos,
	    	nacimiento 		: 	$scope.nacimiento,
	    	escolaridad 	: 	$scope.escolar,
	    	telefono 		: 	$scope.telefono,
	    	tel_oficina 	: 	$scope.tel_oficina,
	    	tel_celular 	: 	$scope.tel_celular,
	    	email 			: 	$scope.email,
	    	ad_email 		: 	$scope.ad_email,
	    	pais 			: 	$scope.pais,
	    	direccion 		: 	$scope.direccion,
	    	cp 				: 	$scope.cp,
	    	estado 			: 	$scope.estado,
	    	colonia 		: 	$scope.colonia,
	    	delegacion 		: 	$scope.delegacion,
	    	municipio 		:   $scope.name_municipio
	    };

	    $scope.des_general = true;
	    sessionStorage.setItem('usuario', $scope.rfc);
	    sessionStorage.setItem('datosUsuario', JSON.stringify(user_data));
		dir = "../php/inserta_datos_usuario.php";
		$scope.comunicar(dir, user_data, $scope.general_exito, $scope.general_exito);
    };

    $scope.general_exito = function(response){
    	$scope.muestra_cargar('N');
    	var respuesta = response.data.trim();
    	if(respuesta === "exito"){
    		$scope.des_general = true;
    		$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
		}else{
			$scope.des_general = false;
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Datos generales"');
		}
    };

	$scope.init_genero = function () {
		$scope.genero_options		= [];

        var obj 	= new Object();
	    obj 		= new Object();
	    obj.ID 		= "M";
	    obj.valor 	= "MASCULINO";
	    $scope.genero_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "F";
	    obj.valor 	= "FEMENINO";
	    $scope.genero_options.push(obj);
    };

    $scope.init_civil = function () {
		$scope.civil_options		= [];

        var obj 	= new Object();
	    obj 		= new Object();
	    obj.ID 		= "S";
	    obj.valor 	= "SOLTERO";
	    $scope.civil_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "C";
	    obj.valor 	= "CASADO";
	    $scope.civil_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "D";
	    obj.valor 	= "DIVORCIADO";
	    $scope.civil_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "U";
	    obj.valor 	= "UNIÓN LIBRE";
	    $scope.civil_options.push(obj);
    };

    $scope.init_escolar = function () {
		$scope.escolar_options		= [];

        var obj 	= new Object();
	    obj 		= new Object();
	    obj.ID 		= "PRIMARIA";
	    obj.valor 	= "PRIMARIA";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "SECUNDARIA";
	    obj.valor 	= "SECUNDARIA";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "PREPARATORIA";
	    obj.valor 	= "PREPARATORIA";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "UNIVERSIDAD";
	    obj.valor 	= "UNIVERSIDAD";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "MAESTRIA";
	    obj.valor 	= "MAESTRÍA";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "DOCTORADO";
	    obj.valor 	= "DOCTORADO";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "TRUNCA";
	    obj.valor 	= "TRUNCA";
	    $scope.escolar_options.push(obj);
	    obj 		= new Object();
	    obj.ID 		= "SIN";
	    obj.valor 	= "SIN ESPECIFICAR";
	    $scope.escolar_options.push(obj);
    };
});