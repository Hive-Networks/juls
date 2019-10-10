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

loaderOff();

}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});

};




function getFeatures() {

    loaderOn();
    
    var q = "getFeatures";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q},
    success: function(data){
    
    
    var returnedData = JSON.parse(data);
    
    console.log(data);
    
    for (var i=0;i<returnedData.length;++i)
    {
    $("#featureSelect").append('<option value="'+returnedData[i].featureParent+'"> '+returnedData[i].feature_name+'</option');

    $("#featureUpdate").after('<div id="'+returnedData[i].cityParent +'" class="table-data__table-row langD"> <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].featureParent+'</div>  <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].feature_name+'</div>  <div class="table-data__table-cell iconSize"><img src="'+returnedData[i].featureIcon+'" /></div> <div class="table-data__table-cell">'+returnedData[i].featureLanguage+'</div>  <div class="table-data__table-cell table-data__table-cell--actions">   <div class="table-data__table-icons-box">   <button  class="table-data__table-icons-box-button" >   <svg class="table-data__table-delete-icon featureDelete" featureid="'+returnedData[i].featureID+'" parentid="'+returnedData[i].featureParent+'">    <use xlink:href="assets/img/sprites.svg#icon-cross"></use> </svg> </button>    </div>    </div>     </div>');
    }
    
    loaderOff();


    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });
    
    };




$(document).ready(function() { 
languageSelect();
getFeatures();






$("#saveFeature").on("click",function() {

    loaderOn();

var featureName = $("#featureName").val();
var featureIcon = $("#featureIcon").val();

var q = "saveFeature";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,featureName:featureName,featureIcon:featureIcon},
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



$("#saveTranslation").on("click",function() {

    loaderOn();
    
    var featureName = $("#featureTranslation").val();
    var featureParent = $("#featureSelect").val();
    var Language = $("#langSelect").val();
    
    var q = "saveTranslationFeature";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q,featureName:featureName,featureParent:featureParent,Language:Language},
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





    $(document).on("click",".featureDelete",  function() { 


        var featureid = $(this).attr("featureid");
        var parentid = $(this).attr("parentid");
        
        
        
        
        if (confirm("Are you sure you want to delete?") == true) {
        
            loaderOn();
        
            
            var q = "deleteFeature";
        
        
        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "../API/",  //file name
        data: {q:q,featureid:featureid},
        success: function(data){
        
        
        var returnedData = JSON.parse(data);
        
        console.log(data);
        
        
        loaderOff();
        
        $(".langD").remove();
        
        getFeatures();
        
        
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





