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
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO nervios VALUES ('$ansiedad', '$levantarse', '$estres', '$fiebre', '$agitacion', '$latidos', '$peso', '$malestar', '$fatiga', '$cansancio', '$agotamiento', '$debilidad', '$rendimiento', '$concentrar', '$hiperactividad', '$apetito', '$aum_apetito', '$sudor', '$animo', '$panico', '$des_nervio', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>
