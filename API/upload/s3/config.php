<?php
// Bucket Name
$bucket="diamonds4";

if (!class_exists('S3'))require_once('S3.php');

//AWS access info
if (!defined('awsAccessKey')) define('awsAccessKey', 'AKIAZG65ILMLY7V4FQOS');

if (!defined('awsSecretKey')) define('awsSecretKey', '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');
        

//instantiate the class
$s3 = new S3(awsAccessKey, awsSecretKey);

if($s3->putBucket($bucket, S3::ACL_PUBLIC_READ));



?>