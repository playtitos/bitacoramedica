diplomado.controller("sintomasController", function ($scope, $http, $compile, focus, ngDialog) {
	$scope.liga_sintomas 		= false;
	$scope.actualiza_sintomas 	= false;
	$scope.ligarSintomas 		= false;
	$scope.color_secc   		= "anaranjado";
    $scope.c_letra      		= "c-naranja";

	$scope.botones_sintomas = function(){
		$scope.muestra_alertas('oculta');
		if(sessionStorage.usuario === "" || sessionStorage.usuario === undefined){
            $scope.principal();
        }else{
        	$scope.colores("anaranjado", "c-naranja", 'sintomas');
        	$scope.busca_fechas();
        }
	};

	$scope.busca_fechas =  function(){
		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().men_busqueda 	= "Consultas previas";
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options 	= [];
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_usuario 	= true;
        var piel = JSON.parse(sessionStorage.Piel);
        for(var i = 0; i < piel.length; i++){
        	var fecha = piel[i].fecha_reg;
        	if(fecha !== "" && fecha !== null && fecha !== undefined){
        		var obj = {
        			ID 		: piel[i].fecha_reg + ' / ' + piel[i].hora_reg,
        			valor 	: piel[i].fecha_reg + ' / ' + piel[i].hora_reg
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

	$scope.ligar_sintomas = function(){
		var cabecera = "Confirmación guardar registros";
		var mensaje  = "¿Está seguro de guardar la información actual? Una vez realizada ésta operación, no podrá realizar cambios en los registros.";
        var template = "../views/modals/confirma_modal.html";
        var seccion  = "sintomas";
        $scope.openModal_confirm(template, '50%', '60%', cabecera, mensaje, seccion);
	};

	$scope.guarda_sintomas =  function(){
		$scope.muestra_cargar('M');
		$scope.des_sintomas =  true;
		var fecha_act 		= new Date();
		$scope.hora_reg 	= sessionStorage.hora;
		$scope.fecha_reg 	= sessionStorage.fecha;
		$scope.piel_obj     = $scope.valida_piel();
		$scope.nervios_obj 	= $scope.valida_nervios();
		$scope.pulmones_obj = $scope.valida_pulmones();
		$scope.estomago_obj = $scope.valida_estomago();
		sessionStorage.setItem('Piel', JSON.stringify($scope.piel_obj));
		sessionStorage.setItem('Nervios', JSON.stringify($scope.nervios_obj));
		sessionStorage.setItem('Pulmones', JSON.stringify($scope.pulmones_obj));
		sessionStorage.setItem('Estomago', JSON.stringify($scope.estomago_obj));
	    var dir = "../php/inserta_piel.php";
		$scope.comunicar(dir, $scope.piel_obj, $scope.piel_exito, $scope.piel_exito);
	};

	$scope.piel_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_nervios.php";
			$scope.comunicar(dir, $scope.nervios_obj, $scope.nervios_exito, $scope.nervios_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.nervios_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_pulmones.php";
			$scope.comunicar(dir, $scope.pulmones_obj, $scope.pulmones_exito, $scope.pulmones_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.pulmones_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_estomago.php";
			$scope.comunicar(dir, $scope.estomago_obj, $scope.estomago_exito, $scope.estomago_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.estomago_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
			$scope.rec_piel();
			$scope.rec_nervios();
			$scope.rec_pulmones();
			$scope.rec_estomago();
		}else{
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Hábitos"');
		}
		$scope.muestra_cargar('N');
		$scope.des_sintomas =  false;
	};

	$scope.valida_piel = function(){
		$scope.acne_s 		= $scope.validaFalse($scope.acne_s);
		$scope.salpullido_s = $scope.validaFalse($scope.salpullido_s);
		$scope.psoriasis_s 	= $scope.validaFalse($scope.psoriasis_s);
		$scope.exceso_grasa_s = $scope.validaFalse($scope.exceso_grasa_s);
		$scope.cicatrices_s = $scope.validaFalse($scope.cicatrices_s);
		$scope.sequedad_s 	= $scope.validaFalse($scope.sequedad_s);
		$scope.mucosa_s 	= $scope.validaFalse($scope.mucosa_s);
		$scope.cabello_s 	= $scope.validaFalse($scope.cabello_s);
		$scope.envejecer_s 	= $scope.validaFalse($scope.envejecer_s);
		$scope.des_piel 	= $scope.validaNS($scope.des_piel);
		var piel = {
			usuario 	: sessionStorage.usuario,
			fecha_reg 	: $scope.fecha_reg,
			hora_reg  	: $scope.hora_reg,
	    	acne 		: $scope.acne_s,
	    	salpullido 	: $scope.salpullido_s,
	    	psoriasis 	: $scope.psoriasis_s,
	    	ex_grasa 	: $scope.exceso_grasa_s,
	    	cicatrices 	: $scope.cicatrices_s,
	    	sequedad 	: $scope.sequedad_s,
	    	mucosa 		: $scope.mucosa_s,
	    	cabello 	: $scope.cabello_s,
	    	envejecer 	: $scope.envejecer_s,
	    	descrip_piel: $scope.des_piel
	    };
	    return piel;
	};

	$scope.aplica_piel = function(){
		$scope.fecha_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_sel;
		$scope.hora_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().hora_sel;
		var piel       			= JSON.parse(sessionStorage.Piel);
		for(var i = 0; i < piel.length; i++){
			if((piel[i].fecha_reg === $scope.fecha_sel) && (piel[i].hora_reg === $scope.hora_sel)){
				$scope.acne_s 		= $scope.validaTrue(piel[i].acne);
				$scope.salpullido_s = $scope.validaTrue(piel[i].salpullido);
				$scope.psoriasis_s 	= $scope.validaTrue(piel[i].psoriasis);
				$scope.exceso_grasa_s = $scope.validaTrue(piel[i].ex_grasa);
				$scope.cicatrices_s = $scope.validaTrue(piel[i].cicatrices);
				$scope.sequedad_s 	= $scope.validaTrue(piel[i].sequedad);
				$scope.mucosa_s 	= $scope.validaTrue(piel[i].mucosa);
				$scope.cabello_s 	= $scope.validaTrue(piel[i].cabello);
				$scope.envejecer_s 	= $scope.validaTrue(piel[i].envejecer);
				$scope.des_piel 	= piel[i].descrip_piel;
			}
		}
	};

	$scope.valida_nervios = function(){
		$scope.ansiedad_s 	= $scope.validaFalse($scope.ansiedad_s);
		$scope.wake_s 		= $scope.validaFalse($scope.wake_s);
		$scope.estres_s 	= $scope.validaFalse($scope.estres_s);
		$scope.fiebre_s 	= $scope.validaFalse($scope.fiebre_s);
		$scope.agita_s 		= $scope.validaFalse($scope.agita_s);
		$scope.latidos_s 	= $scope.validaFalse($scope.latidos_s);
		$scope.peso_s 		= $scope.validaFalse($scope.peso_s);
		$scope.malestar_s 	= $scope.validaFalse($scope.malestar_s);
		$scope.fatiga_s 	= $scope.validaFalse($scope.fatiga_s);
		$scope.cansancio_s 	= $scope.validaFalse($scope.cansancio_s);
		$scope.agotamiento_s = $scope.validaFalse($scope.agotamiento_s);
		$scope.debilidad_s 	= $scope.validaFalse($scope.debilidad_s);
		$scope.rendimiento_s = $scope.validaFalse($scope.rendimiento_s);
		$scope.concentrar_s = $scope.validaFalse($scope.concentrar_s);
		$scope.hiperactividad_s = $scope.validaFalse($scope.hiperactividad_s);
		$scope.memoria_s 	= $scope.validaFalse($scope.memoria_s);
		$scope.apetito_s 	= $scope.validaFalse($scope.apetito_s);
		$scope.a_apetito_s 	= $scope.validaFalse($scope.a_apetito_s);
		$scope.sudor_s 		= $scope.validaFalse($scope.sudor_s);
		$scope.animo_s 		= $scope.validaFalse($scope.animo_s);
		$scope.panico_s 	= $scope.validaFalse($scope.panico_s);
		$scope.des_nervio 	= $scope.validaNS($scope.des_nervio);
		var nervios = {
			usuario 		: sessionStorage.usuario,
			fecha_reg 		: $scope.fecha_reg,
			hora_reg  		: $scope.hora_reg,
	    	ansiedad 		: $scope.ansiedad_s,
	    	levantarse 		: $scope.wake_s,
	    	estres 			: $scope.estres_s,
	    	fiebre 			: $scope.fiebre_s,
	    	agitacion 		: $scope.agita_s,
	    	latidos 		: $scope.latidos_s,
	    	peso 			: $scope.peso_s,
	    	malestar 		: $scope.malestar_s,
	    	fatiga 			: $scope.fatiga_s,
	    	cansancio 		: $scope.cansancio_s,
	    	agotamiento 	: $scope.agotamiento_s,
	    	debilidad 		: $scope.debilidad_s,
	    	rendimiento 	: $scope.rendimiento_s,
	    	concentrar 		: $scope.concentrar_s,
	    	hiperactividad 	: $scope.hiperactividad_s,
	    	memoria 		: $scope.memoria_s,
	    	apetito 		: $scope.apetito_s,
	    	aum_apetito 	: $scope.a_apetito_s,
	    	sudor 			: $scope.sudor_s,
	    	animo 			: $scope.animo_s,
	    	panico 			: $scope.panico_s,
	    	des_nervio 		: $scope.des_nervio
	    };
	    return nervios;
	};

	$scope.aplica_nervios = function(){
		var nervios       	= JSON.parse(sessionStorage.Nervios);
		for(var i = 0; i < nervios.length; i++){
			if((nervios[i].fecha_reg === $scope.fecha_sel) && (nervios[i].hora_reg === $scope.hora_sel)){
				$scope.ansiedad_s 	= $scope.validaTrue(nervios[i].ansiedad);
				$scope.wake_s 		= $scope.validaTrue(nervios[i].levantarse);
				$scope.estres_s 	= $scope.validaTrue(nervios[i].estres);
				$scope.fiebre_s 	= $scope.validaTrue(nervios[i].fiebre);
				$scope.agita_s 		= $scope.validaTrue(nervios[i].agitacion);
				$scope.latidos_s 	= $scope.validaTrue(nervios[i].latidos);
				$scope.peso_s 		= $scope.validaTrue(nervios[i].peso);
				$scope.malestar_s 	= $scope.validaTrue(nervios[i].malestar);
				$scope.fatiga_s 	= $scope.validaTrue(nervios[i].fatiga);
				$scope.cansancio_s 	= $scope.validaTrue(nervios[i].cansancio);
				$scope.agotamiento_s = $scope.validaTrue(nervios[i].agotamiento);
				$scope.debilidad_s 	= $scope.validaTrue(nervios[i].debilidad);
				$scope.rendimiento_s = $scope.validaTrue(nervios[i].rendimiento);
				$scope.concentrar_s = $scope.validaTrue(nervios[i].concentrar);
				$scope.hiperactividad_s = $scope.validaTrue(nervios[i].hiperactividad);
				$scope.memoria_s 	= $scope.validaTrue(nervios[i].memoria);
				$scope.apetito_s 	= $scope.validaTrue(nervios[i].apetito);
				$scope.a_apetito_s 	= $scope.validaTrue(nervios[i].aum_apetito);
				$scope.sudor_s 		= $scope.validaTrue(nervios[i].sudor);
				$scope.animo_s 		= $scope.validaTrue(nervios[i].animo);
				$scope.panico_s 	= $scope.validaTrue(nervios[i].panico);
				$scope.des_nervio 	= nervios[i].des_nervio;
			}
		}
	};

	$scope.valida_pulmones = function(){
		$scope.respirar_s 	= $scope.validaFalse($scope.respirar_s);
		$scope.jadeo_s 		= $scope.validaFalse($scope.jadeo_s);
		$scope.asma_s 		= $scope.validaFalse($scope.asma_s);
		$scope.moco_s 		= $scope.validaFalse($scope.moco_s);
		$scope.constipada_s = $scope.validaFalse($scope.constipada_s);
		$scope.rinitis_s 	= $scope.validaFalse($scope.rinitis_s);
		$scope.sinucitis_s 	= $scope.validaFalse($scope.sinucitis_s);
		$scope.bronquitis_s = $scope.validaFalse($scope.bronquitis_s);
		$scope.tos_s 		= $scope.validaFalse($scope.tos_s);
		$scope.gripa_s 		= $scope.validaFalse($scope.gripa_s);
		$scope.des_pulmon 	= $scope.validaNS($scope.des_pulmon);
		var pulmones = {
			usuario 	: sessionStorage.usuario,
			fecha_reg 	: $scope.fecha_reg,
			hora_reg  	: $scope.hora_reg,
	    	respirar 	: $scope.respirar_s,
	    	jadeo 		: $scope.jadeo_s,
	    	asma 		: $scope.asma_s,
	    	moco 		: $scope.moco_s,
	    	constipada 	: $scope.constipada_s,
	    	rinitis 	: $scope.rinitis_s,
	    	sinucitis 	: $scope.sinucitis_s,
	    	bronquitis 	: $scope.bronquitis_s,
	    	tos 		: $scope.tos_s,
	    	gripa 		: $scope.gripa_s,
	    	des_pulmon 	: $scope.des_pulmon
	    };
	    return pulmones;
	};

	$scope.aplica_pulmones = function(){
		var pulmones       	= JSON.parse(sessionStorage.Pulmones);
		for(var i = 0; i < pulmones.length; i++){
			if((pulmones[i].fecha_reg === $scope.fecha_sel) && (pulmones[i].hora_reg === $scope.hora_sel)){
				$scope.respirar_s 	= $scope.validaTrue(pulmones[i].respirar);
				$scope.jadeo_s 		= $scope.validaTrue(pulmones[i].jadeo);
				$scope.asma_s 		= $scope.validaTrue(pulmones[i].asma);
				$scope.moco_s 		= $scope.validaTrue(pulmones[i].moco);
				$scope.constipada_s = $scope.validaTrue(pulmones[i].constipada);
				$scope.rinitis_s 	= $scope.validaTrue(pulmones[i].rinitis);
				$scope.sinucitis_s 	= $scope.validaTrue(pulmones[i].sinucitis);
				$scope.bronquitis_s = $scope.validaTrue(pulmones[i].bronquitis);
				$scope.tos_s 		= $scope.validaTrue(pulmones[i].tos);
				$scope.gripa_s 		= $scope.validaTrue(pulmones[i].gripa);
				$scope.des_pulmon 	= pulmones[i].des_pulmon;
			}
		}
	};

	$scope.valida_estomago = function(){
		$scope.lengua_s 		= $scope.validaFalse($scope.lengua_s);
		$scope.abdominal_s 		= $scope.validaFalse($scope.abdominal_s);
		$scope.nausea_s 		= $scope.validaFalse($scope.nausea_s);
		$scope.vomito_s 		= $scope.validaFalse($scope.vomito_s);
		$scope.boca_e_s 		= $scope.validaFalse($scope.boca_e_s);
		$scope.colitis_s 		= $scope.validaFalse($scope.colitis_s);
		$scope.gastritis_s 		= $scope.validaFalse($scope.gastritis_s);
		$scope.aliento_s 		= $scope.validaFalse($scope.aliento_s);
		$scope.eructos_s 		= $scope.validaFalse($scope.eructos_s);
		$scope.gases_s 			= $scope.validaFalse($scope.gases_s);
		$scope.estrenimiento_s 	= $scope.validaFalse($scope.estrenimiento_s);
		$scope.indigestion_s 	= $scope.validaFalse($scope.indigestion_s);
		$scope.pies_s 			= $scope.validaFalse($scope.pies_s);
		$scope.sed_s 			= $scope.validaFalse($scope.sed_s);
		$scope.cabeza_s 		= $scope.validaFalse($scope.cabeza_s);
		$scope.migrana_s 		= $scope.validaFalse($scope.migrana_s);
		$scope.vision_s 		= $scope.validaFalse($scope.vision_s);
		$scope.mareos_s 		= $scope.validaFalse($scope.mareos_s);
		$scope.des_digestion 	= $scope.validaNS($scope.des_digestion);
		$scope.des_antojos 		= $scope.validaNS($scope.des_antojos);
		$scope.colon 			= $scope.validaNS($scope.colon);
		$scope.des_evacua 		= $scope.validaNS($scope.des_evacua);
		var estomago = {
			usuario 	: sessionStorage.usuario,
			fecha_reg 	: $scope.fecha_reg,
			hora_reg  	: $scope.hora_reg,
	    	lengua 		: $scope.lengua_s,
	    	abdominal 	: $scope.abdominal_s,
	    	nausea 		: $scope.nausea_s,
	    	vomito 		: $scope.vomito_s,
	    	boca_est 	: $scope.boca_e_s,
	    	colitis 	: $scope.colitis_s,
	    	gastritis 	: $scope.gastritis_s,
	    	aliento 	: $scope.aliento_s,
	    	eructos 	: $scope.eructos_s,
	    	gases 		: $scope.gases_s,
	    	estrenimiento : $scope.estrenimiento_s,
	    	indigestion : $scope.indigestion_s,
	    	pies 		: $scope.pies_s,
	    	sed 		: $scope.sed_s,
	    	cabeza 		: $scope.cabeza_s,
	    	migrana 	: $scope.migrana_s,
	    	vision 		: $scope.vision_s,
	    	mareos 		: $scope.mareos_s,
	    	des_digestion : $scope.des_digestion,
	    	des_antojos	: $scope.des_antojos,
	    	colon 		: $scope.colon,
	    	des_evacua 	: $scope.des_evacua
	    };
	    return estomago;
	};

	$scope.aplica_estomago = function(){
		var estomago       			= JSON.parse(sessionStorage.Estomago);
		for(var i = 0; i < estomago.length; i++){
			if((estomago[i].fecha_reg === $scope.fecha_sel) && (estomago[i].hora_reg === $scope.hora_sel)){
				$scope.lengua_s 		= $scope.validaTrue(estomago[i].lengua);
				$scope.abdominal_s 		= $scope.validaTrue(estomago[i].abdominal);
				$scope.nausea_s 		= $scope.validaTrue(estomago[i].nausea);
				$scope.vomito_s 		= $scope.validaTrue(estomago[i].vomito);
				$scope.boca_e_s 		= $scope.validaTrue(estomago[i].boca_est);
				$scope.colitis_s 		= $scope.validaTrue(estomago[i].colitis);
				$scope.gastritis_s 		= $scope.validaTrue(estomago[i].gastritis);
				$scope.aliento_s 		= $scope.validaTrue(estomago[i].aliento);
				$scope.eructos_s 		= $scope.validaTrue(estomago[i].eructos);
				$scope.gases_s 			= $scope.validaTrue(estomago[i].gases);
				$scope.estrenimiento_s 	= $scope.validaTrue(estomago[i].estrenimiento);
				$scope.indigestion_s 	= $scope.validaTrue(estomago[i].indigestion);
				$scope.pies_s 			= $scope.validaTrue(estomago[i].pies);
				$scope.sed_s 			= $scope.validaTrue(estomago[i].sed);
				$scope.cabeza_s 		= $scope.validaTrue(estomago[i].cabeza);
				$scope.migrana_s 		= $scope.validaTrue(estomago[i].migrana);
				$scope.vision_s 		= $scope.validaTrue(estomago[i].vision);
				$scope.mareos_s 		= $scope.validaTrue(estomago[i].mareos);
				$scope.des_digestion 	= estomago[i].des_digestion;
				$scope.des_antojos 		= estomago[i].des_antojos;
				$scope.colon 			= estomago[i].colon;
				$scope.des_evacua 		= estomago[i].des_evacua;
			}
		}
	};

});