<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$acne 			= $request->acne;
	$salpullido 	= $request->salpullido;
	$psoriasis 		= $request->psoriasis;
	$ex_grasa 		= $request->ex_grasa;
	$cicatrices 	= $request->cicatrices;
	$sequedad 		= $request->sequedad;
	$mucosa 		= $request->mucosa;
	$cabello 		= $request->cabello;
	$envejecer 		= $request->envejecer;
	$descrip_piel 	= $request->descrip_piel;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO piel VALUES ('$acne', '$salpullido', '$psoriasis', '$ex_grasa', '$cicatrices', '$sequedad', '$mucosa', '$cabello', '$envejecer', '$descrip_piel', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>