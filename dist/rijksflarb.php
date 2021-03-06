<?php
require_once 'config/rm.php';
require_once 'classes/RijksQuery.php';

$term = 'love';

//run the query
$rQuery = new RijksQuery('en', $rijksKey, 'json');
$search = $rQuery->setSearch($term);


//choose a random object
$index = mt_rand(0, 100);

$result = $rQuery->artObject($index);


//parse the results
$img      = $result['image'];
$title    = $result['title'];
$maker    = $result['maker'];
$imageID  = $result['id'] . $term;
$showPath = "/assets/img/" . $imageID . ".jpg";
$savePath = $_SERVER["DOCUMENT_ROOT"] . $showPath;

//save the file
file_put_contents($savePath, file_get_contents($img));
