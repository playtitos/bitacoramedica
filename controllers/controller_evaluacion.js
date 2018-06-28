diplomado.controller("evaluacionesController", function ($scope, $http, focus) {
	$scope.enfermedades = [];
	$scope.color_secc   = "verde-f";
    $scope.c_letra      = "c-verde-f";
    $scope.form 		= [];
	$scope.files 		= [];
	$scope.anos_options = [];
	$scope.kg_options   = [];
	$scope.cm_options   = [];
	$scope.actualizado  = false;
	$scope.dis_iris 	= true;
	$scope.dis_lengua 	= true;
	$scope.dis_unas 	= true;
	$scope.dis_piel 	= true;
	$scope.dis_cuerpo_at= true;
	$scope.dis_cuerpo_ad= true;

	$scope.botones_habitos = function(){
		$scope.muestra_alertas('oculta');
		if(sessionStorage.usuario === "" || sessionStorage.usuario === undefined){
            $scope.principal();
        }else{
        	$scope.colores("verde-f", "c-verde-f", 'evaluaciones');
        	$scope.busca_fechas();
		}
		$scope.hora_reg 	= sessionStorage.hora;
		$scope.fecha_reg 	= sessionStorage.fecha;
	};

	$scope.busca_fechas =  function(){
		angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().men_busqueda 	= "Consultas previas";
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fechas_options 	= [];
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_usuario 	= true;
        var cuanti       	= JSON.parse(sessionStorage.Cuantitativas);
        for(var i = 0; i < cuanti.length; i++){
        	var fecha = cuanti[i].fecha_reg;
        	if(fecha !== "" && fecha !== null && fecha !== undefined){
        		var obj = {
        			ID 		: cuanti[i].fecha_reg + ' / ' + cuanti[i].hora_reg,
        			valor 	: cuanti[i].fecha_reg + ' / ' + cuanti[i].hora_reg
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

	$scope.valida_iris = function(){
		$scope.error_iris = "";
		$scope.muestra_alertas('oculta', "");
		if($scope.iris === undefined || $scope.iris === ""){
			$scope.muestra_errores('iris');
			focus('iris');
		}else{
			$scope.muestra_alertas('oculta', '');
			$scope.submit('iris', $scope.iris);
		}
	};

	$scope.valida_lengua = function(){
		$scope.error_lengua = "";
		$scope.muestra_alertas('oculta', "");
		if($scope.lengua === undefined || $scope.lengua === ""){
			$scope.muestra_errores('lengua');
			focus('lengua');
		}else{
			$scope.muestra_alertas('oculta', '');
			$scope.submit('lengua', $scope.lengua);
		}
	};

	$scope.valida_unas = function(){
		$scope.error_unas = "";
		$scope.muestra_alertas('oculta', "");
		if($scope.unas === undefined || $scope.unas === ""){
			$scope.muestra_errores('unas');
			focus('unas');
		}else{
			$scope.muestra_alertas('oculta', '');
			$scope.submit('unas', $scope.unas);
		}
	};

	$scope.valida_piel = function(){
		$scope.error_piel = "";
		$scope.muestra_alertas('oculta', "");
		if($scope.piel === undefined || $scope.piel === ""){
			$scope.muestra_errores('piel');
			focus('piel');
		}else{
			$scope.muestra_alertas('oculta', '');
			$scope.submit('piel', $scope.piel);
		}
	};

	$scope.cuerpo_ad = function(){
		$scope.muestra_alertas('oculta', '');
		$scope.submit('cuerpo_ad', 'cuerpo_ad')
	};

	$scope.cuerpo_at = function(){
		$scope.muestra_alertas('oculta', '');
		$scope.submit('cuerpo_at', 'cuerpo_at')
	};

	$scope.muestra_errores = function(secc){
		var mensaje 			= "";
		if(secc === "iris"){
			$scope.error_iris 	= "error";
			mensaje 			= "Debe de introducir una descripción del iris.";
		}else if(secc === "lengua"){
			$scope.error_lengua = "error";
			mensaje 			= "Debe de introducir una descripción de la lengua.";
		}else if(secc === "unas"){
			$scope.error_unas = "error";
			mensaje 			= "Debe de introducir una descripción de las uñas.";
		}else if(secc === "piel"){
			$scope.error_piel 	= "error";
			mensaje 			= "Debe de introducir una descripción de la piel.";
		}
		$scope.muestra_alertas('error', mensaje);
	};

	$scope.submit = function(secc, desc){
		$scope.muestra_alertas('oculta', '');
		$scope.muestra_cargar('Y');
	    $scope.form.image 	= $scope.files[0];
	    $http({
			method  : 'POST',
			url     : '../php/sube_imagen.php',
			processData: false,
			transformRequest: function (data) {
			    var formData = new FormData();
			    formData.append("image", $scope.form.image); 
			    return formData;  
			},  
			data : $scope.form,
			headers: {
			    'Content-Type': undefined
			}
		}).success(function(data, status, headers, config){
		   	$scope.upload_exito(data, secc, desc);
		});
	};

	$scope.uploadedFile = function(element) {
		$scope.muestra_alertas('oculta', '');
		$scope.currentFile 	= element.files[0];
		var reader 			= new FileReader();
		var id_elm 			= element.id;
		reader.onload = function(event) {
			if(id_elm === "img_iris"){
	        	$scope.dis_iris 			= false;
	        	$scope.image_source_iris 	= event.target.result;
	        }else if(id_elm === "img_lengua"){
	        	$scope.dis_lengua 			= false;
	        	$scope.image_source_lengua 	= event.target.result;
	        }else if(id_elm === "img_unas"){
	        	$scope.dis_unas 			= false;
	        	$scope.image_source_unas 	= event.target.result;
	        }else if(id_elm === "img_piel"){
	        	$scope.dis_piel 			= false;
	        	$scope.image_source_piel 	= event.target.result;
	        }else if(id_elm === "img_cuerpo_ad"){
	        	$scope.dis_cuerpo_ad 		= false;
	        	$scope.image_source_cuerpo_ad = event.target.result;
	        }else if(id_elm === "img_cuerpo_at"){
	        	$scope.dis_cuerpo_at 		= false;
	        	$scope.image_source_cuerpo_at = event.target.result;
	        }
		    $scope.$apply(function($scope) {
		        $scope.files = element.files;
		    });
		}
        reader.readAsDataURL(element.files[0]);
	};

	$scope.upload_exito = function(response, secc, desc){
		var obj = {
			archivo : response,
			seccion : secc,
			desc 	: desc,
			usuario : sessionStorage.usuario,
			fecha_reg : $scope.fecha_reg,
			hora_reg : $scope.hora_reg
		};
		var dir = "../php/inserta_imagen.php";
		$scope.comunicar(dir, obj, $scope.upload_success, $scope.upload_success);
	};

	$scope.upload_success = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
		}else{
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Evaluaciones"');
		}
		$scope.muestra_cargar('N');
		$scope.files = [];
	};

	$scope.anos = function(){
		for(var i = 1; i < 100; i++){
			var obj = {
				ID 		: i,
				valor 	: i
			};
			$scope.anos_options.push(obj);
		}
	};

	$scope.pesoskg = function(){
		for(var i = 20; i < 180; i++){
			var obj = {
				ID 		: i,
				valor 	: i
			};
			$scope.kg_options.push(obj);
		}
	};

	$scope.centimetros = function(){
		for(var i = 1.20; i < 2.50; i += 0.05){
			var obj = {
				ID 		: i.toFixed(2),
				valor 	: i.toFixed(2)
			};
			$scope.cm_options.push(obj);
		}
	};

	$scope.nutriologo_p = function(resp){
		$scope.q_nutriologo 	= false;
		if(resp === 'Y'){
			$scope.q_nutriologo = true;
			focus('nutriologo_q');
		}else{
			$scope.q_nutriologo = false;
		}
	};

	$scope.logro_p = function(resp){
		$scope.q_logro 	   = false;
		if(resp === 'Y'){
			$scope.q_logro = false;
		}else{
			$scope.q_logro = true;
			focus('logro_q');
		}
	};

	$scope.calc_imc = function(){
		var alt 	= parseFloat($scope.cms);
		var alt2 	= (alt * alt);
		var peso 	= parseFloat($scope.peso);
		var total 	= ((peso) / (alt2));
		$scope.imc 	= total.toFixed(2);
	};

	$scope.ligar_evaluaciones =  function(){
		var cabecera = "Confirmación guardar registros";
		var mensaje  = "¿Está seguro de guardar la información actual? Una vez realizada ésta operación, no podrá realizar cambios en los registros.";
        var template = "../views/modals/confirma_modal.html";
        $scope.openModal_confirm(template, '50%', '60%', cabecera, mensaje);
        angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().abrio = "evaluaciones";
	};

	$scope.guarda_evaluaciones =  function(){
		if($scope.fecha_meta == "" || $scope.fecha_meta == undefined ){
	    	focus('fecha_meta');
    	}else{
    		$scope.cancelar_ligar();
			$scope.des_evaluacion 		=  true;
			$scope.muestra_cargar('M');
			$scope.cuantitativas_obj 	= $scope.valida_cuantitativas();
			$scope.adicional_obj 		= $scope.valida_adicional();
			$scope.metas_obj 			= $scope.valida_metas();
			sessionStorage.setItem('Cuantitativas', JSON.stringify($scope.cuantitativas_obj));
			sessionStorage.setItem('Adicional', JSON.stringify($scope.adicional_obj));
			sessionStorage.setItem('Metas', JSON.stringify($scope.metas_obj));
		    var dir = "../php/inserta_cuantitativas.php";
			$scope.comunicar(dir, $scope.cuantitativas_obj, $scope.cuantitativas_exito, $scope.cuantitativas_exito);
    	}
	};

	$scope.cuantitativas_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_adicional.php";
			$scope.comunicar(dir, $scope.adicional_obj, $scope.adicional_exito, $scope.adicional_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.adicional_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			var dir = "../php/inserta_metas.php";
			$scope.comunicar(dir, $scope.metas_obj, $scope.metas_exito, $scope.metas_exito);
		}else{
			$scope.muestra_cargar('N');
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Antecedentes"');
		}
	};

	$scope.metas_exito = function(response){
		var respuesta = response.data.trim();
    	if(respuesta === "exito"){
			$scope.muestra_alertas('exito', 'Se guardaron los registros exitosamente.');
			$scope.rec_cuantitativas();
			$scope.rec_adicional();
			$scope.rec_metas();
			$scope.rec_imagenes();
		}else{
			$scope.des_evaluacion = false;
			$scope.muestra_alertas('error', 'Ocurrió un problema al guardar los registros, favor de comunicarse con el Administrador. Sección: "Hábitos"');
		}
		$scope.muestra_cargar('N');
		$scope.des_evaluacion = false;
	};

	$scope.valida_cuantitativas = function(){
		$scope.edad 		= $scope.validaVacio($scope.edad);
	    $scope.cms 			= $scope.validaVacio($scope.cms);
	    $scope.peso 		= $scope.validaCero($scope.peso);
	    $scope.med_brazo 	= $scope.validaCero($scope.med_brazo);
	    $scope.masa_grasa 	= $scope.validaCero($scope.masa_grasa);
	    $scope.med_cintura 	= $scope.validaCero($scope.med_cintura);
	    $scope.masa_musc 	= $scope.validaCero($scope.masa_musc);
	    $scope.med_cadera 	= $scope.validaCero($scope.med_cadera);
	    $scope.imc 			= $scope.validaCero($scope.imc);
	    $scope.med_pierna 	= $scope.validaCero($scope.med_pierna);
	    $scope.complexion 	= $scope.validaNS($scope.complexion);
	    $scope.ideal 		= $scope.validaCero($scope.ideal);

	    var cuantitativa 	= {
	    	usuario 	: sessionStorage.usuario,
	    	fecha_reg 	: $scope.fecha_reg,
	    	hora_reg  	: $scope.hora_reg,
	    	edad 		: $scope.edad,
	    	cms 		: $scope.cms,
	    	peso 		: $scope.peso,
	    	med_brazo 	: $scope.med_brazo,
	    	masa_grasa 	: $scope.masa_grasa,
	    	med_cintura : $scope.med_cintura,
	    	masa_musc 	: $scope.masa_musc,
	    	med_cadera 	: $scope.med_cadera,
	    	imc 		: $scope.imc,
	    	med_pierna 	: $scope.med_pierna,
	    	complexion 	: $scope.complexion,
	    	ideal 		: $scope.ideal
	    };
	    return cuantitativa;
	};

	$scope.valida_adicional = function(){
		$scope.animo 		= $scope.validaNS($scope.animo);
	    $scope.emocional 	= $scope.validaNS($scope.emocional);
	    $scope.nutriologo 	= $scope.validaNo($scope.nutriologo);
	    $scope.nutriologo_q = $scope.validaNS($scope.nutriologo_q);
	    $scope.logro 		= $scope.validaNo($scope.logro);
	    $scope.logro_q 		= $scope.validaNS($scope.logro_q);
	    $scope.motiva 		= $scope.validaNS($scope.motiva);
	    $scope.resultados 	= $scope.validaNS($scope.resultados);
	    $scope.sobrepeso 	= $scope.validaNS($scope.sobrepeso);

	    var adicional 		= {
	    	usuario 		: sessionStorage.usuario,
	    	fecha_reg 		: $scope.fecha_reg,
	    	hora_reg  		: $scope.hora_reg,
	    	animo 			: $scope.animo,
	    	emocional 		: $scope.emocional,
	    	nutriologo 		: $scope.nutriologo,
	    	nutriologo_q 	: $scope.nutriologo_q,
	    	logro 			: $scope.logro,
	    	logro_q 		: $scope.logro_q,
	    	motiva 			: $scope.motiva,
	    	resultados 		: $scope.resultados,
	    	sobrepeso 		: $scope.sobrepeso
	    };
	    return adicional;
	};

	$scope.valida_metas = function(){
		$scope.meta 		= $scope.validaNS($scope.meta);
	    $scope.pretextos 	= $scope.validaNS($scope.pretextos);
	    $scope.compromisos 	= $scope.validaNS($scope.compromisos);

	    var metas 		= {
	    	usuario 		: sessionStorage.usuario,
	    	fecha_reg 		: $scope.fecha_reg,
	    	hora_reg  		: $scope.hora_reg,
	    	meta 			: $scope.meta,
	    	fecha_meta 		: $scope.fecha_meta,
	    	pretextos 		: $scope.pretextos,
	    	compromisos 	: $scope.compromisos
	    };
	    return metas;
	};

	$scope.aplica_cuantitativas = function(){
	    $scope.fecha_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().fecha_sel;
		$scope.hora_sel 		= angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().hora_sel;
		var cuanti       		= JSON.parse(sessionStorage.Cuantitativas);
		for(var i = 0; i < cuanti.length; i++){
			if((cuanti[i].fecha_reg === $scope.fecha_sel) && (cuanti[i].hora_reg === $scope.hora_sel)){
				$scope.edad 		= parseInt(cuanti[i].edad);
			    $scope.cms 			= parseFloat(cuanti[i].cm).toFixed(2);
			    $scope.peso 		= parseInt(cuanti[i].peso);
			    $scope.med_brazo 	= parseFloat(cuanti[i].med_brazo).toFixed(2);
			    $scope.masa_grasa 	= parseFloat(cuanti[i].masa_grasa).toFixed(2);
			    $scope.med_cintura 	= parseFloat(cuanti[i].med_cintura).toFixed(2);
			    $scope.masa_musc 	= parseFloat(cuanti[i].masa_musc).toFixed(2);
			    $scope.med_cadera 	= parseFloat(cuanti[i].med_cadera).toFixed(2);
			    $scope.imc 			= parseFloat(cuanti[i].imc).toFixed(2);
			    $scope.med_pierna 	= parseFloat(cuanti[i].med_pierna).toFixed(2);
			    $scope.complexion 	= cuanti[i].complexion;
			    $scope.ideal 		= parseFloat(cuanti[i].ideal).toFixed(2);
			}
		}
	};

	$scope.aplica_adicional = function(){
		var adicional       = JSON.parse(sessionStorage.Adicional);
		for(var i = 0; i < adicional.length; i++){
			if((adicional[i].fecha_reg === $scope.fecha_sel) && (adicional[i].hora_reg === $scope.hora_sel)){
				$scope.animo 		= adicional[i].animo;
			    $scope.emocional 	= adicional[i].emocional;
			    $scope.nutriologo 	= $scope.valida_hora(adicional[i].nutriologo);
			    $scope.nutriologo_q = adicional[i].nutriologo_q;
			    $scope.logro 		= $scope.valida_hora(adicional[i].logro);
			    $scope.logro_q 		= adicional[i].logro_q;
			    $scope.motiva 		= adicional[i].motiva;
			    $scope.resultados 	= adicional[i].resultados;
			    $scope.sobrepeso 	= adicional[i].sobrepeso;
			}
		}
	};
	
	$scope.aplica_metas = function(){
		var metas       	= JSON.parse(sessionStorage.Metas);
		for(var i = 0; i < metas.length; i++){
			if((metas[i].fecha_reg === $scope.fecha_sel) && (metas[i].hora_reg === $scope.hora_sel)){
				$scope.meta 		= metas[i].meta;
			    $scope.pretextos 	= metas[i].pretextos;
			    $scope.compromisos 	= metas[i].compromisos;
			    $scope.fecha_meta 	= metas[i].fecha_meta;
			}
		}
	};

	$scope.aplica_imagenes = function(){
		var imagenes       	= JSON.parse(sessionStorage.Imagenes);
		for(var i = 0; i < imagenes.length; i++){
			if((imagenes[i].fecha_reg === $scope.fecha_sel) && (imagenes[i].hora_reg === $scope.hora_sel)){
				if(imagenes[i].secc === "iris"){
					$scope.iris 			 	= imagenes[i].desc;
					$scope.image_source_iris 	= "../images/" + imagenes[i].ruta;
				}else if(imagenes[i].secc === "lengua"){
					$scope.lengua 				= imagenes[i].desc;
					$scope.image_source_lengua 	= "../images/" + imagenes[i].ruta;
				}else if(imagenes[i].secc === "unas"){
					$scope.unas 				= imagenes[i].desc;
					$scope.image_source_unas 	= "../images/" + imagenes[i].ruta;
				}else if(imagenes[i].secc === "piel"){
					$scope.piel 				= imagenes[i].desc;
					$scope.image_source_piel 	= "../images/" + imagenes[i].ruta;
				}else if(imagenes[i].secc === "cuerpo_ad"){
					$scope.image_source_cuerpo_ad = "../images/" + imagenes[i].ruta;
				}else if(imagenes[i].secc === "cuerpo_at"){
					$scope.image_source_cuerpo_at = "../images/" + imagenes[i].ruta;
				}
			}
		}
		$scope.dis_iris 			= false;
	    $scope.dis_lengua 			= false;
	    $scope.dis_unas 			= false;
	    $scope.dis_piel 			= false;
	    $scope.dis_cuerpo_ad 		= false;
	    $scope.dis_cuerpo_at 		= false;
	};
});