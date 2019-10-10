function loaderOn() {
}

function loaderOff() {
}

$(document).on("ajaxStart",function() {
    $(".jumper").show();
});

$(document).on("ajaxStop",function() {
    $(".jumper").hide();
});


$(document).ready(function() { 

 



    $(".table-data__search-input").on("change",function() {

        var searchsrtring = $(this).val();

        if (searchsrtring == '') {
            $('.table-data__table-row').show();
        }

        else {
            $('.table-data__table-row').hide();

            $('.table-data__table-row').filter(":contains('" + searchsrtring + "')").show();

        }

    });

  



      $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        html: true
    });

});