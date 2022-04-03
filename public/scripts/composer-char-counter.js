$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const charLeft = 140 - this.value.length;
    const counter = $(this).closest(".submitForm").find(".counter");
    counter.text(`${charLeft}`);
    counter.toggleClass("extraChrt", charLeft < 0);
  });
});