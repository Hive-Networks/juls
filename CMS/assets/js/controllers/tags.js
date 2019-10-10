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
    
    
    
    
    function getTags() {
    
        loaderOn();
        
        var q = "getTags";
        
        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "../API/",  //file name
        data: {q:q},
        success: function(data){
        
        
        var returnedData = JSON.parse(data);
        
        console.log(data);
        
        for (var i=0;i<returnedData.length;++i)
        {
        $("#tagSelect").append('<option value="'+returnedData[i].tagParent+'"> '+returnedData[i].tag_name+'</option');
    
        $("#tagUpdate").after('<div id="'+returnedData[i].tagParent +'" class="table-data__table-row langD"> <div class="table-data__table-cell table-data__table-cell--hash">'+returnedData[i].tagParent+'</div>  <div class="table-data__table-cell table-data__table-cell--name">'+returnedData[i].tag_name+'</div>  <div class="table-data__table-cell iconSize"><img src="'+returnedData[i].tagIcon+'" /></div> <div class="table-data__table-cell">'+returnedData[i].tagLanguage+'</div>  <div class="table-data__table-cell table-data__table-cell--actions">   <div class="table-data__table-icons-box">   <button  class="table-data__table-icons-box-button" >   <svg class="table-data__table-delete-icon tagDelete" tagid="'+returnedData[i].tagID+'" parentid="'+returnedData[i].tagParent+'">    <use xlink:href="assets/img/sprites.svg#icon-cross"></use> </svg> </button>    </div>    </div>     </div>');
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
    getTags();
    
    
    
    
    
    
    $("#saveTag").on("click",function() {
    
        loaderOn();
    
    var tagName = $("#tagName").val();
    var tagIcon = $("#tagIcon").val();
    var q = "saveTag";
    
    $.ajax({  //Make the Ajax Request
    type: "POST",
    url: "../API/",  //file name
    data: {q:q,tagName:tagName,tagIcon:tagIcon},
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
        
        var tagName = $("#tagTranslation").val();
        var tagParent = $("#tagSelect").val();
        var Language = $("#langSelect").val();
        
        var q = "saveTranslationTag";
        
        $.ajax({  //Make the Ajax Request
        type: "POST",
        url: "../API/",  //file name
        data: {q:q,tagName:tagName,tagParent:tagParent,Language:Language},
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
    
    
    
    
    
        $(document).on("click",".tagDelete",  function() { 
    
    
            var tagid = $(this).attr("tagid");
            var parentid = $(this).attr("parentid");
            
            
            
            
            if (confirm("Are you sure you want to delete?") == true) {
            
                loaderOn();
            
                
                var q = "tagDelete";
            
            
            $.ajax({  //Make the Ajax Request
            type: "POST",
            url: "../API/",  //file name
            data: {q:q,tagid:tagid},
            success: function(data){
            
            
            var returnedData = JSON.parse(data);
            
            console.log(data);
            
            
            loaderOff();
            
            $(".langD").remove();
            
            getTags();
            
            
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
    
    
    
    
    
    