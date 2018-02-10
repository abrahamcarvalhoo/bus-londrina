<?php
$url = 'http://site.tcgrandelondrina.com.br:8082/Soap/BuscaItinerarios';
$linha = '';

if (isset($_GET['linha'])) {
  $linha = $_GET['linha'];
}

$data = array('linha' => $linha);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

if(isset($_GET['callback'])) {
  echo $_GET['callback'].'('.$response.')';
} else {
  echo $response;
}
