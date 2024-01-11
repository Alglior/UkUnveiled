$(document).ready(function() {
    // Function to handle window resize
    function handleResize() {
      var windowWidth = $(window).width();
  
      if (windowWidth > 768) {
        $("#menu").show(); // Show the menu when the window is large enough
        $("#menu-button").hide();
      } else {
        $("#menu").hide(); // Hide the menu when the window is too small
        $("#menu-button").show();
      }
    }
  
    // Initial handling of window size
    handleResize();
  
    // Toggle the menu when the button is clicked
    $("#menu-button").on("click", function() {
      $("#menu").slideToggle();
    });
  
    // Handle window resize events
    $(window).on("resize", function() {
      handleResize();
    });
  
    // Function to hide the menu when the page is changed
    $(window).on("beforeunload", function() {
      $("#menu").hide();
    });
  });
  