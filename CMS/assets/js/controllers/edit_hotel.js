

$(document).ready(function() {

var currentURL = document.URL;
var params = currentURL.extract();




$('#editor').trumbowyg({
lang: 'he',
});

id = params.hotel;
getHotel(id);



$(document).on("click",".imageDelete",  function() { 

var imagesArray = $(".box").attr("hotlesarray");
var index = $(this).attr("imageindex");
// var indexNum = parseInt(index);
var arra = JSON.parse(imagesArray);

arra.splice(index, 1);
console.log(arra); // [1, 2, 4, 5]

$(".box").attr("hotlesarray","["+arra+"]");

$(this).hide();

// var array = [1, 2, 3, 4, 5];
// imagesArray.splice(2, 1);
// console.log(array); // [1, 2, 4, 5]

});









});


function getHotel(id) {

loaderOn();

var q = "getHotel";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,id:id},
success: function(data){



var hotel = JSON.parse(data);

console.log(hotel);

$("#location").val(hotel.hotel_location_url);
$("#hotelName").val(hotel.transName);
$("#areaSelect").val(hotel.hotel_area);
$("#citySelect").val(hotel.hotel_city);
$("#editor").html(hotel.hotel_description);
$("#address").val(hotel.transAddress);

var imageURL = hotel.hotel_images;

$('.tags2 > input').tagsinput('add', hotel.hotel_features);
$('.tags1 > input').tagsinput('add', hotel.hotel_tags);

$(".box").attr("hotlesArray",hotel.hotel_images_array);

console.log($(".box").attr("hotlesArray"));

var imgNum = imageURL.length;

for (var k=0;k<imgNum;++k) {
$(".box").append('<img class="imageDelete" src="'+imageURL[k]+'" height="150" imageIndex="'+k+'" />');
}




}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};


// "id" => $id,
// "transName" => $transName,
// "transAddress" => $transAddress,
// "transParent" => $transParent,
// "hotel_description" =>$hotel_description,
// "hotel_language" => $hotel_language,
// "hotel_published" => $hotel_published,
// "hotel_area" => $hotel_area,
// "hotel_city" => $hotel_city,
// "hotel_tags" => $hotel_tags,
// "hotel_features" => $hotel_features,
// "hotel_images" => $hotel_images,
// "hotel_location_url" => $hotel_location_url,
// );





// create images array 



// console.log("*************");
// console.log(features);
// console.log(name);
// console.log(area);
// console.log(city);
// console.log(location);
// console.log(tripadvisor);
// console.log(description);
// console.log(tags);
// console.log(address);
// console.log(images);
// console.log("*************");


$(document).ready(function() { 


$("#saveHotelEdit").on("click",function() {

var currentURL = document.URL;
var params = currentURL.extract();
var hotelId = params.hotel;
var parent = params.parent;
var lang = params.lang;

var features = $(".tags2 > input").val();
var name = $("#hotelName").val();
var area = $("#areaSelect").val();
var city = $("#citySelect").val();
var location = $("#location").val();
var tripadvisor = $("#tripAdvisor").val();
var description = $("#editor").html();
var tags = $(".tags1 > input").val();
var address = $("#address").val();
var imagesRaw = $(".box").attr("hotlesarray");
var images = JSON.parse(imagesRaw);
// var features = JSON.parse(featuresRaw);
// var tags = JSON.parse(tagsRaw);

// ***** NEW IMAGES HANDLE ***** 
var imagesNew = [];
var url;

$.each($('.imgCaption'), function(name) {
var data = $(this).val();
var img = $(this).attr("imgUrl");
var obj = {};
obj["url"] = img;
obj["text"] = name;
imagesNew.push(obj);

});
// ***** NEW IMAGES HANDLE END ***** 



// console.log("*************");
// console.log(name);
// console.log(area);
// console.log(city);
// console.log(location);
// console.log(description);
// console.log(tags);
// console.log(features);
// console.log(address);
// console.log(images);
// console.log(imagesNew);

// console.log("*************");

var q = "updateHotel";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,features:features,name:name,area:area,city:city,location:location,tripadvisor:tripadvisor,description:description,tags:tags,address:address,images:images,imagesNew:imagesNew,parent:parent,hotelId:hotelId,lang:lang},
success: function(data){
   

console.log(data);


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


});


});