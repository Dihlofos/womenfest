

"use strict";
(async function () {
  const locations = [
    {
      name: "Площадь за Новой Третьяковкой",
      index: 1,
      coords: [55.733969, 37.607266].reverse(),
    },
    {
      name: "Терраса у сухого фонтана на набережной",
      index: 2,
      coords: [55.735751, 37.604371].reverse(),

    },
    {
      name: "Сцена «Нова»",
      index: 3,
      coords: [55.736464, 37.608203].reverse(),
    },
    {
      name: "Площадь у памятника Лермонтову",
      index: 4,
      coords: [55.734329, 37.606728].reverse(),
    },
    {
      name: "Летний кинотеатр «Музеона»",
      index: 5,
      coords: [55.737270, 37.609966].reverse(),
    },
    {
      name: "Поляна по центральной аллее",
      index: 6,
      coords: [55.735136, 37.608657].reverse(),
    },
    {
      name: "Поляна по центральной аллее",
      index: 7,
      coords: [55.735155, 37.607926].reverse(),
    },
    {
      name: "Газон за Новой Третьяковкой",
      index: 8,
      coords: [55.734082, 37.606103].reverse(),
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



