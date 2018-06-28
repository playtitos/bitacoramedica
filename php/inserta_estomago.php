<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$lengua 		= $request->lengua;
	$abdominal 		= $request->abdominal;
	$nausea 		= $request->nausea;
	$vomito 		= $request->vomito;
	$boca_est 		= $request->boca_est;
	$colitis 		= $request->colitis;
	$gastritis 		= $request->gastritis;
	$aliento 		= $request->aliento;
	$eructos 		= $request->eructos;
	$gases 			= $request->gases;
	$estrenimiento 	= $request->estrenimiento;
	$indigestion 	= $request->indigestion;
	$pies 			= $request->pies;
	$sed 			= $request->sed;
	$cabeza 		= $request->cabeza;
	$migrana 		= $request->migrana;
	$vision 		= $request->vision;
	$mareos 		= $request->mareos;
	$des_digestion 	= $request->des_digestion;
	$des_antojos 	= $request->des_antojos;
	$colon 			= $request->colon;
	$des_evacua 	= $request->des_evacua;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;

	require_once 'db.php'; 
	
	$query = ("INSERT INTO estomago VALUES ('$lengua', '$abdominal', '$nausea', '$vomito', '$boca_est', '$colitis', '$gastritis', '$aliento', '$eructos', '$gases', '$estrenimiento', '$indigestion', '$pies', '$sed', '$cabeza', '$migrana', '$vision', '$mareos', '$des_digestion', '$des_antojos', '$colon', '$des_evacua', '$rfc', '$fecha_reg', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>

