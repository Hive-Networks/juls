

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



});