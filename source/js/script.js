var menu = document.querySelector(".main-nav");
var body = document.querySelector("body");
var sections = document.querySelectorAll("section");
var menuItems = document.querySelectorAll(".main-menu__item");
var firstItem = document.querySelector(".main-menu__item:first-child");
var refElements = [];
var menuTopY = menu.offsetTop;

var links = document.querySelectorAll(".main-menu a[href*='#'");
var scrollSpeed = 0.5;

links.forEach(function(item) {
  item.addEventListener("click", function(event) {
    event.preventDefault();
    var currentPosition = window.pageYOffset;
    var href = item.getAttribute("href");
    var targetY = document.querySelector(href).getBoundingClientRect().top;
    var start = null;
    var step = function(time) {
      if (start === null) start= time;
      var progress = time - start;
      var jump = (targetY < 0 ? Math.max(currentPosition - progress/scrollSpeed,currentPosition+targetY): Math.min(currentPosition + progress/scrollSpeed, currentPosition + targetY));
      window.scrollTo(0, jump);
      if (jump != currentPosition+targetY) {
        requestAnimationFrame(step);
      } else {
        location.hash = href;
      }
    }
    requestAnimationFrame(step);
  });
});

var scrollMenu = function() {
  var currentPosition = window.pageYOffset;
  if (currentPosition > menuTopY) {
    menu.classList.add("main-nav--fixed");
  } else {
    menu.classList.remove("main-nav--fixed");
    firstItem.classList.add("main-menu__item--active");
  }

  menuItems.forEach(function(item){
    item.querySelector("a").blur();
    var href = item.querySelector("a").getAttribute("href");
    var element = document.querySelector(href);
    var elementTop = element.offsetTop;
    var elementHeight = element.getBoundingClientRect().height;

    if(elementTop <= currentPosition && elementTop + elementHeight > currentPosition) {
      item.classList.add("main-menu__item--active");
    } else {
      item.classList.remove("main-menu__item--active");
    }

    if(currentPosition <= menuTopY) {
      firstItem.classList.add("main-menu__item--active");
    }

  });



};

window.addEventListener("scroll", scrollMenu);



