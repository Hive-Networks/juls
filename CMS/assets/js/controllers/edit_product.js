$(document).ready(function() { 

    $('#editor').trumbowyg({
        lang: 'he',
        });


        var currentURL = document.URL;
        var params = currentURL.extract();

        
        id = params.product;

        console.log(id);

        getProduct(id);



        $("#updateProduct").on("click",function() {


            var currentURL = document.URL;
            var params = currentURL.extract();
    
            
            id = params.product;

            var name = $("#productName").val();
            var shortDesc = $("#shortDesc").val();
            var priceBefore = $("#priceBefore").val();
            var priceFinal = $("#priceFinal").val();
            var description = $("#editor").html();
            var stonesNum = $("#stonesNum").val();
            var stonesWeight = $("#stonesWeight").val();
            var stonesClarity = $("#stonesClarity").val();
            var stonesColor = $("#stonesColor").val();

            var centralStone = $("#centralStone").val();


            var q = "updateProduct";


$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,name:name,shortDesc:shortDesc,priceBefore:priceBefore,description:description,priceFinal:priceFinal,stonesNum:stonesNum,stonesWeight:stonesWeight,stonesClarity:stonesClarity,stonesColor:stonesColor,id:id,centralStone:centralStone},

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







function getProduct(id) {

    // loaderOn();
    
    var q = "getProduct";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q,id:id},
    success: function(data){
    
      var json = JSON.parse(data);

      var productName = json.productName;
      var pricebefore = json.pricebefore;
      var pricefinal = json.pricefinal;
      var description = json.description;
      var stonesNum = json.stonesNum;
      var stonesWeight = json.stonesWeight;
      var stonesClarity = json.stonesClarity;
      var stonesColor = json.stonesColor;
      var centralStoneDB = json.centralStoneDB;
      var shortDesc = json.shortDesc;



      $("#productName").val(productName);
      $("#priceBefore").val(pricebefore);
      $("#shortDesc").val(shortDesc);
      $("#priceFinal").val(pricefinal);
      $("#stonesNum").val(stonesNum);
      $("#stonesWeight").val(stonesWeight);
      $("#centralStone").val(centralStoneDB);
      $("#stonesClarity").val(stonesClarity);
      $("#stonesColor").val(stonesColor);
      $("#centralStone").val(centralStoneDB);
      $("#editor").html(description);






// loaderOff();
    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });

}
    