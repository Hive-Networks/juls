<?php
// error_reporting(0);
include('s3/config.php');
//Rename image name. 


function getExtension($str) 
{
         $i = strrpos($str,".");
         if (!$i) { return ""; } 

         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
}

$valid_formats = array("jpg", "png", "gif", "bmp","jpeg","PNG","JPG","JPEG","GIF","BMP");




$name = $_FILES['file']['name'];
$size = $_FILES['file']['size'];
$tmp = $_FILES['file']['tmp_name'];
$ext = getExtension($name);

$actual_image_name = time().$name;

if($s3->putObjectFile($tmp, $bucket , $actual_image_name, S3::ACL_PUBLIC_READ,'image/jpeg','inline') )
{
$msg = "S3 Upload Successful.";	
$s3file='http://'.$bucket.'.s3.amazonaws.com/'.$actual_image_name;
// echo "<img src='$s3file' style='max-width:400px'/><br/>";
// echo '<b>S3 File URL:</b>'.$s3file;
echo $s3file;
}




// $ds          = DIRECTORY_SEPARATOR;  //1
 
// $storeFolder = 'uploads';   //2
 
// if (!empty($_FILES)) {
     
//     $tempFile = $_FILES['file']['tmp_name'];          //3             
      
//     $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
     
//     $targetFile =  $targetPath. $_FILES['file']['name'];  //5
 
//     move_uploaded_file($tempFile,$targetFile); //6

//     echo $targetFile;
     
// }

?>




