<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$animo 			= $request->animo;
	$emocional 		= $request->emocional;
	$nutriologo 	= $request->nutriologo;
	$nutriologo_q 	= $request->nutriologo_q;
	$logro 			= $request->logro;
	$logro_q 		= $request->logro_q;
	$motiva 		= $request->motiva;
	$resultados 	= $request->resultados;
	$sobrepeso 		= $request->sobrepeso;

	require_once 'db.php'; 
	
	$query = ("UPDATE adicional SET animo = '$animo', emocional = '$emocional', nutriologo = '$nutriologo', nutriologo_q = '$nutriologo_q', logro = '$logro', logro_q = '$logro_q', motiva = '$motiva', resultados = '$resultados', sobrepeso = '$sobrepeso' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>