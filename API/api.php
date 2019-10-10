<?php
error_reporting(0);

class Cat {

function createCategory($catName,$mysqli) {

$query = "INSERT INTO categories
(cat_name) 
VALUES
('$catName')
";

$mysqli->query($query);


$resultJson = array(
"catName" => $catName,
"result" => "success",
);


$this->json($resultJson);

}







// Get All Categories
function getCategories($mysqli) {

$query = "SELECT * FROM categories ORDER BY id ASC";
$queryExec = $mysqli->query($query);
$numberOfResults = $queryExec->num_rows;
$result = $queryExec->fetch_all(MYSQLI_ASSOC);

// $cats = array();

$html .= "";


for ($i=0;$i<$numberOfResults;$i++) {
$catId = $result[$i]["id"];
$catName = $result[$i]["cat_name"];

$html .=  "

<div id='' class='table-data__table-row langD'> <div class='table-data__table-cell table-data__table-cell--hash'> $catId </div> 
<div class='table-data__table-cell table-data__table-cell--name'> $catName </div> 

<div class='table-data__table-cell table-data__table-cell--actions'>    
<div class='table-data__table-icons-box'>   


<a class='padding-5-lr' href='edit_category.html?category=$catId'> 
<button  class='table-data__table-icons-box-button' >        
<svg class='table-data__table-edit-icon deleteLang' hotelid=''+returnedData[i].hotelId+'' parent=''+transParent+'' lang=''+languageId+''>           
<use xlink:href='assets/img/sprites.svg#icon-edit'></use>     
</svg>   
</button> </a> 


<a href='#/dashboard/update/language/3' class='table-data__table-icons-box-button'>                                      </svg>       
</a>      
<button  class='table-data__table-icons-box-button' >        
<svg class='table-data__table-delete-icon catDelete' catid='$catId'>             
<use xlink:href='assets/img/sprites.svg#icon-cross'></use>         
</svg>       </button>  




</div> </div>  </div>
";



// $cat = array (
// "catId" => $catId,
// "catName" => $catName,
// "html" => $html,
// );

// array_push($cats,$cat);

}

$this->json($html);
}




function getCategoriesJSON($mysqli) {

$query = "SELECT * FROM categories ORDER BY id ASC";
$queryExec = $mysqli->query($query);
$numberOfResults = $queryExec->num_rows;
$result = $queryExec->fetch_all(MYSQLI_ASSOC);

$cats = array();

for ($i=0;$i<$numberOfResults;$i++) {
$catId = $result[$i]["id"];
$catName = $result[$i]["cat_name"];


$cat = array (
"catId" => $catId,
"catName" => $catName,
);

array_push($cats,$cat);

}


$this->json($cats);


}


function updateCategory($catName,$catHead,$catImg,$description,$id,$mysqli) {

$query = "
UPDATE categories SET 
cat_name = '$catName',
cat_img = '$catImg',
cat_text = '$description',
cat_head = '$catHead'
WHERE id LIKE '$id'
";

$mysqli->query($query);

}

function deleteCat($catId,$mysqli) {


$query = "
DELETE FROM categories 
WHERE id LIKE '$catId'
";

$mysqli->query($query);


$resultJson = array(
"result" => "success",
);


$this->json($resultJson);

}


function json($data) {
echo json_encode($data);
}

}



class Product{

function saveProduct($name,$categorySelect,$secondCategorySelect,$shortDesc,$colors,$sizes,$priceBefore,$description,$priceFinal,$images,$stonesNum,$stonesWeight,$stonesClarity,$stonesColor,$mysqli) {

$resultJson = array(
"name" => $name,
"categorySelect" => $categorySelect,
"secondCategorySelect" => $secondCategorySelect,
"shortDesc" => $categorySelect,
"colors" => $colors,
"sizes" => $sizes,
"priceBefore" => $priceBefore,
"description" => $description,
"priceFinal" => $priceFinal,
"images" => $images,
);

$this->json($resultJson);


$imagesSerialized = json_encode($images);

$queryProduct = "INSERT into products 
(name,category,shortDesc,colors,sizes,pricebefore,pricefinal,description,images,subcat,stonesNum,stonesWeight,stonesClarity,stonesColor)
VALUES
('$name','$categorySelect','$shortDesc','$colors','$sizes','$priceBefore','$priceFinal','$description','$images','$secondCategorySelect','$stonesNum','$stonesWeight','$stonesClarity','$stonesColor')
";

$mysqli->query($queryProduct);

$productId = mysqli_insert_id($mysqli);

$numOfImages = count($images);


for($i=0;$i<$numOfImages;$i++) {

$image = array(
"imgURL" => $images[$i]["url"],
"imgName" => $name,
);



$imageFinal = $images[$i]["url"];



$queryInsertImage = "INSERT into files (url,caption,product) VALUES ('$imageFinal','$name','$productId')";
$mysqli->query($queryInsertImage);



}
}


function updateProduct($data,$mysqli) {


    print_r($data);


 

    $name = $data['name'];
    $shortDesc = $data['shortDesc'];
    $id = $data['id'];
    $stonesWeight = $data['stonesWeight'];
    $stonesClarity = $data['stonesClarity'];
    $stonesColor = $data['stonesColor'];
    $stonesNum = $data['stonesNum'];
    $description = $data['description'];
    $pricefinal = $data['priceFinal'];
    $pricebefore = $data['priceBefore'];
$centralStone = $data['centralStone'];


    $query = "
    UPDATE products SET 
    name = '$name',
    shortDesc = '$shortDesc',
    stonesWeight = '$stonesWeight',
    stonesClarity = '$stonesClarity',
    stonesColor = '$stonesColor',
    stonesNum = '$stonesNum',
    description = '$description',
    pricebefore = '$pricebefore',
    pricefinal = '$pricefinal',
    center_diamond = '$centralStone'
    WHERE id LIKE '$id'
    ";

    $mysqli->query($query);

    



}


function getProducts($mysqli) {

$products = array();

$query = "
SELECT * FROM products ORDER BY id DESC
";

$html .= "";

$queryExec = $mysqli->query($query);
$result = $queryExec->fetch_all(MYSQLI_ASSOC);
$numberOfResults = $queryExec->num_rows;

for ($i=0;$i<$numberOfResults;$i++) {

$productId = $result[$i]["id"];
$name = $result[$i]["name"];
$category = $result[$i]["category"];
$shortDesc = $result[$i]["shortDesc"];
$colors = $result[$i]["colors"];
$sizes = $result[$i]["sizes"];
$pricebefore = $result[$i]["pricebefore"];
$pricefinal = $result[$i]["pricefinal"];
$description = $result[$i]["description"];
$subcat = $result[$i]["subcat"];
$featured = $result[$i]["featured"];

$queryImg = "SELECT * FROM files WHERE product = '$productId'";
$queryExecImg = $mysqli->query($queryImg);
$resultImg = $queryExecImg->fetch_all(MYSQLI_ASSOC);

$img = $resultImg[0][url];

$product = array(
"productId" => $productId,
"name" => $name,
"category" => $category,
"shortDesc" => $shortDesc,
"colors" => $colors,
"sizes" => $sizes,
"pricebefore" => $pricebefore,
"pricefinal" => $pricefinal,
"description" => $description,
"subcat" => $subcat,
"images" => $img,
);

array_push($products,$product);

if ($featured == 0 || $featured == '') {
$featured_status = "
<svg class='table-data__table-notPublished-icon publishAction' status='$featured' productId='$productId'> 
<use xlink:href='assets/img/sprites.svg#icon-cross'></use>             
</svg> 
";
}

if ($featured == 1) {
$featured_status = "
<svg class='table-data__table-published-icon publishAction' status='$featured' productId='$productId'> 
<use xlink:href='assets/img/sprites.svg#icon-check'></use>             
</svg> 
";

}

$html .= "

<div class='table-data__table-row langD'>
<div class='table-data__table-cell table-data__table-cell--hash'>
$productId </div>
<div class='table-data__table-cell table-data__table-cell--name'>
$name </div>
<div class='table-data__table-cell '>
$category</div>
<div class='table-data__table-cell'>$subcat </div>
<div class='table-data__table-cell'>$pricefinal </div>
<div class='table-data__table-cell'><img src='$img' height='70' /> </div>
<div class='table-data__table-cell'>
<div class='table-data__table-icons-box-button '> 


$featured_status

</div> 
</div>
<div class='table-data__table-cell table-data__table-cell--actions'>
<a class='padding-5-lr' href='edit_product.html?product=$productId'> 
<button  class='table-data__table-icons-box-button' >        
<svg class='table-data__table-edit-icon deleteLang' hotelid=''+returnedData[i].hotelId+'' parent=''+transParent+'' lang=''+languageId+''>           
<use xlink:href='assets/img/sprites.svg#icon-edit'></use>     
</svg>   
</button> </a> 
<a class='padding-5-lr' href='add_translation.html?hotel='+trans_id+'&lang='+languageId+'&parent='+transParent+''> 
<button  class='table-data__table-icons-box-button' >      
<svg class='table-data__table-translate-icon' hotelid=''+returnedData[i].hotelId+''>
<use xlink:href='assets/img/sprites.svg#icon-globe'></use>
</svg> 
</button> 
</a>  
<button  class='table-data__table-icons-box-button' >       
<svg class='table-data__table-delete-icon deleteHotel' hotelid=''+returnedData[i].trans_id+'' parent=''+transParent+'' lang=''+languageId+''>            
<use xlink:href='assets/img/sprites.svg#icon-cross'></use>     
</svg> 
</button>
</div>
</div>


";



}


// $this->json($html);
echo $html;
}






// ********  Publish Hotels **********

function featureProduct($productId,$status,$mysqli) {

if($status == 0) {
$published = 1;
}

if($status == 1) {
$published = 0;
}

$query = "
UPDATE products SET 
featured = '$published' 
WHERE id LIKE '$productId'
";

$mysqli->query($query);


$resultJson = array(
"productId" => $productId,

"published" => $published,
"status" => $status,
"result" => "success",
);


$this->json($resultJson);

}



function getProduct($productId,$mysqli) {

$query = "
SELECT * FROM products WHERE id LIKE '$productId'
";


$queryExec = $mysqli->query($query);
$result = $queryExec->fetch_all(MYSQLI_ASSOC);


$productName =  $result[0]["name"];
$productId = $result[0]["id"];
$category = $result[0]["category"];
$shortDesc = $result[0]["shortDesc"];
$colors = explode(',',$result[0]["colors"]);
$sizes = explode(',',$result[0]["sizes"]);
$pricebefore = $result[0]["pricebefore"];
$pricefinal = $result[0]["pricefinal"];
$description = $result[0]["description"];
$subcat = $result[0]["subcat"];
$stonesNum = $result[0]["stonesNum"];
$stonesWeight = $result[0]["stonesWeight"];
$stonesClarity = $result[0]["stonesClarity"];
$stonesColor = $result[0]["stonesColor"];
$centralStoneDB = floatval($result[0]["center_diamond"]);

if ($centralStoneDB == "" || $centralStoneDB == 0) {

    $centralStone = "ללא";
}

if ($centralStoneDB > 0.01) {
    $centralStone = $centralStoneDB . " " . "קראט";
}

$queryImg = "SELECT * FROM files WHERE product = '$productId'";
$queryExecImg = $mysqli->query($queryImg);
$resultImg = $queryExecImg->fetch_all(MYSQLI_ASSOC);
$numberOfResults = $queryExecImg->num_rows;

$imagesString .= "";

for ($i=0;$i<$numberOfResults;$i++) {

$imgCur = $resultImg[$i]['url'];

$imagesString .= "
<li>
<img alt='Image' src='$imgCur' />
</li>
";

}

$img = $resultImg[0][url];

$colors1 .= "";

for ($k=0;$k<count($colors);$k++) {

$colors1 .= "
<option value='$colors[$k]'> $colors[$k] </option>
";

}


$html = "

<section class=''>
<div class='container'>
<div class='row rtl text-right'>


<div class='col-sm-7 col-md-7 col-md-offset-1 col-md-push-5'>
<div class='slider border--round boxed--border' data-paging='true' data-arrows='true'>
<ul class='slides'>
$imagesString
</ul>
</div>
</div>

<div class='col-sm-5 col-md-4 col-md-pull-7'>
<h2 class='osh'> $productName </h2>
<div class='text-block'>
<span class='h4 type--strikethrough inline-block'>$pricebefore ₪</span>
<span class='h4 inline-block'>$pricefinal ₪</span>
</div>
<p>
$description
</p>


<div class='col-sm-12 padding-10 '>
<div class='input-select'>
<select name='finish' id='goldType'>
<option selected='' value='Default'>בחרי צבע</option>
$colors1
</select>
</div>
</div>

<div class='col-sm-6 col-md-12 m-b-80 m-t-10'>

<button type='submit' class='btn btn--primary osh fs-18' id='addToCart'>

<span class='addToCart'> הוסף לעגלת הקניות </span>

<div class='spinner1 hide'>
<div class='bounce1'></div>
<div class='bounce2'></div>
<div class='bounce3'></div>
</div>


</button>

</div>


<div class='col-sm-6 col-md-12 m-b-80 m-t-10'>

<ul class='accordion accordion-2 accordion--oneopen'>
<li class='active'>
<div class='accordion__title rtl osh'>
    <span class='h5 rtl osh'>פרטי היהלומים</span>
</div>
<div class='accordion__content' rtl osh>
    <ul class='bullets full-width'>

    <li>
    <span>יהלום מרכזי: $centralStone 
    
    </span>
</li>
        <li>
            <span>כמות יהלומים: $stonesNum</span>
        </li>
        <li>
            <span>משקל יהלומים: $stonesWeight קראט</span>
        </li>
        <li>
            <span>דרגת ניקיון: $stonesClarity</span>
        </li>
        <li>
            <span>צבע היהלומים: $stonesColor </span>
        </li>
    </ul>
</div>
</li>
<li >
<div class='accordion__title'>
    <span class='h5 rtl osh'>ההזמנה כוללת</span>
</div>
<div class='accordion__content rtl osh'>
    <ul class='bullets full-width'>
        
<li>
אריזה מהודרת

</li>

<li>
תעודת גימולוגית

</li>

<li>
אחריות לכל החיים

</li>

<li>
30 יום החזר כספי מלא

</li>

<li>
תיקון מידה ללא עלות

</li>

<li>
משלוח אקספרס מאובטח חינם

</li>

    </ul>
</div>
</li>
<li>
<div class='accordion__title'>
    <span class='h5'>אפשרויות תשלום ומשלוח</span>
</div>
<div class='accordion__content'>
    <p>
    ניתן לשלם בכל סוגי כרטיסי האשראי
    <br />
    עד 12 תשלומים ללא ריבית.
    5% הנחה למשלמים במזומן.                        </p>
</div>
</li>
</ul>
<!--end accordion-->
</div>


</div>



<!--end slider-->











<!--end of row-->
<!--end of container-->


";


$data = array(
    "productInfo" => $html,
    "productName" => $productName,
    "shortDesc" => $shortDesc,
    "colors" => $colors,
    "sizes" => $sizes,
    "pricebefore" => $pricebefore,
    "pricefinal" => $pricefinal,
    "description" => $description,
    "stonesNum" => $stonesNum,
    "stonesWeight" => $stonesWeight,
    "stonesClarity" => $stonesClarity,
    "stonesColor" => $stonesColor,
    "centralStoneDB" => $centralStoneDB,
    );
    
    $this->json($data);


}


function getProductByCat($catId,$mysqli) {


$queryCat = "
SELECT * FROM categories WHERE id LIKE '$catId'
";

$queryCatExec = $mysqli->query($queryCat);
$resultCat = $queryCatExec->fetch_all(MYSQLI_ASSOC);

$cat_name = $resultCat[0]["cat_name"];
$cat_img = $resultCat[0]["cat_img"];
$cat_head = $resultCat[0]["cat_head"];
$cat_text = $resultCat[0]["cat_text"];


$heading = "
<div class='container'>
<div class='row'>
<div class='col-sm-12'>
<div class='height-30 imagebg border--round' data-overlay='4'>
<div class='background-image-holder' style='background: url($cat_img); opacity: 1;'>
<img alt='background' src='$cat_img'>
</div>
<div class='pos-vertical-center col-sm-6 col-md-5 col-md-offset-1 flr rtl text-right' style='margin-right: 8.3333%;'>
<h2 class='Heebo rtl'>$cat_name</h2>
<p class='lead osh rtl'>
$cat_text
</p>
</div>

<div class='col-md-5 col-md-offset-1 flr'></div>
</div>
</div>
</div>
<!--end of row-->
</div>

";

$query = "
SELECT * FROM products WHERE category LIKE '$catId' ORDER BY id DESC
";


$html .= "";




$queryExec = $mysqli->query($query);
$result = $queryExec->fetch_all(MYSQLI_ASSOC);
$numberOfResults = $queryExec->num_rows;

for ($i=0;$i<$numberOfResults;$i++) {

$productId = $result[$i]["id"];
$name = $result[$i]["name"];
$category = $result[$i]["category"];
$shortDesc = $result[$i]["shortDesc"];
$colors = $result[$i]["colors"];
$sizes = $result[$i]["sizes"];
$pricebefore = $result[$i]["pricebefore"];
$pricefinal = $result[$i]["pricefinal"];
$description = $result[$i]["description"];
$subcat = $result[$i]["subcat"];
$featured = $result[$i]["featured"];

$queryImg = "SELECT * FROM files WHERE product = '$productId'";
$queryExecImg = $mysqli->query($queryImg);
$resultImg = $queryExecImg->fetch_all(MYSQLI_ASSOC);

$img = $resultImg[0][url];



$html .= "

<div class='masonry__item col-sm-4' data-masonry-filter='Computing'>
<div class='product'>
<a href='#'>
<img class='product-image'  alt='Image' src='$img' />
</a>
<a class='block' href='product.html?id=$productId'>
<div class='rtl text-center'>
<h5 class='osh rtl'> $name</h5>
<br />
<span> $shortDesc </span>
</div>
<div class='text-center rtl osh'>
<span class='h4 inline-block type--strikethrough'>$pricebefore ₪ </span>
<span class='h4 inline-block'>$pricefinal ₪</span>
</div>
</a>
</div>
</div>
";


}

$data = array(
"products" => $html,
"heading" => $heading,
"cat_head" => $cat_head,
);

$this->json($data);

}




function getFeaturedProducts($mysqli) {



    $query = "
    SELECT * FROM products WHERE featured LIKE '1' LIMIT 6
    ";
    
    
    $html .= "";
    
    
    
    
    $queryExec = $mysqli->query($query);
    $result = $queryExec->fetch_all(MYSQLI_ASSOC);
    $numberOfResults = $queryExec->num_rows;
    
    for ($i=0;$i<$numberOfResults;$i++) {
    
    $productId = $result[$i]["id"];
    $name = $result[$i]["name"];
    $category = $result[$i]["category"];
    $shortDesc = $result[$i]["shortDesc"];
    $colors = $result[$i]["colors"];
    $sizes = $result[$i]["sizes"];
    $pricebefore = $result[$i]["pricebefore"];
    $pricefinal = $result[$i]["pricefinal"];
    $description = $result[$i]["description"];
    $subcat = $result[$i]["subcat"];
    $featured = $result[$i]["featured"];
    
    $queryImg = "SELECT * FROM files WHERE product = '$productId'";
    $queryExecImg = $mysqli->query($queryImg);
    $resultImg = $queryExecImg->fetch_all(MYSQLI_ASSOC);
    
    $img = $resultImg[0][url];
    
    
    
    $html .= "
    
    <div class='masonry__item col-sm-4' data-masonry-filter='Computing'>
    <div class='product'>
    <a href='#'>
    <img class='product-image'  alt='Image' src='$img' />
    </a>
    <a class='block' href='product.html?id=$productId'>
    <div class='rtl text-center'>
    <h5 class='osh rtl'> $name</h5>
    <br />
    <span> $shortDesc </span>
    </div>
    <div class='text-center rtl osh'>
    <span class='h4 inline-block type--strikethrough'>$pricebefore ₪ </span>
    <span class='h4 inline-block'>$pricefinal ₪</span>
    </div>
    </a>
    </div>
    </div>
    ";
    
    
    }
    
    $data = array(
    "products" => $html,
    );
    
    $this->json($data);
    
    }







function addToCart($productId,$goldType,$mysqli) {
// echo "product" . $productId . "added with gold type" . " " . $goldType;

$_SESSION['cart'][] = array(
    "id" => $productId,
    "color" => $goldType,
);





print_r($_SESSION['cart']);

}



function getCartItems($mysqli) {

    $cart = $_SESSION['cart'];

// print_r($cart[2]);

    $mysql_items = array();
    
    $cartItemsNum =  count($cart);

    
    // // // ** GET ITEMS ID'S AND CREATE ARRAY FOR MYSQL ** //
    
    for ($i=0;$i<$cartItemsNum;$i++) {
    
    // $itemToArray = explode(",",$cart[$i]);
    
    $itemId = $cart[$i]["id"];
    // $itemColor = $itemToArray[1];
    // echo $itemId . "<br />";
    
    array_push($mysql_items,$itemId);
    
    }

    // // // ** GET ITEMS ID'S AND CREATE ARRAY FOR MYSQL ** //
    
    
    $html .= "";
    
    $idsMysql = implode(",",$mysql_items);


    
    
    $prices_array_to_merge = array();
    
    $query = "
    SELECT * FROM products WHERE id IN ($idsMysql) 
    ";
    
    
    $queryExec = $mysqli->query($query);
    $result = $queryExec->fetch_all(MYSQLI_ASSOC);
    $numberOfResults = $queryExec->num_rows;
    
    
    for ($k=0;$k<$numberOfResults;$k++) {
    
    
        $productId = $result[$k]["id"];
        $name = $result[$k]["name"];
        $shortDesc = $result[$k]["shortDesc"];
        $pricefinal = $result[$k]["pricefinal"] * 0.83;
    
        $itemToArray2 = explode(",",$cart[$k]);
    
    
        $queryImg = "SELECT * FROM files WHERE product = '$productId'";
    $queryExecImg = $mysqli->query($queryImg);
    $resultImg = $queryExecImg->fetch_all(MYSQLI_ASSOC);
    
    $img = $resultImg[0][url];
    
        // echo $name . " " . $productId . " " . $itemToArray2[1] . " " $img;
        // echo "*******";
    
        $html .= "
        
    
        <div class='col-sm-4'>
        <div class='product-1'>
            <div class='product__controls'>
          
                <div class='col-xs-3 text-right'>
                    <button class='checkmark checkmark--cross bg--error removeFromCart' productid='$productId'></button>
                </div>
            </div>
            <img alt='Image' src='$img' productid='$productId' height='200'/>
            <div>
                    <h5 class='osh m-b-0'>$name</h5>
                    <span>$shortDesc</span>
            </div>
            <div>
                <span class='h4 inline-block m-b-0'>$pricefinal ₪ </span>
            </div>
        </div>
    </div>
    
        
        ";
    
    
    
    array_push($prices_array_to_merge,$pricefinal); 
    
    }
    
    
    
    
    $json = array(
      "html" => $html,
      "total_price" => array_sum($prices_array_to_merge),
    );
    
    
    $this->json($json);


}




function removeFromCart($id,$mysqli) {

    // echo $id;

    $arrayToSearch = $_SESSION['cart'];
    
    $count = count($arrayToSearch);

    for ($i=0;$i<$count;$i++) {

        if ($arrayToSearch[$i]["id"] == $id)   {
         unset($arrayToSearch[$i]);
        }

    
    }

    print_r($arrayToSearch);
    $arrayToSearch = array_values($arrayToSearch);

    $_SESSION['cart'] = $arrayToSearch;








}


function checkout($data,$mysqli) {

    $cart = serialize($_SESSION['cart']);
    $data1 = serialize($data);
    $date = date('m/d/Y h:i:s a', time());





  $query = "
  INSERT INTO transactions
  (date,data,cart)
  VALUES
  ('$date','$data1','$cart')
  ";
  
  $queryExec = $mysqli->query($query);



// $query = "SELECT cart FROM transactions WHERE id LIKE '4'";

// $queryExec = $mysqli->query($query);
// $result = $queryExec->fetch_all(MYSQLI_ASSOC);

// // print_r($result);

// print_r(unserialize($result[0][cart]));

echo "200";

}



function json($data) {
echo json_encode($data);
}





}










class Files {

function saveFiles($data,$mysqli) {

$images = array();

$numOfImages = count($data);

for($i=0;$i<$numOfImages;$i++) {

$image = array(
"imgURL" => $data[$i]["url"],
"imgName" => $data[$i]["text"],

);


$url = $data[$i]["url"];
$name = $data[$i]["text"];

$query = "INSERT into files (url,caption) VALUES ('$url','$name')";
$mysqli->query($query);


array_push($images,$image);

}



$this->json($images);


}






function json($data) {
echo json_encode($data);
}

}






// End of Features ***** 





// ******** End Save Hotel **********


// ********  Get Hotels **********


// $features,$name,$area,$city,$location,$tripadvisor,$description,$tags,$address,$images,$imagesNew,$parent,$hotelId,$lang

// // *** GET Translations ***

// $queryTranslation = "SELECT * FROM hotels_translations WHERE hotel_parent LIKE '$hotelId'";
// $resultTranslation = mysql_query($queryTranslation);
// $translationNum = mysql_num_rows($resultTranslation);

// for ($k=0;$k<$translationNum;$k++) {
// $transId = mysql_result($resultTranslation,$k,"id");
// $transName = mysql_result($resultTranslation,$k,"hotel_name");
// $transAddress = mysql_result($resultTranslation,$k,"hotel_address");
// $transParent = mysql_result($resultTranslation,$k,"hotel_parent");
// $hotel_description = mysql_result($resultTranslation,$k,"hotel_description");
// $hotel_language = mysql_result($resultTranslation,$k,"hotel_language");
// $hotel_published = mysql_result($resultTranslation,$k,"published");
?>
