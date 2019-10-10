// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').focus()
//   })

function getLanguages() {

loaderOn();

var q = "getLanguages";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q},
success: function(data){

    console.log(data);

var returnedData = JSON.parse(data);

for (var i=0;i<returnedData.length;++i)
{

console.log(returnedData[i].langPublished);

if (returnedData[i].langPublished == '1') {
$("#langUpdate").after('<div id="'+returnedData[i].langID+'" class="table-data__table-row langD"> <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].langID+'</div> <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].langName+'</div> <div class="table-data__table-cell">'+returnedData[i].langISO+'</div> <div class="table-data__table-cell">   <div class="table-data__table-icons-box-button "> <svg class="table-data__table-published-icon publishAction" status="'+returnedData[i].langPublished+'" langiso="'+returnedData[i].langID+'">  <use xlink:href="assets/img/sprites.svg#icon-check"></use>              </svg>  </div> </div><div class="table-data__table-cell table-data__table-cell--actions">    <div class="table-data__table-icons-box">               <a href="#/dashboard/update/language/3" class="table-data__table-icons-box-button">                                      </svg>        </a>      <button  class="table-data__table-icons-box-button" >          <svg class="table-data__table-delete-icon deleteLang" langid="'+returnedData[i].langID+'">              <use xlink:href="assets/img/sprites.svg#icon-cross"></use>          </svg>       </button>    </div> </div> </div>');
}

if (returnedData[i].langPublished == '0') {
$("#langUpdate").after('<div id="'+returnedData[i].langID+'" class="table-data__table-row langD"> <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].langID+'</div> <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].langName+'</div> <div class="table-data__table-cell">'+returnedData[i].langISO+'</div> <div class="table-data__table-cell">   <div class="table-data__table-icons-box-button"> <svg class="table-data__table-notPublished-icon publishAction" status="'+returnedData[i].langPublished+'" langiso="'+returnedData[i].langID+'">  <use xlink:href="assets/img/sprites.svg#icon-cross"></use>              </svg>  </div> </div><div class="table-data__table-cell table-data__table-cell--actions">    <div class="table-data__table-icons-box">               <a href="#/dashboard/update/language/3" class="table-data__table-icons-box-button">                                      </svg>        </a>      <button  class="table-data__table-icons-box-button">          <svg class="table-data__table-delete-icon deleteLang" langid="'+returnedData[i].langID+'">              <use xlink:href="assets/img/sprites.svg#icon-cross"></use>          </svg>       </button>    </div> </div> </div>');
}

}








}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};



$(document).ready(function() { 


$("#saveLang").on("click",function() {

loaderOn();

var langName = $("#langName").val();
var langISO = $("#langISO").val();

var q = "createLang";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,langName:langName,langISO:langISO},
success: function(data){


var returnedData = JSON.parse(data);

console.log(data);

$("#closeModal").click();

loaderOff();

$(".langD").remove();

getLanguages();


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});



});


$(document).on("click",".publishAction",  function() { 

loaderOn();

var ISO = $(this).attr("langiso");
var status = $(this).attr("status");


var q = "publishLang";


$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,langISO:ISO,status:status},
success: function(data){


var returnedData = JSON.parse(data);

console.log(data);


loaderOff();

$(".langD").remove();

getLanguages();


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


});



$(document).on("click",".deleteLang",  function() { 



var ID = $(this).attr("langid");
console.log(ID);

if (confirm("Are you sure you want to delete?") == true) {

    loaderOn();

    
    var q = "deleteLang";


$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,langid:ID},
success: function(data){


var returnedData = JSON.parse(data);

console.log(data);


loaderOff();

$(".langD").remove();

getLanguages();


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







