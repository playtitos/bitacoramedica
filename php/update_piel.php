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

	require_once 'db.php'; 
	
	$query = ("UPDATE piel SET acne = '$acne', salpullido = '$salpullido', psoriasis = '$psoriasis', ex_grasa = '$ex_grasa', cicatrices = '$cicatrices', sequedad = '$sequedad', mucosa = '$mucosa', cabello = '$cabello', envejecer = '$envejecer', descrip_piel = '$descrip_piel' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>