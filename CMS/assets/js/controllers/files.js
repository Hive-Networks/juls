Dropzone.autoDiscover = false;
$(document).ready(function(){

    $('#mydropzone').dropzone({ 
        dictDefaultMessage: "גרור את הקבצים שלך לכאן",

        init: function() {
            this.on('completemultiple', function(file, json) {
             $('.sortable').sortable('enable');
            });
            this.on('success', function(file, json) {

              console.log(json);

              $(".box").append('<div class="table-data__table-row newImage"> <div class="table-data__table-cell table-data__table-cell--hash previewImg"><img src="'+json+'" />  </div>  <div class="table-data__table-cell table-data__table-cell--name">        <div class="crud__form-group">                <input class="crud__input imgCaption" placeholder="כותרת תמונה" type="text" imgurl="'+json+'">                </div></div>  </div>');

            });
            
            this.on('addedfile', function(file) {
            //  console.log(file);
            });
            
            this.on('drop', function(file) {
            //   console.log('File',file)
            }); 

        }

    });



$("#saveImages").on("click",function() {

    loaderOn();

    var images = [];
var text;
var url;

    $.each($('.imgCaption'), function() {
        var data = $(this).val();
        var img = $(this).attr("imgUrl");
        var obj = {};
obj["url"] = img;
obj["text"] = data;
images.push(obj);

// console.log(images);
});


var q = "uploadImages";

$.ajax({  //Make the Ajax Request
type: "POST",
url: "../API/",  //file name
data: {q:q,data:images},
success: function(data){
    $("#saveImages").text("בוצע בהצלחה");
    loaderOff();

console.log(data);


}, 
failure: function(){
alert('Oops, Something Went Really Wrong.');
}
});



});

});


