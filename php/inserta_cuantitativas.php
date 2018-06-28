<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$edad 			= $request->edad;
	$cms 			= $request->cms;
	$peso 			= $request->peso;
	$med_brazo 		= $request->med_brazo;
	$masa_grasa 	= $request->masa_grasa;
	$med_cintura 	= $request->med_cintura;
	$masa_musc 		= $request->masa_musc;
	$med_cadera 	= $request->med_cadera;
	$imc 			= $request->imc;
	$med_pierna 	= $request->med_pierna;
	$complexion 	= $request->complexion;
	$ideal 			= $request->ideal;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO cuantitativa VALUES ('$edad', '$cms', '$peso', '$med_brazo', '$masa_grasa', '$med_cintura', '$masa_musc', '$med_cadera', '$imc', '$med_pierna', '$complexion', '$ideal', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>