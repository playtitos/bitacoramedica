<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$usuario 			= $request->usuario;
	$hipertension 		= $request->hipertension;
	$quien_hipertension = $request->quien_hipertension;
	$diabetes 			= $request->diabetes;
	$quien_diabetes 	= $request->quien_diabetes;
	$cancer 			= $request->cancer;
	$quien_cancer 		= $request->quien_cancer;
	$cardiaca 			= $request->cardiaca;
	$quien_cardiaca 	= $request->quien_cardiaca;
	$pulmonar 			= $request->pulmonar;
	$quien_pulmonar 	= $request->quien_pulmonar;
	$otras 				= $request->otras;
	$otras_enf 			= $request->otras_enf;
	$quine_otras 		= $request->quine_otras;
	$fecha_reg 			= $request->fecha_reg;
	$hora_reg 			= $request->hora_reg;

	// inserta registos en la base de datos
	require_once 'db.php'; 
	
	$query = ("INSERT INTO factores VALUES ('$hipertension', '$quien_hipertension', '$diabetes', '$quien_diabetes', '$cancer', '$quien_cancer', '$cardiaca', '$quien_cardiaca', '$pulmonar', '$quien_pulmonar', '$otras', '$otras_enf', '$quine_otras', '$usuario', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>