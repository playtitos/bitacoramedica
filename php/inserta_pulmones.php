<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$respirar 		= $request->respirar;
	$jadeo 			= $request->jadeo;
	$asma 			= $request->asma;
	$moco 			= $request->moco;
	$constipada 	= $request->constipada;
	$rinitis 		= $request->rinitis;
	$sinucitis 		= $request->sinucitis;
	$bronquitis 	= $request->bronquitis;
	$tos 			= $request->tos;
	$gripa 			= $request->gripa;
	$des_pulmon 	= $request->des_pulmon;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO pulmones VALUES ('$respirar', '$jadeo', '$asma', '$moco', '$constipada', '$rinitis', '$sinucitis', '$bronquitis', '$tos', '$gripa', '$des_pulmon', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>