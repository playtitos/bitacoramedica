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

	require_once 'db.php'; 
	
	$query = ("UPDATE estomago SET lengua = '$lengua', abdominal = '$abdominal', nausea = '$nausea', vomito = '$vomito', boca_est = '$boca_est', colitis = '$colitis', gastritis = '$gastritis', aliento = '$aliento', eructos = '$eructos', gases = '$gases', estrenimiento = '$estrenimiento', indigestion = '$indigestion', pies = '$pies', sed = '$sed', cabeza = '$cabeza', migrana = '$migrana', vision = '$vision', mareos = '$mareos', des_digestion = '$des_digestion', des_antojos = '$des_antojos', colon = '$colon', des_evacua = '$des_evacua' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>