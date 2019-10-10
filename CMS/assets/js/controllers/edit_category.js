$(document).ready(function() {

    var currentURL = document.URL;
    var params = currentURL.extract();
    
    
    
    
    $('#editor').trumbowyg({
    lang: 'he',
    });
    
    id = params.category;
    // getHotel(id);



    $("#saveCategory").on("click",function() {

        loaderOn();

        var catName = $("#catName").val();
        var catHead = $("#catHead").val();
        var catImg = $('.imgCaption').attr("imgUrl");
        var description = $("#editor").html();

        // console.log(catName);
        // console.log(catHead);
        // console.log(catImg);
        // console.log(description);


        var q = "updateCategory";


        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "../API/",  //file name
        data: {q:q,catName:catName,catHead:catHead,catImg:catImg,description:description,id:id},
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