<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$usuario 		= $request->usuario;
	$colesterol 	= $request->colesterol;
	$colesterol_t 	= $request->colesterol_t;
	$colesterol_b 	= $request->colesterol_b;
	$colesterol_m 	= $request->colesterol_m;
	$trigliceridos 	= $request->trigliceridos;
	$glucosa 		= $request->glucosa;
	$diagnosticos 	= $request->diagnosticos;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	// inserta registos en la base de datos
	require_once 'db.php'; 
	
	$query = ("INSERT INTO antecedentes VALUES ('$colesterol', '$colesterol_t', '$colesterol_b', '$colesterol_m', '$trigliceridos', '$glucosa', '$diagnosticos', '$usuario', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>