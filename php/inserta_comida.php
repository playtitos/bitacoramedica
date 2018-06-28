<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$horario 		= $request->horario;
	$num_comida 	= $request->num_comida;
	$desayuno 		= $request->desayuno;
	$almuerzo 		= $request->almuerzo;
	$comida 		= $request->comida;
	$merienda 		= $request->merienda;
	$cena 			= $request->cena;
	$bebidas 		= $request->bebidas;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO comida VALUES ('$horario', '$num_comida', '$desayuno', '$almuerzo', '$comida', '$merienda', '$cena', '$bebidas', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>