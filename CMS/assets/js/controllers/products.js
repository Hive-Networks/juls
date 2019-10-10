function getProducts() {
    
    var q = "getProducts";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q},
    success: function(data){
    

// var returnedData = JSON.parse(data);
    

// for (var i=0;i<returnedData.length;++i) {

    // var hotelName = returnedData[i].hotelName;
    // var hotelId = returnedData[i].hotelId;
    // var hotel_area = returnedData[i].hotel_area;
    // var hotel_city = returnedData[i].hotel_city;
    // var hotel_tags = returnedData[i].hotel_tags;
    // var hotel_features = returnedData[i].hotel_features;
    // var hotel_images = returnedData[i].hotel_images;
    // var hotel_images2 = returnedData[i].hotel_images2;
    // var transName = returnedData[i].transName;
    // var transParent = returnedData[i].transParent;
    // var hotel_description = returnedData[i].hotel_description;
    // var langaugeName = returnedData[i].langaugelangaugeNameName;
    // var languageId = returnedData[i].languageId;
    // var imageURL = returnedData[i].imageURL;
    // var status = returnedData[i].hotel_published;
    // var trans_id = returnedData[i].trans_id;
    // var imgNum = imageURL.length;
    // var imagesFinal = "";



    // for (var k=0;k<imgNum;++k) {
    //     imagesFinal = imagesFinal + "<a data-toggle='tooltip' title='<img src="+imageURL[k]+" height=50 />'> <img class='imgIcon' src='http://daka90hotel.s3.amazonaws.com/1543405680noun_Image_857943.png' height='30' /> </a>";
    // }
    // // console.log(imagesFinal);


    // if (returnedData[i].hotel_published == '1') {
    $("#hotelUpdate").after(data);
    // }


    // if (returnedData[i].hotel_published == '0') {
    // $("#hotelUpdate").after('<div class="table-data__table-row langD"><div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].hotelId+'</div><div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].hotelName+'</div><div class="table-data__table-cell">'+returnedData[i].hotel_area+' </div><div class="table-data__table-cell">'+returnedData[i].hotel_city+' </div><div class="table-data__table-cell">'+returnedData[i].langaugeName+' </div><div class="table-data__table-cell"> '+imagesFinal+'  </div><div class="table-data__table-cell"><div class="table-data__table-icons-box-button "> <svg class="table-data__table-notPublished-icon publishAction" status="'+status+'" hotelid="'+returnedData[i].trans_id+'"> <use xlink:href="assets/img/sprites.svg#icon-cross"></use>             </svg>  </div> </div><div class="table-data__table-cell table-data__table-cell--actions"> <a class="padding-5-lr" href="edit_hotel.html?hotel='+trans_id+'&lang='+languageId+'&parent='+transParent+'"> <button  class="table-data__table-icons-box-button" >        <svg class="table-data__table-edit-icon deleteLang" hotelid="'+returnedData[i].hotelId+'" parent="'+transParent+'" lang="'+languageId+'">             <use xlink:href="assets/img/sprites.svg#icon-edit"></use>      </svg>   </button> </a> <a class="padding-5-lr" href="add_translation.html?hotel='+trans_id+'&lang='+languageId+'&parent='+transParent+'">  <button  class="table-data__table-icons-box-button" >         <svg class="table-data__table-translate-icon" hotelid="'+returnedData[i].hotelId+'"><use xlink:href="assets/img/sprites.svg#icon-globe"></use> </svg> </button> </a>   <button  class="table-data__table-icons-box-button" >        <svg class="table-data__table-delete-icon deleteHotel" hotelid="'+returnedData[i].trans_id+'" parent="'+transParent+'" lang="'+languageId+'">             <use xlink:href="assets/img/sprites.svg#icon-cross"></use>      </svg>   </button>  </div></div>');
    // }



    imagesFinal = "";

    
    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });
    
    };
    

    $(document).ready(function() {
getProducts();

$("body").tooltip({
    selector: '[data-toggle="tooltip"]',
    html: true
});





$(document).on("click",".publishAction",  function() { 

    loaderOn();
    
    var productId = $(this).attr("productid");
    var status = $(this).attr("status");

    
    var q = "featureProduct";
    
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q,productId:productId,status:status},
    success: function(data){
    
    
    // var returnedData = JSON.parse(data);
    
    console.log(data);
    
    $(".langD").remove();
    
    getProducts();

 

    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });
    
    
    });









    


    });











// <div class="table-data__table-row langD">
// <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].hotelId+'</div>
// <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].hotelName+'</div>
// <div class="table-data__table-cell">'+returnedData[i].hotel_area+' </div>
// <div class="table-data__table-cell">'+returnedData[i].hotel_city+' </div>
// <div class="table-data__table-cell">'+returnedData[i].langaugeName+' </div>
// <div class="table-data__table-cell"> '+imagesFinal+'  </div>
// <div class="table-data__table-cell">
// <div class="table-data__table-icons-box-button "> 
// <svg class="table-data__table-notPublished-icon publishAction" status="'+status+'" hotelid="'+returnedData[i].trans_id+'"> 
// <use xlink:href="assets/img/sprites.svg#icon-cross"></use>             
// </svg>  </div> </div>
// <div class="table-data__table-cell table-data__table-cell--actions">
//  <a class="padding-5-lr" href="edit_hotel.html?hotel='+trans_id+'&lang='+languageId+'&parent='+transParent+'">
//   <button  class="table-data__table-icons-box-button" >        
//   <svg class="table-data__table-edit-icon deleteHotel" hotelid="'+returnedData[i].hotelId+'" parent="'+transParent+'" lang="'+languageId+'">            
//     <use xlink:href="assets/img/sprites.svg#icon-edit"></use>      </svg>   </button> </a>
//      <a class="padding-5-lr" href="add_translation.html?hotel='+trans_id+'&lang='+languageId+'&parent='+transParent+'">
//   <button  class="table-data__table-icons-box-button" >         <svg class="table-data__table-translate-icon" hotelid="'+returnedData[i].hotelId+'"><use xlink:href="assets/img/sprites.svg#icon-globe"></use> </svg> </button> </a>   <button  class="table-data__table-icons-box-button" >        <svg class="table-data__table-delete-icon deleteLang" hotelid="'+returnedData[i].hotelId+'">             <use xlink:href="assets/img/sprites.svg#icon-cross"></use>      </svg>   </button>  </div></div>