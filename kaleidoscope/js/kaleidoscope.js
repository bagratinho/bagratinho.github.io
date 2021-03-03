(function() {
  var root = document.createElement("div")
  root.classList.add("kdscp-wrapper");
  document.querySelector("body").appendChild(root);
  var openKaleidoscopeModal = async function(e) {
    var productId = e.target.getAttribute("data-productId");

    // do nothing if modal already open
    if (document.querySelector(".kdscp-modal-wrapper")) return;

    // insert modal markup into DOM
    var modalWrapper = document.createElement("div")
    modalWrapper.classList.add("kdscp-modal-wrapper");
    var modalMarkup = `
      <div class="kdscp-modal-overlay"></div>
      <div class="kdscp-modal-loading"><i></i></div>
    `;
    modalWrapper.innerHTML = modalMarkup;
    document.querySelector(".kdscp-wrapper").appendChild(modalWrapper);
    var response = await apiGet(productId);
    var content = `
      <div class="kdscp-modal">
        <a href="#" class="kdscp-modal-close"></a>
        <div class="kdscp-modal-inner">
          <div class="kdscp-modal-inner-top">
            <h2><i class="kdscp-icon"></i>Merchandised product recommendations by Kaleidoscope</h2>
          </div>
          <div class="kdscp-modal-inner-bottom">
            ${getModalContent(response.slice(0, 5))}
          </div>
        </div>
      </div>
    `;
    modalWrapper.innerHTML = modalMarkup + content;
    document.querySelector(".kdscp-wrapper").appendChild(modalWrapper);
    document.querySelector(".kdscp-modal-loading").remove();

    // append close event listeners
    document.querySelector(".kdscp-wrapper").addEventListener("click", handleClick);
  }

  var closeKaleidoscopeModal= function(e) {
    e.preventDefault();
    document.querySelector(".kdscp-wrapper").removeEventListener("click", handleClick);
    var parent = getClosestParentWithSelector(e.target, ".kdscp-modal-wrapper");
    parent.remove();
  }

  var handleClick = function(e) {
    if (e.target.classList.contains("kdscp-modal-close") ||
        e.target.classList.contains("kdscp-modal-overlay")) {
      closeKaleidoscopeModal(e);
    } else if (e.target.classList.contains("kdscp-add")) {
      addToCart(e);
    } else if (e.target.classList.contains("kdscp-item-img")) {
      selectProductPreview(e);
    }
  }

  var getModalContent = function(arr) {
    var list = arr.reduce(function(sum, i) {
      return `
        ${sum}
        <div class="kdscp-item">
          <div><img class="kdscp-item-img" src="${i.url}"/></div>
          <h3>${i.title.substr(0, 25)}</h3>
          <i>$6.00</i>
          ${sum === "" ? `<span class="kdscp-details">YOUR ITEM</span>` : `<a href="${i.url}" target="_blank" class="kdscp-details">DETAILS</a>`}
        </div>
      `;
    }, "");
    return `
      <div class="kdscp-modal-inner-left">
        <img class="kdscp-modal-img-preview" src="${arr[0].url}"/>
      </div>
      <div class="kdscp-modal-inner-right">
        ${list}
      </div>
    `;
  }

  var addToCart = async function(e) {
    var button = e.target;
    var addToCartLabel = button.firstChild;
    var addedToCartLabel = document.createTextNode("ADDED TO CART");
    var loadingElement = document.createElement("i")
    // enter loading state
    button.appendChild(loadingElement);
    button.removeChild(addToCartLabel);
    button.classList.add("kdscp-loading");

    // wait for response and show added message
    await wait(1000);
    button.classList.remove("kdscp-loading");
    button.classList.add("kdscp-added");
    button.appendChild(addedToCartLabel);
    button.removeChild(loadingElement);

    // return the button to its initial state in one second
    // await wait(2000);
    // button.classList.remove("kdscp-added");
    // button.appendChild(addToCartLabel);
    // button.removeChild(addedToCartLabel);
  }

  var selectProductPreview = function(e) {
    document.querySelector(".kdscp-modal-img-preview").setAttribute("src", e.target.getAttribute("src"));
  }

  var getClosestParentWithSelector = function(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }
    for (; elem && elem !== document; elem = elem.parentNode ) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

  var wait = function(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  var apiGet = function(term, headers) {
    apiExists("6127079030980");
    return new Promise(resolve => {
      fetch(`https://api.mocki.io/v1/74d42349`, {
        "method": "GET",
        headers: headers,
      })
      .then(response => {
        return resolve(response.json());
      })
      .catch(err => {
        return resolve(false);
      });
    });
  }

  var apiExists = function(term,) {
    return new Promise(resolve => {
      fetch(`https://weretailor.ai/api/exists/${term}`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "lorem": "ipsum",
          "Authentication": "af4477e6-9b91-4a82-b5bd-fd8ba3dcb932",
        }
      })
      .then(response => {
        console.log(response.json());
        return resolve(response.json());
      })
      .catch(err => {
        console.log(err);
        return resolve(false);
      });
    });
  }

  document.querySelector(".kdscp-trigger").addEventListener("click", openKaleidoscopeModal);
  })();
