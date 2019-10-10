<?php
session_start();
require("api.php");
require("db.php");

//error_reporting(0);

//echo "Initiated API Request";

if(isset($_POST['q'])) {
$q = $_POST['q'];    
}

else {
$q = $_GET['q'];     
}


if ($q == "createCategory") { 
$catName = $_POST['catName'];

$create = new Cat();
$create->createCategory($catName,$mysqli);
}


if ($q == "updateCategory") { 
    $catName = $_POST['catName'];
    $catHead = $_POST['catHead'];
    $catImg = $_POST['catImg'];
    $description = $_POST['description'];
$id = $_POST['id'];

    $create = new Cat();
    $create->updateCategory($catName,$catHead,$catImg,$description,$id,$mysqli);
    }
    


if ($q == "getCategories") { 
$create = new Cat();
$create->getCategories($mysqli);
}


if ($q == "getCategoriesJSON") { 
$create = new Cat();
$create->getCategoriesJSON($mysqli);
}


if ($q == "deleteCategory") { 
$catId = $_POST['catid'];

$create = new Cat();
$create->deleteCat($catId,$mysqli);
}








if ($q == "uploadImages") { 
$data = $_POST['data'];

$create = new Files();
$create->saveFiles($data,$mysqli);
}



if ($q == "saveProduct") {    

    $name = $_POST['name'];
    $categorySelect = $_POST['categorySelect'];
$secondCategorySelect = $_POST['secondCategorySelect'];
$shortDesc = $_POST['shortDesc'];
$colors = $_POST['colors'];
$sizes = $_POST['sizes'];
$priceBefore = $_POST['priceBefore'];
$description = $_POST['description'];
$priceFinal = $_POST['priceFinal'];
$images = $_POST['images'];
$stonesNum = $_POST['stonesNum'];
$stonesWeight = $_POST['stonesWeight'];
$stonesClarity = $_POST['stonesClarity'];
$stonesColor = $_POST['stonesColor'];




$create = new Product();
$create->saveProduct($name,$categorySelect,$secondCategorySelect,$shortDesc,$colors,$sizes,$priceBefore,$description,$priceFinal,$images,$stonesNum,$stonesWeight,$stonesClarity,$stonesColor,$mysqli);
}


if ($q == "getProducts") { 
$create = new Product();
$create->getProducts($mysqli);
}



if ($q == "featureProduct") { 
$productId = $_POST['productId'];
$status = $_POST['status'];

$create = new Product();
$create->featureProduct($productId,$status,$mysqli);
}

if ($q == "getProduct") {
$productId = $_POST['id'];

$create = new Product();
$create->getProduct($productId,$mysqli);
}



if ($q == "getProductsbyCat") {
    $catId = $_POST['id'];
    
    $create = new Product();
    $create->getProductByCat($catId,$mysqli);
    }



if ($q == "addToCart") {
$productId = $_POST['id'];
$goldType = $_POST['goldType'];

$create = new Product();
$create->addToCart($productId,$goldType,$mysqli);
}



if ($q == "getCartItems") {
$create = new Product();
$create->getCartItems($mysqli);
}


if ($q == "removeFromCart") {

    $id = $_POST['id'];
    $create = new Product();
    $create->removeFromCart($id,$mysqli);
}

if ($q == "checkoutForm") {

    $data = $_POST;

    $create = new Product();
    $create->checkout($data,$mysqli);

}


if ($q == "updateProduct") {

    $data = $_POST;

    $create = new Product();
    $create->updateProduct($data,$mysqli);

}


if ($q == "getFeaturedProducts") {
    $create = new Product();
    $create->getFeaturedProducts($mysqli);
}




?>







