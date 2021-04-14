
(function() {

  var authKey = "af4477e6-9b91-4a82-b5bd-fd8ba3dcb932";
  var prsmtkTrigger = document.querySelector(".prsmtk-trigger");
  var productId = prsmtkTrigger && prsmtkTrigger.getAttribute("data-productId");
  localStorage.setItem("prsmtkssid", localStorage.getItem("prsmtkssid") || uuidv4());
  var sessionId = localStorage.getItem("prsmtkssid");

  var root = document.createElement("div");
  root.classList.add("prsmtk-wrapper");
  document.querySelector("body").appendChild(root);
  if (prsmtkTrigger) {
    prsmtkTrigger.addEventListener("click", openPrismatikModal);
  }
  enableIfExists();
  removeExpiredItemsFromStorage("prsmtk-merch-product-list");
  async function openPrismatikModal(e) {
    onInteraction(productId, "opened");

    // do nothing if modal already open
    if (document.querySelector(".prsmtk-modal-wrapper")) return;

    toggleMainScrollbar(true);
    // insert modal markup into DOM
    var modalWrapper = document.createElement("div");
    modalWrapper.classList.add("prsmtk-modal-wrapper");
    var modalMarkup = `
      <div class="prsmtk-modal-overlay"></div>
      <div class="prsmtk-modal-loading"><i></i></div>
    `;
    modalWrapper.innerHTML = modalMarkup;
    document.querySelector(".prsmtk-wrapper").appendChild(modalWrapper);

    var response = await api({
      endpoint: `merch?pid=${productId}&auth=${authKey}`,
      method: "GET",
    });
    storeMerchInLocalStorage(response.merch);
    var src_list = response.merch.map(i => i.image_url);

    var content = `
      <div class="prsmtk-modal">
        <a href="#" class="prsmtk-modal-close"></a>
        <div class="prsmtk-modal-inner">
          <div class="prsmtk-modal-inner-top">
            <h2><i class="prsmtk-icon"></i>PRISMATIK</h2>
          </div>
          <div class="prsmtk-modal-inner-center">
            ${getModalContent(response.merch)}
          </div>
          <div class="prsmtk-modal-inner-bottom">
			<div class="prsmtk-modal-product-name">${response.merch[0].name}</div>
			<div>
				<a class="prsmtk-modal-product-link" data-product-id="${response.merch[0].product_id}" target="_blank" href="${response.merch[0].product_url}">CLICK FOR DETAILS</a>
				<div class="prsmtk-modal-product-price">$${response.merch[0].price}</div>
			</div>
          </div>
        </div>
      </div>
    `;

    loadImages(src_list, imageLoadedCallbackGenerator(modalWrapper, modalMarkup + content))
  }

  function imageLoadedCallbackGenerator(modalWrapper, modal) {
    return () => {
      modalWrapper.innerHTML = modal;
      document.querySelector(".prsmtk-wrapper").appendChild(modalWrapper);
      document.querySelector(".prsmtk-modal-loading").remove();
      const radius = window.innerWidth / 3;
      setPositions(radius > 256 ? radius < 320 ? radius / 2 : 160 : radius);
      // append close event listeners
      document.querySelector(".prsmtk-wrapper").addEventListener("click", handleClick);
    }
  }

  function closePrismatikModal(e) {
    e.preventDefault();
    toggleMainScrollbar(false);
    document.querySelector(".prsmtk-wrapper").removeEventListener("click", handleClick);
    var parent = getClosestParentWithSelector(e.target, ".prsmtk-modal-wrapper");
    parent.remove();
  }

  function storeMerchInLocalStorage(arr) {
    arr.map(i => storeViewedProductWithExpiry("prsmtk-merch-product-list", i.product_id));
  }

  function toggleMainScrollbar(isVisible) {
    if (isVisible) {
      document.querySelector("body").classList.add("prsmtk-open");
    } else {
      document.querySelector("body").classList.remove("prsmtk-open");
    }
  }

  async function handleClick(e) {
    console.log(e.target.classList);
    if (
      e.target.classList.contains("prsmtk-modal-close") ||
      e.target.classList.contains("prsmtk-modal-overlay")
      ) {
        closePrismatikModal(e);
    } else if (
      e.target.classList.contains("prsmtk-item-img")
      ) {
        selectProductPreview(e);
        onInteraction(e.target.getAttribute("data-product-id"), "viewed");
    } else if (
      e.target.classList.contains("prsmtk-modal-product-link") ||
      e.target.classList.contains("prsmtk-modal-img-preview")
      ) {
        onInteraction(e.target.closest(".prsmtk-modal-product-link-img").getAttribute("data-product-id"), "selected");
    }
  }

  function getModalContent(arr) {
    var arrMock = new Array(7).fill(0);
    var list = arrMock.reduce(function(sum, i, index) {
      return `
        ${sum}
			<div class="prsmtk-item ${index === 0 ? "active" : ""}">
		      ${arr[index] ? `<div>
            <img
              class="prsmtk-item-img"
              data-product-id="${arr[index].product_id}"
              data-product-vendor="${arr[index].vendor}"
              data-product-name="${arr[index].name}"
              data-product-url="${arr[index].product_url }"
              data-product-price="${arr[index].price}"
              src="${arr[index].image_url}"
            />
          </div>` : "<div></div>"}
        </div>
      `;
    }, "");
    return `
      <div class="prsmtk-modal-inner-right">
		<div>
        	${list}
		</div>
      </div>
      <div class="prsmtk-modal-inner-left">
		<div class="prsmtk-modal-product-name-alter">${arr[0].name}</div>
		<div class="prsmtk-modal-product-vendor">${arr[0].vendor}</div>
        <a class="prsmtk-modal-product-link-img" data-product-id="${arr[0].product_id}" target="_blank" href="${arr[0].product_url}"><img
		  class="prsmtk-modal-img-preview"
          src="${arr[0].image_url}"
        /></a>
      </div>
    `;
  }

  function selectProductPreview(e) {
    document.querySelector(".prsmtk-item.active").classList.remove("active");
    e.target.closest(".prsmtk-item").classList.add("active");
    document.querySelector(".prsmtk-modal-img-preview").setAttribute("src", e.target.getAttribute("src"));
    document.querySelector(".prsmtk-modal-product-vendor").innerHTML = e.target.getAttribute("data-product-vendor");
    document.querySelector(".prsmtk-modal-product-link").setAttribute("href", e.target.getAttribute("data-product-url"));
    document.querySelector(".prsmtk-modal-product-link").setAttribute("data-product-id", e.target.getAttribute("data-product-id"));
    document.querySelector(".prsmtk-modal-product-link-img").setAttribute("href", e.target.getAttribute("data-product-url"));
    document.querySelector(".prsmtk-modal-product-link-img").setAttribute("data-product-id", e.target.getAttribute("data-product-id"));
    document.querySelector(".prsmtk-modal-product-name").innerHTML = e.target.getAttribute("data-product-name");
    document.querySelector(".prsmtk-modal-product-name-alter").innerHTML = e.target.getAttribute("data-product-name");
    document.querySelector(".prsmtk-modal-product-price").innerHTML = `$${e.target.getAttribute("data-product-price")}`;
    var bgColor = getComputedStyle(e.target.parentNode).backgroundColor;
    document.querySelector(".prsmtk-modal-inner-left").style.background = bgColor;
    document.querySelector(".prsmtk-modal-inner-bottom").style.background = bgColor;

  }

  function onInteraction(productId, endpoint) {
    api({
      endpoint: endpoint,
      method: "POST",
      body: JSON.stringify({
      	auth: authKey,
        session: sessionId,
        prod: productId
      }),
    });
  }

  async function enableIfExists(e) {
    var existenceChecker = await api({
      endpoint: `exists?pid=${productId}&auth=${authKey}`,
      method: "GET",
    });
    if (existenceChecker.exists === true) {
      prsmtkTrigger.classList.add("enabled");
    }
  }


  function addToCartIfMerched(cartJson) {
    try {
      var shopify_productId = JSON.parse(cartJson).product_id;
      var arr = JSON.parse(localStorage.getItem("prsmtk-merch-product-list"));
      if (arr.find(i => i.productId = shopify_productId)) {
        onInteraction(shopify_productId, "cart");
      }
	  } catch(e) {
      console.log({e});
  	}
  }


  var getCoords = (R) => [
    {
      x: R,
      y: R,
      tX: 0,
      tY: 0,
    },
    {
      x: R,
      y: 0,
      tX: 0,
      tY: R,
    },
    {
      x: R * (1 + Math.sqrt(3)/2),
      y: R / 2,
      tX: -R * Math.sqrt(3)/2,
      tY: R / 2,
    },
    {
      x: R * (1 + Math.sqrt(3)/2),
      y: 1.5 * R,
      tX: -R * Math.sqrt(3)/2,
      tY: -R / 2,
    },
    {
      x: R,
      y: 2 * R,
      tX: 0,
      tY: -R,
    },
    {
      x: R * (1 - Math.sqrt(3)/2),
      y: 1.5 * R,
      tX: R * Math.sqrt(3)/2,
      tY: -R / 2,
    },
    {
      x: R * (1 - Math.sqrt(3)/2),
      y: R / 2,
      tX: R * Math.sqrt(3)/2,
      tY: R / 2,
    }
  ];

  var setPositions = (R) => {
    var mS = 1;
    var mB = 1;
    var coords = getCoords(R);
    document.querySelector(".prsmtk-modal-inner-right").style.padding = `${mS / 2 * R}px`;
    document.querySelector(".prsmtk-modal-inner-right > div").style.width = `${2 * R}px`;
    document.querySelector(".prsmtk-modal-inner-right > div").style.height = `${2 * R}px`;

    var nodeList = Array.prototype.slice.call(
      document.querySelectorAll(".prsmtk-modal-inner-right > div > div")
    );

    nodeList.map((item, index) => {
      var m = index ? mS : mB;
      var d = coords[index];
      item.style.width = `${m * R}px`;
      item.style.height =`${m * R}px`;
      item.style.left = `${d.x - ((m * R) / 2)}px`;
      item.style.top = `${d.y - ((m * R) / 2)}px`;
      item.style.transform = `translateX(${d.tX}px) translateY(${d.tY}px)`;
      item.style.transitionDelay = index ? `${(index - 1) * 50}ms` : "0ms";
      if (item.querySelector("img")) {
      	item.querySelector("img").style.transitionDelay = index ? `${index * 100 + 1000}ms` : "1000ms";
      }
    });
    window.requestAnimationFrame(loaded);
  }

  var loaded = () => {
    document.querySelector(".prsmtk-modal-inner-right").classList.add("loaded");
  }

  // Helper methods

  async function getCart() {
    const result = await fetch("/cart.json");

    if (result.status === 200) {
      return result.json();
    }

    throw new Error(`Failed to get request, Shopify returned ${result.status} ${result.statusText}`);
  }

  function getClosestParentWithSelector(elem, selector) {
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

  function api(query) {
    return new Promise(resolve => {
      fetch(`https://prismatik.io/api/${query.endpoint}`, {
        headers: query.headers,
        method: query.method,
        mode: query.mode,
        body: query.body,
      })
      .then(response => {
        return resolve(response.json());
      })
      .catch(err => {
        return resolve(false);
      });
    });
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function loadImages(src_list, callback) {
    var loaded = 0;
    src_list.map(src => {
      img = new Image();
      img.onload = () => {
        console.log("loaded");
        if (++loaded == src_list.length && callback) {
          callback();
          console.log("loaded all");
        }
      };
      img.onerror = (err) => {
        console.log(err);
      };
      img.src = src
    });
  }

  function storeViewedProductWithExpiry(key, productId) {
    var storeVariable = localStorage.getItem(key);
    var expDate = Date.now() + (7 * 24 * 60 * 60 * 1000);
    var newItem = {
      productId: productId,
      expDate: expDate,
    };
    try {
      removeExpiredItemsFromStorage(key);
      if (storeVariable === "[]" || storeVariable === null) {
        localStorage.setItem(key, JSON.stringify([newItem]));
      } else {
        localStorage.setItem(key, JSON.stringify([
          ...JSON.parse(storeVariable).filter(i => {
            return i.productId !== newItem.productId;
          }),
          newItem,
        ]));
      }
    } catch(e) {
		console.log({e});
    }
  }

  function removeExpiredItemsFromStorage(key) {
    var storeVariable = localStorage.getItem(key);
    if (storeVariable) {
      localStorage.setItem(key, JSON.stringify(
        JSON.parse(storeVariable).filter(i => {
          return i.expDate > Date.now();
        })
      ));
    }
  }

  // ajax open override for add to card tracking

  var open = window.XMLHttpRequest.prototype.open;

  function openReplacement() {
    this.addEventListener("load", function () {
      if (
        [
          "/cart/add.js",
        ].includes(this._url)
      ) {
        addToCartIfMerched(this.response);
      }
    });
    return open.apply(this, arguments);
  }

  window.XMLHttpRequest.prototype.open = openReplacement;

})();
