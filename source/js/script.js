var menu = document.querySelector(".main-nav");
var body = document.querySelector("body");
var sections = document.querySelectorAll("section");
var menuItems = document.querySelectorAll(".main-menu__item");
var firstItem = document.querySelector(".main-menu__item:first-child");
var refElements = [];
var menuTopY = menu.offsetTop;
console.log(menuTopY);

var scrollMenu = function() {
    //console.log(window.pageYOffset);
  var currentPosition = window.pageYOffset;
  if (currentPosition > menuTopY) {
    menu.classList.add("main-nav--fixed");
  } else {
    menu.classList.remove("main-nav--fixed");
    firstItem.classList.add("main-menu__item--active");
  }

  menuItems.forEach(function(item, i, menuItems){
    item.querySelector("a").blur();
    var href = item.querySelector("a").getAttribute("href");
    var element = document.querySelector(href);
    var elementTop = element.offsetTop;
    var elementHeight = element.getBoundingClientRect().height;
    //console.log(elementPos.top);

    if(elementTop <= currentPosition && elementTop + elementHeight > currentPosition) {
      //console.log(item);

      item.classList.add("main-menu__item--active");
    } else {
      item.classList.remove("main-menu__item--active");
    }

    if(currentPosition <= menuTopY) {
      firstItem.classList.add("main-menu__item--active");
    }
    //console.log(href);
  });



};



var clickScroll = function(event) {
  var target = event.target;



  if(target.tagName == "A") {
    event.preventDefault();
    var href = target.getAttribute("href");
    var element = document.querySelector(href);

    /* window.scrollTo(0,elementTop);
    console.log(element); */
    window.scrollTo(0,element.offsetTop);


  }
}



window.addEventListener("scroll", scrollMenu);
menu.addEventListener("click", clickScroll);


