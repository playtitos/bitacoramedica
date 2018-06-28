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
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO adicional VALUES ('$animo', '$emocional', '$nutriologo', '$nutriologo_q', '$logro', '$logro_q', '$motiva', '$resultados', '$sobrepeso', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>