<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$hipertension 	= $request->hipertension;
	$diabetes 		= $request->diabetes;
	$cardiaca 		= $request->cardiaca;
	$pulmonar 		= $request->pulmonar;
	$renal 			= $request->renal;
	$cancer 		= $request->cancer;
	$tiroides 		= $request->tiroides;
	$autoinmune 	= $request->autoinmune;
	$hace_cuanto 	= $request->hace_cuanto;
	$tratamiento 	= $request->tratamiento;
	$medicamentos 	= $request->medicamentos;
	$medica_info 	= $request->medicamentos_i;
	$embarazo 		= $request->embarazo;
	$abortos 		= $request->abortos;
	$segura 		= $request->segura;
	$periodo 		= $request->periodo;
	$alergico 		= $request->alergico;
	$deshidratacion = $request->deshidratacion;
	$hormonas 		= $request->hormonas;
	$ortopedicos 	= $request->ortopedicos;
	$depresion 		= $request->depresion;

	require_once 'db.php'; 
	$query = ("UPDATE diagnosticos SET hipertension = '$hipertension', diabetes = '$diabetes', cardiaca = '$cardiaca', pulmonar = '$pulmonar', renal = '$renal', cancer = '$cancer', tiroides = '$tiroides', autoinmune = '$autoinmune', hace_cuanto = '$hace_cuanto', tratamiento = '$tratamiento', medicamentos = '$medicamentos', medica_info = '$medica_info', embarazo = '$embarazo', abortos = '$abortos', segura = '$segura', periodo = '$periodo', alergico = '$alergico', deshidratacion = '$deshidratacion', hormonas = '$hormonas', ortopedicos = '$ortopedicos', depresion = '$depresion' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>