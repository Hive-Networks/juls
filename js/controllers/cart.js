$(document).ready(function() { 



    getCartItems();

});



function getCartItems() {

    var q = "getCartItems";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "API/",  //file name
    data: {q:q},
    success: function(data){


        var json = JSON.parse(data);
        var html = json.html;

        $(".productsInsertion").empty();
        $(".productsInsertion").append(html);

        var vat_calc = json.total_price * 1.17;
        var vat = vat_calc - json.total_price;

       $(".vat").text("₪ "+vat.toFixed(0));
       $(".totalPrice").text("₪ "+json.total_price.toFixed(0));
       $(".totalWithVat").text("₪ "+vat_calc.toFixed(0));

    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });

}


$(document).on("click",".removeFromCart",  function() { 


var id = $(this).attr("productId");

var q = "removeFromCart";

$.ajax({
type: "POST",
url: "API/",
data: {q:q,id:id},
success: function(data) {

    console.log(data);

    getCartItems();

},

failure: function() {
    console.log('oops, something went really wrong');

}    
});


});