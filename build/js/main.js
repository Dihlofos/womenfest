"use strict";
(function () {
  const buttons = document.querySelectorAll('.activities__buttons .primary-btn');
  const lists = document.querySelectorAll('.activities__list');

  const showScene = (scene) => {
    lists.forEach(list => {
      list.hidden = list.dataset.scene !== scene;
    });

    buttons.forEach(button => {
      button.classList.toggle('primary-btn--active', button.dataset.scene === scene);
    });
  };

  const initial = document.querySelector('.primary-btn--active')?.dataset.scene;
  if (initial) {
    showScene(initial);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      showScene(button.dataset.scene);
    });
  });

  const moreButtons = document.querySelectorAll('.map__more');
  moreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScene = btn.dataset.scene;
      const activitiesSection = document.querySelector('#activities');

      if (targetScene === 'partners') {
        const partnersSection = document.querySelector('#partners');
        partnersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        return;
      }

      if (activitiesSection) {
        activitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          showScene(targetScene);
        }, 400);
      }
    });
  });
})();

"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

// "use strict";
// (function () {
//   let upButton = document.querySelector(".up");

//   if (upButton) {
//     window.onscroll = function () {
//       if (window.pageYOffset > 260) {
//         upButton.classList.add("up--shown");
//       } else {
//         upButton.classList.remove("up--shown");
//       }
//     };
//   }
// })();


"use strict";
(function () {
  const upButton = document.querySelector(".up");

  if (!upButton) return;

  const mobileBreakpoint = 768; 
  const defaultBottom = 30;
  const raisedBottom = 379;
  const footerBuffer = 400; 

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const distanceToBottom = docHeight - (scrollY + windowHeight);

    if (scrollY > 260) {
      upButton.classList.add("up--shown");
    } else {
      upButton.classList.remove("up--shown");
    }

    if (window.innerWidth <= mobileBreakpoint) {
      if (distanceToBottom < footerBuffer) {
        upButton.style.bottom = `${raisedBottom}px`;
      } else {
        upButton.style.bottom = `${defaultBottom}px`;
      }
    } else {
      upButton.style.bottom = "";
    }
  });
})();


"use strict";
(function () {
  const key = "maraphon-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");
  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

// "use strict";
// (function () {
//   const dropdowns = document.querySelectorAll(".js-dropdown");

//   if (!dropdowns.length) {
//     return;
//   }

//   dropdowns.forEach((dropdown) => {
//     const trigger = dropdown.querySelector(".js-dropdown-trigger");

//     trigger.addEventListener("click", () => {
//       dropdown.classList.toggle("open");
//     });
//   });
// })();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;

      // ZONES 
      const zoneItem = target.closest(".zones__item");
      const content = target.nextElementSibling;

      if (zoneItem) {
        document.querySelectorAll(".zones__item").forEach((otherItem) => {
          if (otherItem !== zoneItem) {
            otherItem.classList.remove("active");
            const otherContent = otherItem.querySelector(".zones__content");
            const otherButton = otherItem.querySelector(".zones__toggler");
            otherContent?.classList.remove("active");
            otherButton?.classList.remove("active");
          }
        });

        target.classList.toggle("active");
        content?.classList.toggle("active");
        zoneItem.classList.toggle("active");
        return; 
      }

      // FAQ 
      const faqItem = target.closest(".faq__item");
      const faqContent = target.nextElementSibling;

      target.classList.toggle("active");
      faqContent?.classList.toggle("active");
      faqItem?.classList.toggle("active");
    });
  });
})();



"use strict";
(async function () {
  const locations = [
    {
      name: "Площадь за Новой Третьяковкой",
      index: 1,
      coords: [55.734594, 37.606871].reverse(),
    },
    {
      name: "Терраса у сухого фонтана на набережной",
      index: 2,
      coords: [55.735416, 37.604833].reverse(),

    },
    {
      name: "Сцена «Нова»",
      index: 3,
      coords: [55.736464, 37.608203].reverse(),
    },
    {
      name: "Парковка Новой Третьяковки",
      index: 4,
      coords: [55.733926, 37.604486].reverse(),
    },
    {
      name: "Летний кинотеатр «Музеона»",
      index: 5,
      coords: [55.737324, 37.609811].reverse(),
    },
    {
      name: "Поляна по центральной аллее",
      index: 6,
      coords: [55.735136, 37.608657].reverse(),
    },
    {
      name: "Поляна по центральной аллее",
      index: 7,
      coords: [55.735151, 37.608885].reverse(),
    },
    {
      name: "Газон за Новой Третьяковкой",
      partners: true,
      index: 8,
      coords: [55.734020, 37.606097].reverse(),
    },
  ];

const activeString = "is-active";

// content constants
const contentContainer = document.querySelector(".js-content-night-container");
const contentsEls = contentContainer?.querySelectorAll(".js-content") || [];
const contentLeftArrow = contentContainer?.querySelector(".js-content-arrow-left");
const contentRightArrow = contentContainer?.querySelector(".js-content-arrow-right");

// map constants
const legend = document.querySelector(".js-legend");
const legendItems = legend?.querySelectorAll(".js-legend-item") || [];
const legendLinks = legend?.querySelectorAll(".js-legend-link") || [];

const mapInstance = await initMap();

// Навигация по контенту (стрелки)
contentLeftArrow?.addEventListener("click", () => {
  const currentIndex = getActiveContentIndex();
  if (currentIndex > 1) setActiveLocation(currentIndex - 1);
});

contentRightArrow?.addEventListener("click", () => {
  const currentIndex = getActiveContentIndex();
  if (currentIndex < contentsEls.length) setActiveLocation(currentIndex + 1);
});

// Клики по пунктам легенды
legendItems.forEach((item) => {
  item.addEventListener("click", () => {
    setActiveLegend(Number(item.dataset.thumbIndex));
  });
});

legendLinks.forEach((item) => {
  item.addEventListener("click", () => {
    const itemIndex = Number(item.dataset.thumbIndex);
    setActiveLocation(itemIndex);
  });
});

function getActiveContentIndex() {
  const active = [...contentsEls].find((el) =>
    el.classList.contains(activeString)
  );
  return Number(active?.dataset.contentIndex) || 1;
}

function setActiveLegend(index) {
  clearLegendItems();
  const legendItem = [...legendItems].find(
    (item) => Number(item.dataset.thumbIndex) === index
  );
  const markers = document.querySelectorAll(".js-marker");
  const selectedMarker = [...markers].find(
    (marker) => Number(marker.dataset.thumbIndex) === index
  );

  clearMarkers();
  selectedMarker?.classList.add("is-active");
  legendItem?.classList.add(activeString);

  const selectedLocation = locations.find((location) => location.index === index);
  mapInstance.setLocation({
    center: selectedLocation.coords,
    zoom: 17,
    duration: 200,
    easing: "ease-in-out",
  });
}

function clearLegendItems() {
  legendItems.forEach((item) => {
    item.classList.remove(activeString);
  });
}

function clearContents() {
  contentsEls.forEach((item) => {
    item.classList.remove(activeString);
  });
}

function setActiveLocation(index) {
  clearLegendItems();
  clearContents();

  const contentItem = [...contentsEls].find(
    (item) => Number(item.dataset.contentIndex) === index
  );

  contentItem?.classList.add(activeString);
  reinitSlider(document.querySelector(`[data-content-index="${index}"]`));
}

async function initMap() {
  const vw = window.innerWidth;
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapMarker,
    YMapDefaultFeaturesLayer,
  } = ymaps3;

  const map = new YMap(
    document.querySelector(".js-map"),
    {
      location: {
        center: [55.734329, 37.606728].reverse(),
        zoom: vw > 767 ? 16 : 13,
      },
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
  );

  locations.forEach((location) => {
    const markerElement = document.createElement("div");
    markerElement.className = "map__marker js-marker";
    markerElement.innerText = location.index;
    markerElement.dataset.thumbIndex = location.index;

    const marker = new YMapMarker(
      {
        coordinates: location.coords,
        draggable: false,
        mapFollowsOnDrag: false,
      },
      markerElement
    );

    map.addChild(marker);

    markerElement.addEventListener("click", () => {
      setActiveLegend(location.index);
      const legendItem = [...legendItems].find(
        (item) => Number(item.dataset.thumbIndex) === location.index
      );
      legend.scrollTop = findPosition(legendItem) - findPosition(legend);
      clearMarkers();
      markerElement.classList.add("is-active");
    });
  });

  return map;
}

function clearMarkers() {
  const markers = document.querySelectorAll(".js-marker");
  markers.forEach((marker) => {
    marker.classList.remove("is-active");
  });
}

function findPosition(el) {
  let offsetTop = 0;
  while (el) {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
}

})();




// "use strict";
// (function () {
//   const nav = document.querySelector('.js-nav');
//   const toggler = nav.querySelector('.js-nav-toggler');
//   const closeButton = nav.querySelector('.js-nav-close');
//   const links = nav.querySelectorAll('.js-scroll');

//   toggler.addEventListener('click', () => {
//     nav.classList.toggle('is-active');
//   })

//   links.forEach((link) => {
//     link.addEventListener('click', () => {
//       closeNav();
//     })
//   })


//   function closeNav() {
//     nav.classList.remove('is-active');
//   }


// })();



(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');
  const headerContainer = document.querySelector('.header__container');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
    headerContainer.classList.toggle('nav-open'); 
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  function closeNav() {
    nav.classList.remove('is-active');
    headerContainer.classList.remove('nav-open');
  }
})();

// "use strict";
// (function () {
//   const slider = document.querySelector(".js-people-slider-concert-container");
//   const vw = window.innerWidth;
//   const wrapper = slider.querySelector(".swiper-wrapper");

//   if (wrapper.childNodes.length > 3 && vw >= 744) {
//     new Swiper(`.js-people-slider-concert`, {
//       // Optional parameters
//       slidesPerView: 3,
//       spaceBetween: 30,
//       initialSlide: 0,
//       draggable: false,
//       pagination: false,
//       loop: false,
//       navigation: {
//         nextEl: ".js-people-next-concert",
//         prevEl: ".js-people-prev-concert",
//       },
//     });
//   } else {
//     slider.classList.add("disabled");
//   }
// })();

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
    offset: 100,
  });
})();
