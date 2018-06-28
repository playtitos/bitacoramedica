<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$usuario 		= $request->usuario;
	$fuma 			= $request->fuma;
	$ejercicio 		= $request->ejercicio;
	$duerme 		= $request->duerme;
	$meditacion 	= $request->meditacion;
	$ocio 			= $request->ocio;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	// inserta registos en la base de datos
	require_once 'db.php'; 
	
	$query = ("INSERT INTO habitos VALUES ('$fuma', '$ejercicio', '$duerme', '$meditacion', '$ocio', '$usuario', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>