<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$hipertension 	= $request->hipertension;
	$q_hiper 		= $request->quien_hipertension;
	$diabetes 		= $request->diabetes;
	$q_diabetes 	= $request->quien_diabetes;
	$cancer 		= $request->cancer;
	$q_cancer 		= $request->quien_cancer;
	$cardiaca 		= $request->cardiaca;
	$q_cardiaca 	= $request->quien_cardiaca;
	$pulmonar 		= $request->pulmonar;
	$q_pulmonar 	= $request->quien_pulmonar;
	$otras 			= $request->otras;
	$otras_enf 		= $request->otras_enf;
	$q_otras 		= $request->quine_otras;

	require_once 'db.php'; 
	$query = ("UPDATE factores SET hipertension = '$hipertension', q_hiper = '$q_hiper', diabetes = '$diabetes', q_diabetes = '$q_diabetes', cancer = '$cancer', q_cancer = '$q_cancer', cardiaca = '$cardiaca', q_cardiaca = '$q_cardiaca', pulmonar = '$pulmonar', q_pulmonar = '$q_pulmonar', otras = '$otras', otras_enf = '$otras_enf', q_otras = '$q_otras' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>