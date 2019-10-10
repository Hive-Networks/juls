function getAreas() {

loaderOn();

var q = "getAreas";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q},
success: function(data){


var returnedData = JSON.parse(data);

console.log(returnedData);

for (var i=0;i<returnedData.length;++i)
{
$(".areaSelect").append('<option value="'+returnedData[i].areaParent+'"> '+returnedData[i].areaName+'</option');
}

loaderOff();


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};



function getCities() {


var q = "getCities";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q},
success: function(data){


var returnedData = JSON.parse(data);

console.log(returnedData);

for (var i=0;i<returnedData.length;++i)
{
$("#citySelect").append('<option value="'+returnedData[i].cityParent+'"> '+returnedData[i].cityName+'</option');

$("#cityUpdate").after('<div id="'+returnedData[i].cityParent +'" class="table-data__table-row langD"> <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].cityParent+'</div>  <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].cityName+'</div> <div class="table-data__table-cell">'+returnedData[i].cityLanguageName+'</div>  <div class="table-data__table-cell">'+returnedData[i].cityAreaName+'</div>  <div class="table-data__table-cell table-data__table-cell--actions">   <div class="table-data__table-icons-box">  <button  class="table-data__table-icons-box-button" >  <svg class="table-data__table-delete-icon cityDelete" cityid="'+returnedData[i].cityID+'" parentid="'+returnedData[i].cityParent+'" citylang="'+returnedData[i].cityLanguage+'">  <use xlink:href="assets/img/sprites.svg#icon-cross"></use>  </svg>  </button> </div> </div> </div>');

}



}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};






function languageSelect() {

loaderOn();

var q = "getLanguages";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q},
success: function(data){


var returnedData = JSON.parse(data);

console.log(returnedData);

for (var i=0;i<returnedData.length;++i)
{
$("#langSelect").append('<option value="'+returnedData[i].langID+'"> '+returnedData[i].langName+'</option');
}


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};


$(document).ready(function() { 


getAreas();
languageSelect();

getCities();



$("#saveCity").on("click",function() {

loaderOn();

var cityName = $("#cityName").val();
var areaSelect = $("#areaSelect").val();



var q = "saveCity";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,cityName:cityName,areaSelect:areaSelect},
success: function(data){


var returnedData = JSON.parse(data);

console.log(returnedData);

console.log(data);


loaderOff();




}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


});





$("#saveTranslation").on("click",function() {

loaderOn();

var cityName = $("#cityNameTranslation").val();
var parentCity = $("#citySelect").val();
var Language = $("#langSelect").val();

var q = "saveTranslationCity";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,cityName:cityName,parentCity:parentCity,Language:Language},
success: function(data){


// var returnedData = JSON.parse(data);

// console.log(returnedData);

console.log(data);


loaderOff();




}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


});







$(document).on("click",".catDelete",  function() { 


var cityid = $(this).attr("cityid");
var parentid = $(this).attr("parentid");
var citylang = $(this).attr("citylang");




if (confirm("Are you sure you want to delete?") == true) {

    
    console.log();
    var q = "deleteCity";


$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,cityid:cityid,parentid:parentid,citylang:citylang},
success: function(data){


// var returnedData = JSON.parse(data);

$(".langD").remove();

getCities();



}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


}

else {
    // console.log("dont delete it");   
}





});





});




