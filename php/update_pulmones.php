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

	require_once 'db.php'; 
	
	$query = ("UPDATE pulmones SET respirar = '$respirar', jadeo = '$jadeo', asma = '$asma', moco = '$moco', constipada = '$constipada', rinitis = '$rinitis', sinucitis = '$sinucitis', bronquitis = '$bronquitis', tos = '$tos', gripa = '$gripa', des_pulmon = '$des_pulmon' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>