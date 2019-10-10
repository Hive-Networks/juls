$(document).ready(function() {


    $("[addprice=yes]").on("change",function() {

var that = $(this).prop("checked");
pricetoadd = parseInt($(this).attr("pricetoadd"));
var price = parseInt($("price").text());

if (that == true) {


    $("price").text(pricetoadd + price);

}

else {

    $("price").text(price - pricetoadd);


}


    });


});