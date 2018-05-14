var linkModal = document.querySelector(".page-header__call-order");
var modalBlock = document.querySelector(".modal");
var form = document.querySelector(".form");
var inputs = form.querySelectorAll("input");
var submitButton = form.querySelector(".modal__submit");
var closeModal = modalBlock.querySelector(".modal__close");
var phoneInput = form.querySelector(".form__input--phone");
var overlay = document.querySelector(".overlay");

linkModal.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalBlock.classList.add("modal--show");
  overlay.classList.add("overlay--active");
});

closeModal.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalBlock.classList.remove("modal--show");
  overlay.classList.remove("overlay--active");
});

overlay.addEventListener("click", function(evt) {
  modalBlock.classList.remove("modal--show");
  overlay.classList.remove("overlay--active");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalBlock.classList.contains("modal--show")) {
      modalBlock.classList.remove("modal--show");
      overlay.classList.remove("overlay--active");
    }
  }
});

var setCursorPosition = function(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
};

var mask = function(event) {
  var matrix = this.defaultValue,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
        return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this);

};

phoneInput.addEventListener("input", mask, false);
inputs.forEach(function(item) {
  item.addEventListener("input", function () {
    if(this.checkValidity() == true) {
      this.classList.remove("form__input--invalid");
      this.classList.add("form__input--valid");
    } else {
      this.classList.remove("form__input--valid");
      this.classList.add("form__input--invalid");
    }
  })
});

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  var errors = form.querySelectorAll(".form__error");

  errors.forEach(function(item) {
    item.remove();
  });

  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].checkValidity() == false) {
      var validity = inputs[i].validity;
      var error;

      if(inputs[i].classList.contains("form__input--name")) {
        error = "Введите имя";
      }
      if(inputs[i].classList.contains("form__input--email")) {
        error = "Введите email в формате address@domain.com";
      }
      if(inputs[i].classList.contains("form__input--phone")) {
        error = "Введите телефон в формате +7 (123) 456-78-99";
      }

      inputs[i].classList.add("form__input--invalid");
      inputs[i].insertAdjacentHTML("afterend","<p class='form__error'>" + error + "</p>");
      inputs[i].classList.add("form__input--invalid");
    }
  };
  var errorsCount = form.querySelectorAll(".form__error").length;

  if(errorsCount === 0) {
    var request = new XMLHttpRequest();
    var data = new FormData(form);

    request.open(form.method, form.action);
    request.send(data);
    request.onreadystatechange = function() {
      var DONE = 4;
      var OK = 200;
      if (request.readyState === DONE) {
        if (request.status === OK)
          console.log(request.responseText);
          cleanForm();
      } else {
      console.log('Error: ' + request.status);
      }
    };
  }
});

var cleanForm = function() {
  form.reset();
  var errors = form.querySelectorAll(".form__error");
  errors.forEach(function(item) {
    item.remove();
  });
  inputs.forEach(function(item) {
    item.classList.remove("form__input--valid");
    item.classList.remove("form__input--invalid");
  });
};
