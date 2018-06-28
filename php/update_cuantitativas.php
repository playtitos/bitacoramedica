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

	require_once 'db.php'; 
	
	$query = ("UPDATE cuantitativa SET edad = '$edad', cm = '$cms', peso = '$peso', med_brazo = '$med_brazo', masa_grasa = '$masa_grasa', med_cintura = '$med_cintura', masa_musc = '$masa_musc', med_cadera = '$med_cadera', imc = '$imc', med_pierna = '$med_pierna', complexion = '$complexion', ideal = '$ideal' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>