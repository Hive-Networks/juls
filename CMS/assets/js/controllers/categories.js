



$(document).ready(function() { 

    getCats();

$("#saveCat").on("click",function() {

loaderOn();

var catName = $("#areaName").val();
// var areaLang = $("#langSelect").val();

console.log(areaName);

var q = "createCategory";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,catName:catName},
success: function(data){


loaderOff();


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});


});
});




function getCats() {

    loaderOn();
    
    var q = "getCategories";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q},
    success: function(data){
    
    
    var returnedData = JSON.parse(data);
    


    $("#areaUpdate").after(returnedData);

    loaderOff();
    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });
    
    };



    $(document).on("click",".catDelete",  function() { 

        var catid = $(this).attr("catid");
        console.log(catid);



        if (confirm("Are you sure you want to delete?") == true) {

    
            console.log();
            var q = "deleteCategory";
        
        
        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "../API/",  //file name
        data: {q:q,catid:catid},
        success: function(data){
        
        
        // var returnedData = JSON.parse(data);
        getCats();
        $(".langD").remove();
        
      
        
        
        
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



