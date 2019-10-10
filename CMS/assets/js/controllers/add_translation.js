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

    languageSelect();


    $('#editor').trumbowyg({
    lang: 'he',
    });


    $("#saveTranslation").on("click",function() {

    var currentURL = document.URL;
    var params = currentURL.extract();
    var hotelId = params.hotel;
    var parent = params.parent;
    var selectedLanguage = $("#langSelect").val();


    var q = "saveHotelTranslation";

    var name = $("#hotelName").val();
    var description = $("#editor").html();
    var address = $("#address").val();




    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q,name:name,description:description,address:address,parent:parent,selectedLanguage:selectedLanguage},
    success: function(data){



    console.log(data);

    $("#saveTranslation").html("נשמר בהצלחה");


    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });


    });
    
    });