<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$archivo 		= $request->archivo;
	$secc 			= $request->seccion;
	$desc 			= $request->desc;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	$query = ("INSERT INTO imagenes VALUES ('$archivo', '$secc', '$desc', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>