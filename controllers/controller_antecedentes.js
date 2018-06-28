diplomado.controller("antecedentesController", function ($scope, $http, focus, ngDialog) {
	$scope.enfermedades 		= [];
	$scope.color_secc   		= "verdel";
    $scope.c_letra      		= "c-verde";
    $scope.fecha_seleccionada 	= "";

	$scope.botones_antecedentes = function(){
		$scope.muestra_alertas('oculta');
		if(sessionStorage.usuario === "" || sessionStorage.usuario === undefined){
            $scope.principal();
        }else{
        	$scope.colores("verdel", "c-verde", 'antecedentes');
        	$scope.busca_fechas();
		}
	};

	$scope.busca_fechas =  function(){
		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().men_busqueda 	= "Consultas previas";
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options 	= [];
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_usuario 	= true;
        var antecedentes       	= JSON.parse(sessionStorage.Antecedentes);
        for(var i = 0; i < antecedentes.length; i++){
        	var fecha = antecedentes[i].fecha_reg;
        	if(fecha !== "" && fecha !== null && fecha !== undefined){
        		var obj = {
        			ID 		: antecedentes[i].fecha_reg + ' / ' + antecedentes[i].hora_reg,
        			valor 	: antecedentes[i].fecha_reg + ' / ' + antecedentes[i].hora_reg
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

	$scope.hiper_s =  function(ans){
		if(ans === 'Y'){
			$scope.q_hiper = true;
			focus('hiper_q');
		}else{
			$scope.q_hiper = false;
		}
	};

	$scope.diabetes_s = function(ans){
		if(ans === 'Y'){
			$scope.q_diabetes = true;
			focus('diabetes_q');
		}else{
			$scope.q_diabetes = false;
		}
	};

	$scope.cancer_s = function(ans){
		if(ans === 'Y'){
			$scope.q_cancer = true;
			focus('cancer_q');
		}else{
			$scope.q_cancer = false;
		}
	};

	$scope.cardiaca_s = function(ans){
		if(ans === 'Y'){
			$scope.q_cardiaca = true;
			focus('cardiaca_q');
		}else{
			$scope.q_cardiaca = false;
		}
	};

	$scope.pulmonar_s = function(ans){
		if(ans === 'Y'){
			$scope.q_pulmonar = true;
			focus('pulmonar_q');
		}else{
			$scope.q_pulmonar = false;
		}
	};

	$scope.otras_s = function(ans){
		if(ans === 'Y'){
			$scope.q_otras = true;
			focus('otras_enf');
		}else{
			$scope.q_otras = false;
		}
	};

	$scope.medicamentos_s = function(ans){
		if(ans === 'Y'){
			$scope.medicamentos_c = true;
			focus('medicamentos_i');
		}else{
			$scope.medicamentos_c = false;
		}
	};

	$scope.embarazo_s = function(ans){
		$scope.embarazo_q = false;
		$scope.no_embarazo_q = false;
		if(ans === 'Y'){
			$scope.embarazo_q = true;
			focus('abortos');
		}else{
			$scope.no_embarazo_q = true;
			focus('segura');
		}
	};

	$scope.valida_antecedentes =  function(){
		$scope.colesterol 	= $scope.validaNS($scope.colesterol);
	    $scope.colesterol_t = $scope.validaNS($scope.colesterol_t);
	    $scope.colesterol_b = $scope.validaNS($scope.colesterol_b);
	    $scope.colesterol_m = $scope.validaNS($scope.colesterol_m);
	    $scope.trigliceridos= $scope.validaNS($scope.trigliceridos);
	    $scope.glucosa 		= $scope.validaNS($scope.glucosa);
	    $scope.diagnosticos = $scope.validaNS($scope.diagnosticos);
	    var antecedentes 	= {
	    	usuario 		: sessionStorage.usuario,
	    	fecha_reg 		: $scope.fecha_reg,
	    	hora_reg 		: $scope.hora_reg,
	    	colesterol 		: $scope.colesterol,
	    	colesterol_t 	: $scope.colesterol_t,
	    	colesterol_b 	: $scope.colesterol_b,
	    	colesterol_m 	: $scope.colesterol_m,
	    	trigliceridos 	: $scope.trigliceridos,
	    	glucosa 		: $scope.glucosa,
	    	diagnosticos 	: $scope.diagnosticos
	    };
	    return antecedentes;
	};

	$scope.aplica_antecedentes = function(){
		$scope.fecha_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_sel;
		$scope.hora_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().hora_sel;
		var antecedentes       	= JSON.parse(sessionStorage.Antecedentes);
		for(var i = 0; i < antecedentes.length; i++){
			if((antecedentes[i].fecha_reg === $scope.fecha_sel) && (antecedentes[i].hora_reg === $scope.hora_sel)){
				$scope.colesterol 		= antecedentes[i].colesterol;
			    $scope.colesterol_t 	= antecedentes[i].colesterol_t;
			    $scope.colesterol_b 	= antecedentes[i].colesterol_b;
			    $scope.colesterol_m 	= antecedentes[i].colesterol_m;
			    $scope.trigliceridos 	= antecedentes[i].trigliceridos;
			    $scope.glucosa 			= antecedentes[i].glucosa;
			    $scope.diagnosticos 	= antecedentes[i].diagnosticos;
			}
		}
	};

	$scope.valida_factores = function(){
		$scope.hipertension = $scope.validaNo($scope.hipertension);
		$scope.hiper_q 		= $scope.validaNS($scope.hiper_q);
		$scope.diabetes 	= $scope.validaNo($scope.diabetes);
		$scope.diabetes_q 	= $scope.validaNS($scope.diabetes_q);
		$scope.cancer 		= $scope.validaNo($scope.cancer);
		$scope.cancer_q 	= $scope.validaNS($scope.cancer_q);
		$scope.cardiaca 	= $scope.validaNo($scope.cardiaca);
		$scope.cardiaca_q 	= $scope.validaNS($scope.cardiaca_q);
		$scope.pulmonar 	= $scope.validaNo($scope.pulmonar);
		$scope.pulmonar_q 	= $scope.validaNS($scope.pulmonar_q);
		$scope.otras 		= $scope.validaNo($scope.otras);
		$scope.otras_enf 	= $scope.validaNS($scope.otras_enf);
		$scope.otras_q 		= $scope.validaNS($scope.otras_q);
		var factores 		= {
			usuario 			: sessionStorage.usuario,
			fecha_reg 			: $scope.fecha_reg,
			hora_reg 			: $scope.hora_reg,
			hipertension 		: $scope.hipertension,
			quien_hipertension 	: $scope.hiper_q,
			diabetes 			: $scope.diabetes,
			quien_diabetes 		: $scope.diabetes_q,
			cancer 				: $scope.cancer,
			quien_cancer 		: $scope.cancer_q,
			cardiaca 			: $scope.cardiaca,
			quien_cardiaca 		: $scope.cardiaca_q,
			pulmonar 			: $scope.pulmonar,
			quien_pulmonar 		: $scope.pulmonar_q,
			otras 				: $scope.otras,
			otras_enf 			: $scope.otras_enf,
			quine_otras 		: $scope.otras_q
		};
		return factores;
	};

	$scope.aplica_factores = function(){
		var factores       	= JSON.parse(sessionStorage.Facores);
		for(var i = 0; i < factores.length; i++){
			if((factores[i].fecha_reg === $scope.fecha_sel) && (factores[i].hora_reg === $scope.hora_sel)){
				$scope.hipertension = factores[i].hipertension;
				$scope.hiper_q 		= factores[i].q_hiper;
				$scope.diabetes 	= factores[i].diabetes;
				$scope.diabetes_q 	= factores[i].q_diabetes;
				$scope.cancer 		= factores[i].cancer;
				$scope.cancer_q 	= factores[i].q_cancer;
				$scope.cardiaca 	= factores[i].cardiaca;
				$scope.cardiaca_q 	= factores[i].q_cardiaca;
				$scope.pulmonar 	= factores[i].pulmonar;
				$scope.pulmonar_q 	= factores[i].q_pulmonar;
				$scope.otras 		= factores[i].otras;
				$scope.otras_enf 	= factores[i].otras_enf;
				$scope.otras_q 		= factores[i].q_otras;
			}
		}
	};

	$scope.cambia_check = function(valor, enf){
		if(enf === "hiper"){
			$scope.hiper_p = valor;
		}else if(enf === "diabetes"){
			$scope.diabetes_p = valor;
		}else if(enf === "corazon"){
			$scope.corazon_p = valor;
		}else if(enf === "pulmon"){
			$scope.pulmon_p = valor;
		}else if(enf === "renal"){
			$scope.renal_p = valor;
		}else if(enf === "cancer"){
			$scope.cancer_p = valor;
		}else if(enf === "tiroides"){
			$scope.tiroides_p = valor;
		}else if(enf === "auto"){
			$scope.auto_p = valor;
		}
	};

	$scope.valida_diagnosticos =  function(){
		$scope.hace_cuanto 		= $scope.validaNS($scope.hace_cuanto);
	    $scope.tratamiento 		= $scope.validaNo($scope.tratamiento);
		$scope.medicamentos 	= $scope.validaNo($scope.medicamentos);
		$scope.medicamentos_i 	= $scope.validaNS($scope.medicamentos_i);
		$scope.abortos 			= $scope.validaNo($scope.abortos);
		$scope.segura 			= $scope.validaNo($scope.segura);
		$scope.periodo 			= $scope.validaNS($scope.periodo);
		$scope.alergico 		= $scope.validaNS($scope.alergico);
	    $scope.deshidratacion 	= $scope.validaNS($scope.deshidratacion);
	    $scope.hormonas 		= $scope.validaNS($scope.hormonas);
	    $scope.ortopedicos 		= $scope.validaNS($scope.ortopedicos);
	    $scope.depresion 		= $scope.validaNS($scope.depresion);
	    hipertension_propia 	= $scope.validaBool($scope.hiper_p);
	    diabetes_propia 		= $scope.validaBool($scope.diabetes_p);
	    cardiaca_propia 		= $scope.validaBool($scope.corazon_p);
	    pulmonar_propia 		= $scope.validaBool($scope.pulmon_p);
	    renal_propia 			= $scope.validaBool($scope.renal_p);
	    cancer_propia			= $scope.validaBool($scope.cancer_p);
	    tiroides_propia 		= $scope.validaBool($scope.tiroides_p);
	    auto_propia 			= $scope.validaBool($scope.auto_p);
	    var diagnosticos = {
	    	usuario 		: sessionStorage.usuario,
	    	fecha_reg 		: $scope.fecha_reg,
	    	hora_reg 		: $scope.hora_reg,
	    	hipertension 	: hipertension_propia,
	    	diabetes 		: diabetes_propia,
	    	cardiaca 		: cardiaca_propia,
	    	pulmonar 		: pulmonar_propia,
	    	renal 			: renal_propia,
	    	cancer 			: cancer_propia,
	    	tiroides 		: tiroides_propia,
	    	autoinmune 		: auto_propia,
	    	hace_cuanto 	: $scope.hace_cuanto,
	    	tratamiento 	: $scope.tratamiento,
	    	medicamentos 	: $scope.medicamentos,
	    	medicamentos_i 	: $scope.medicamentos_i,
	    	embarazo 		: $scope.embarazo,
	    	abortos 		: $scope.abortos,
	    	segura 			: $scope.segura,
	    	periodo 		: $scope.periodo,
	    	alergico 		: $scope.alergico,
	    	deshidratacion 	: $scope.deshidratacion,
	    	hormonas 		: $scope.hormonas,
	    	ortopedicos 	: $scope.ortopedicos,
	    	depresion 		: $scope.depresion
	    };
	    return diagnosticos;
	};  

	$scope.aplica_diagnositcos = function(){
		var diagnosticos       	= JSON.parse(sessionStorage.Diagnosticos);
		for(var i = 0; i < diagnosticos.length; i++){
			if((diagnosticos[i].fecha_reg === $scope.fecha_sel) && (diagnosticos[i].hora_reg === $scope.hora_sel)){
				$scope.hace_cuanto 		= diagnosticos[i].hace_cuanto;
			    $scope.tratamiento 		= diagnosticos[i].tratamiento;
				$scope.medicamentos 	= diagnosticos[i].medicamentos;
				$scope.medicamentos_i 	= diagnosticos[i].medica_info;
				$scope.embarazo 		= diagnosticos[i].embarazo;
				$scope.abortos 			= diagnosticos[i].abortos;
				$scope.segura 			= diagnosticos[i].segura;
				$scope.periodo 			= diagnosticos[i].periodo;
				$scope.alergico 		= diagnosticos[i].alergico;
			    $scope.deshidratacion 	= diagnosticos[i].deshidratacion;
			    $scope.hormonas 		= diagnosticos[i].hormonas;
			    $scope.ortopedicos 		= diagnosticos[i].ortopedicos;
			    $scope.depresion 		= diagnosticos[i].depresion;
			    $scope.hiper_p 			= $scope.validaTrue(diagnosticos[i].hipertension);
			    $scope.diabetes_p 		= $scope.validaTrue(diagnosticos[i].diabetes);
			    $scope.corazon_p 		= $scope.validaTrue(diagnosticos[i].cardiaca);
			    $scope.pulmon_p 		= $scope.validaTrue(diagnosticos[i].pulmonar);
			    $scope.renal_p 			= $scope.validaTrue(diagnosticos[i].renal);
			    $scope.cancer_p			= $scope.validaTrue(diagnosticos[i].cancer);
			    $scope.tiroides_p 		= $scope.validaTrue(diagnosticos[i].tiroides);
			    $scope.auto_p 			= $scope.validaTrue(diagnosticos[i].autoinmune);
			}
		}
	};

	$scope.valida_habitos =  function(){
		$scope.fuma 		= $scope.validaNS($scope.fuma);
	    $scope.ejercicio 	= $scope.validaNS($scope.ejercicio);
	    $scope.duerme 		= $scope.validaNS($scope.duerme);
	    $scope.meditacion 	= $scope.validaNS($scope.meditacion);
	    $scope.ocio 		= $scope.validaNS($scope.ocio);
	    var habitos 		= {
	    	usuario 	: sessionStorage.usuario,
	    	fecha_reg 	: $scope.fecha_reg,
	    	hora_reg 	: $scope.hora_reg,
	    	fuma 		: $scope.fuma,
	    	ejercicio 	: $scope.ejercicio,
	    	duerme 		: $scope.duerme,
	    	meditacion 	: $scope.meditacion,
	    	ocio 		: $scope.ocio
	    };
	    return habitos;
	};

	$scope.aplica_habitos = function(){
		var habitos       	= JSON.parse(sessionStorage.Habitos);
		for(var i = 0; i < habitos.length; i++){
			if((habitos[i].fecha_reg === $scope.fecha_sel) && (habitos[i].hora_reg === $scope.hora_sel)){
				$scope.fuma 		= habitos[i].fuma;
			    $scope.ejercicio 	= habitos[i].ejercicio;
			    $scope.duerme 		= habitos[i].duerme;
			    $scope.meditacion 	= habitos[i].meditacion;
			    $scope.ocio 		= habitos[i].ocio;
			}
		}
	};

	$scope.ligar_antecedentes = function(){
		var cabecera = "Confirmación guardar registros";
		var mensaje  = "¿Está seguro de guardar la información actual? Una vez realizada ésta operación, no podrá realizar cambios en los registros.";
        var template = "../views/modals/confirma_modal.html";
        $scope.openModal_confirm(template, '50%', '60%', cabecera, mensaje);
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().abrio = "antecedentes";
	};

	$scope.guarda_antecedentes =  function(){
		$scope.cancelar_ligar();
		$scope.des_antecedentes =  true;
		$scope.muestra_cargar('M');
		$scope.hora_reg 		= sessionStorage.hora;
		$scope.fecha_reg 		= sessionStorage.fecha;
		$scope.antecedentes_obj = $scope.valida_antecedentes();
		$scope.factores_obj 	= $scope.valida_factores();
		$scope.diagnosticos_obj = $scope.valida_diagnosticos();
		$scope.habitos_obj 		= $scope.valida_habitos();
		sessionStorage.setItem('Antecedentes', JSON.stringify($scope.antecedentes_obj));
		sessionStorage.setItem('Facores', JSON.stringify($scope.factores_obj));
		sessionStorage.setItem('Diagnosticos', JSON.stringify($scope.diagnosticos_obj));
		sessionStorage.setItem('Habitos', JSON.stringify($scope.habitos_obj));
	    var dir = "../php/inserta_antecedentes.php";
		$scope.comunicar(dir, $scope.antecedentes_obj, $scope.antecedentes_exito, $scope.antecedentes_exito);
	};

	$scope.antecedentes_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_factores.php";
			$scope.comunicar(dir, $scope.factores_obj, $scope.factores_exito, $scope.factores_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.factores_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_diagnosticos.php";
			$scope.comunicar(dir, $scope.diagnosticos_obj, $scope.diagnosticos_exito, $scope.diagnosticos_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Factores"');
		}
	};

	$scope.diagnosticos_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_habitos.php";
			$scope.comunicar(dir, $scope.habitos_obj, $scope.habitos_exito, $scope.habitos_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Diagnosticos"');
		}
	};

	$scope.habitos_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
			$scope.rec_antecedente();
			$scope.rec_factores();
			$scope.rec_diagnosticos();
			$scope.rec_habitos();
		}else{
			$scope.des_antecedentes = false;
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Hábitos"');
		}
		$scope.muestra_cargar('N');
		if(sessionStorage.eleccion === 'recupera'){
			$scope.des_antecedentes = false;
		}else{
			$scope.des_antecedentes = true;
		}
	};
});