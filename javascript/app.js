$(document).ready(function () {


    // Setting click event for green check (slide right)
    $("#green-check").on("click", function () {
        $(".card").toggle("slide", { direction: "right" }, 400);
    });


    // Setting click event for red check (slide left)
    $("#red").on("click", function () {
        $(".card").toggle("slide", { direction: "left" }, 300);
    });


})