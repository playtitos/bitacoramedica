<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$fuma 			= $request->fuma;
	$ejercicio 		= $request->ejercicio;
	$duerme 		= $request->duerme;
	$meditacion 	= $request->meditacion;
	$ocio 			= $request->ocio;

	require_once 'db.php'; 
	$query = ("UPDATE habitos SET fuma = '$fuma', ejercicio = '$ejercicio', duerme = '$duerme', meditacion = '$meditacion', ocio = '$ocio' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>
