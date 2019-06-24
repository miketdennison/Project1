$(document).ready(function() {

    $("#green-check").on("click", function () {
        $(".card").toggle("slide", {direction: "right"}, 400);
    });



    $("#red-check").on("click", function () {
        $(".card").toggle("slide", {direction: "left"}, 400);

        $(".card").show();
    })


})