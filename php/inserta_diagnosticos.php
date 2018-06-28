<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$usuario 		= $request->usuario;
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
	$medicamentos_i = $request->medicamentos_i;
	$embarazo 		= $request->embarazo;
	$abortos 		= $request->abortos;
	$segura 		= $request->segura;
	$periodo 		= $request->periodo;
	$alergico 		= $request->alergico;
	$deshidratacion = $request->deshidratacion;
	$hormonas 		= $request->hormonas;
	$ortopedicos 	= $request->ortopedicos;
	$depresion 		= $request->depresion;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	// inserta registos en la base de datos
	require_once 'db.php'; 
	
	$query = ("INSERT INTO diagnosticos VALUES ('$hipertension', '$diabetes', '$cardiaca', '$pulmonar', '$renal', '$cancer', '$tiroides', '$autoinmune', '$hace_cuanto', '$tratamiento', '$medicamentos', '$medicamentos_i', '$embarazo', '$abortos', '$segura', '$periodo', '$alergico', '$deshidratacion', '$hormonas', '$ortopedicos', '$depresion', '$usuario', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>