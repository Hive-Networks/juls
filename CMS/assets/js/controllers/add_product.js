



function getCats() {

    loaderOn();
    
    var q = "getCategoriesJSON";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q},
    success: function(data){
    
    
    var returnedData = JSON.parse(data);
    

    console.log(returnedData);

    for (var i=0;i<returnedData.length;++i)
{
$("#categorySelect").append('<option value="'+returnedData[i].catId+'"> '+returnedData[i].catName+'</option');
}

   
loaderOff();
    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });

}
    

















Dropzone.autoDiscover = false;












$(document).ready(function(){

    getCats();

$('#editor').trumbowyg({
    lang: 'he',
    });

$("#saveProduct").on("click",function() {

var name = $("#productName").val();
var categorySelect = $("#categorySelect").val();
var secondCategorySelect = $("#secondCategorySelect").val();
var shortDesc = $("#shortDesc").val();
var colors = $("#colors").val();
var sizes = $("#sizes").val();
var priceBefore = $("#priceBefore").val();
var priceFinal = $("#priceFinal").val();
var description = $("#editor").html();
var stonesNum = $("#stonesNum").val();
var stonesWeight = $("#stonesWeight").val();
var stonesClarity = $("#stonesClarity").val();
var stonesColor = $("#stonesColor").val();


// create images array 
var images = [];
var url;

$.each($('.imgCaption'), function(name) {
var data = $(this).val();
var img = $(this).attr("imgUrl");
var obj = {};
obj["url"] = img;
obj["text"] = name;
images.push(obj);

});
// create images array 



// console.log("*************");
// console.log(categorySelect);
// console.log(secondCategorySelect);
// console.log(shortDesc);
// console.log(colors);
// console.log(sizes);
// console.log(priceBefore);
console.log(description);
console.log(priceFinal);
// console.log(images);
// console.log("*************");






var q = "saveProduct";


$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,name:name,categorySelect:categorySelect,secondCategorySelect:secondCategorySelect,shortDesc:shortDesc,colors:colors,sizes:sizes,priceBefore:priceBefore,description:description,priceFinal:priceFinal,images:images,stonesNum:stonesNum,stonesWeight:stonesWeight,stonesClarity:stonesClarity,stonesColor:stonesColor},
success: function(data){
   
    loaderOff();

console.log(data);


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});




    });


});