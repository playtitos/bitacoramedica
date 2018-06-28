<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$colesterol 	= $request->colesterol;
	$colesterol_t 	= $request->colesterol_t;
	$colesterol_b 	= $request->colesterol_b;
	$colesterol_m 	= $request->colesterol_m;
	$trigliceridos 	= $request->trigliceridos;
	$glucosa 		= $request->glucosa;
	$diagnosticos 	= $request->diagnosticos;

	require_once 'db.php'; 
	$query = ("UPDATE antecedentes SET colesterol = '$colesterol', colesterol_t = '$colesterol_t', colesterol_b = '$colesterol_b', colesterol_m = '$colesterol_m', trigliceridos = '$trigliceridos', glucosa = '$glucosa', diagnosticos = '$diagnosticos' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>