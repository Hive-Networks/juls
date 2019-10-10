<?php

$localhost="external-db.s145553.gridserver.com";
$username="db145553";
$password="Daniel019!";
$database="db145553_jewel";


$mysqli = new mysqli($localhost,$username,$password,$database) or die("cannot connect");
	
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

?>