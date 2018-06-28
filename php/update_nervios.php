<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$ansiedad 		= $request->ansiedad;
	$levantarse 	= $request->levantarse;
	$estres 		= $request->estres;
	$fiebre 		= $request->fiebre;
	$agitacion 		= $request->agitacion;
	$latidos 		= $request->latidos;
	$peso 			= $request->peso;
	$malestar 		= $request->malestar;
	$fatiga 		= $request->fatiga;
	$cansancio 		= $request->cansancio;
	$agotamiento 	= $request->agotamiento;
	$debilidad 		= $request->debilidad;
	$rendimiento 	= $request->rendimiento;
	$concentrar 	= $request->concentrar;
	$hiperactividad = $request->hiperactividad;
	$apetito 		= $request->apetito;
	$aum_apetito 	= $request->aum_apetito;
	$sudor 			= $request->sudor;
	$animo 			= $request->animo;
	$panico 		= $request->panico;
	$des_nervio 	= $request->des_nervio;

	require_once 'db.php'; 
	
	$query = ("UPDATE nervios SET ansiedad = '$ansiedad', levantarse = '$levantarse', estres = '$estres', fiebre = '$fiebre', agitacion = '$agitacion', latidos = '$latidos', peso = '$peso', malestar = '$malestar', fatiga = '$fatiga', cansancio = '$cansancio', agotamiento = '$agotamiento', debilidad = '$debilidad', rendimiento = '$rendimiento', concentrar = '$concentrar', hiperactividad = '$hiperactividad', apetito = '$apetito', aum_apetito = '$aum_apetito', sudor = '$sudor', animo = '$animo', panico = '$panico', des_nervio = '$des_nervio' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>