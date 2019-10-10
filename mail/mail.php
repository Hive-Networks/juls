<?php

/*


echo $email_text;
*/

$email_text = var_export($_POST, true);

$email_to = "hello@rafael.diamonds";

$email_subject = "Someone sent a lead";

$email_message = "

$email_text

";


$email_from = "website@rafael.diamonds";

$email_hd = "website@rafael.diamonds <website@rafael.diamonds>";

$headers = 'From: '.$email_hd."\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

@mail($email_to, $email_subject, $email_message, $headers); 

echo "200";


?>