  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if (isDesktop) {
            document.write('<script src="desktop.js"><\/script>');
        } else {
            document.write('<script src="mobile.js"><\/script>');
        }
        //
       

        document.addEventListener("DOMContentLoaded", () => {
    const desktopItem = document.querySelector(".item-container");
    const mobileItem = document.querySelector(".item-container-mobile");

    if (desktopItem && mobileItem) {
      mobileItem.innerHTML = desktopItem.innerHTML;
    }
  });

  
$(function(){
  const $images = $(".img-gallery img"); // all gallery images
  let currentIndex = 0;

  // show modal on click
  $images.on("click", function(){
    currentIndex = $images.index(this); // get clicked image index
    showModal(currentIndex);
  });

  function showModal(index) {
    const src = $images.eq(index).attr("src");
    $("#modal")
      .html('<img src="'+src+'" alt="">')
      .css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center"
      })
      .fadeIn(200);
  }

  // close modal on click
  $("#modal").on("click", function(e){
      $(this).fadeOut(200, function(){
        $(this).empty().css("display", "none");
      });
    
  });

  // arrow key navigation
  $(document).on("keydown", function(e){
    if($("#modal").is(":visible")) { // only when modal is open
      if(e.key === "ArrowRight") { // next image
        currentIndex = (currentIndex + 1) % $images.length;
        showModal(currentIndex);
      } else if(e.key === "ArrowLeft") { // previous image
        currentIndex = (currentIndex - 1 + $images.length) % $images.length;
        showModal(currentIndex);
      }
    }
  });
});

$(window).on("load", function() {
  const $gallery = $(".img-gallery.sliding");
  setTimeout(() => {
    $gallery.scrollLeft(0);
  }, 50); // 50ms delay
});

