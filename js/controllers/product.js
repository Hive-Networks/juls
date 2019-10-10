
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





getProduct(id);




});




function getProduct(id) {

    // loaderOn();
    
    var q = "getProduct";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "API/",  //file name
    data: {q:q,id:id},
    success: function(data){
    
      var json = JSON.parse(data);
      var productInfo = json.productInfo;



    console.log(productInfo);
$(".productInfo").html(productInfo);


$('.slider').each(function(index){
            
    var slider = $(this);
    var sliderInitializer = slider.find('ul.slides');
    sliderInitializer.find('>li').addClass('slide');
    var childnum = sliderInitializer.find('li').length;
    
    var themeDefaults = {
        cellSelector: '.slide',
        cellAlign: 'left',
        wrapAround: true,
        pageDots: false,
        prevNextButtons: false,
        autoPlay: true,
        draggable: (childnum < 2 ? false: true),
        imagesLoaded: true,
        accessibility: true,
        rightToLeft: false,
        initialIndex: 0,
        freeScroll: false
    }; 

    // Attribute Overrides - options that are overridden by data attributes on the slider element
    var ao = {};
    ao.pageDots = (slider.attr('data-paging') === 'true' && sliderInitializer.find('li').length > 1) ? true : undefined;
    ao.prevNextButtons = slider.attr('data-arrows') === 'true'? true: undefined;
    ao.draggable = slider.attr('data-draggable') === 'false'? false : undefined;
    ao.autoPlay = slider.attr('data-autoplay') === 'false'? false: (slider.attr('data-timing') ? parseInt(slider.attr('data-timing'), 10): undefined);
    ao.accessibility = slider.attr('data-accessibility') === 'false'? false : undefined;
    ao.rightToLeft = slider.attr('data-rtl') === 'true'? true : undefined;
    ao.initialIndex = slider.attr('data-initial') ? parseInt(slider.attr('data-initial'), 10) : undefined;
    ao.freeScroll = slider.attr('data-freescroll') === "true" ? true: undefined;

    // Set data attribute to inidicate the number of children in the slider
    slider.attr('data-children',childnum);

    
    $(this).data('sliderOptions', jQuery.extend({}, themeDefaults, mr.sliders.options, ao));

    $(sliderInitializer).flickity($(this).data('sliderOptions'));

    $(sliderInitializer).on( 'scroll.flickity', function( event, progress ) {
      if(slider.find('.is-selected').hasClass('controls--dark')){
        slider.addClass('controls--dark');
      }else{
        slider.removeClass('controls--dark'); 
      }
    });
});

   

$('.accordion__title').on('click', function(){
    mr.accordions.activatePanel($(this));
});

$('.accordion').each(function(){
    var accordion = $(this);
    var minHeight = accordion.outerHeight(true);
    accordion.css('min-height',minHeight);
});

if(window.location.hash !== '' && window.location.hash !== '#'){
    if($('.accordion li'+$(this).attr('href')).length){
         mr.accordions.activatePanelById(window.location.hash, true);
    }
}

jQuery(document).on('click', 'a[href^="#"]:not(a[href="#"])', function(){
     
     if($('.accordion > li > .accordion__title'+$(this).attr('href')).length){
        mr.accordions.activatePanelById($(this).attr('href'), true);
     }
});

// loaderOff();
    
    
    }, 
    failure: function(){
    alert('Oops, Something Went Really Wrong.');
    }
    });

}
    




  
$(document).on("click","#addToCart",  function() { 

    
    $(".addToCart").addClass("hide");

    $(".spinner1").removeClass("hide");

    $(this).attr("disabled",true);


    var goldType = $("#goldType").val();

    console.log(goldType+id);


    var q = "addToCart";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "API/",  //file name
    data: {q:q,id:id,goldType:goldType},
    success: function(data){

        $(".addToCart").text("המוצר התווסף בהצלחה!");
        $(".addToCart").removeClass("hide");

        $(".spinner1").addClass("hide");


        $(".modal-container").removeClass("hide");

console.log(data);

    },


    failure: function(){
        alert('Oops, Something Went Really Wrong.');
        }
        });
    


    });

