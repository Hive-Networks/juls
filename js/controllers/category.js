$(document).ready(function() {

    var currentURL = document.URL;
    var params = currentURL.extract();
    
  var ids = params.id;

  if (isNaN(ids)) {

    id = ids.replace(/[^a-zA-Z0-9]/g, '');
  }


  if (!isNaN(ids)) {


    id = ids;
  }


    
    getCategory(id);
    
    });




    function getCategory(id) {

       
        
        var q = "getProductsbyCat";
        
        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "API/",  //file name
        data: {q:q,id:id},
        success: function(data){
        
            var json = JSON.parse(data);
            var products = json.products;
            var heading = json.heading;
    
    //  console.log(products);
     
     $(".headingInsertion").append(heading);
    $(".productsInsertion").append(products);
$(".catHeadLine").text(json.cat_head);




        
        
        }, 
        failure: function(){
        alert('Oops, Something Went Really Wrong.');
        }
        });
    
    }
        