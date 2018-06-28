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

	require_once 'db.php'; 
	
	$query = ("UPDATE comida SET horario = '$horario', num_comida = '$num_comida', desayuno = '$desayuno', almuerzo = '$almuerzo', comida = '$comida', merienda = '$merienda', cena = '$cena', bebidas = '$bebidas' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>