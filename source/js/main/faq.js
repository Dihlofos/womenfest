// "use strict";
// (function () {
//   const togglers = document.querySelectorAll(".js-faq-toggler");
//   if (!togglers.length) return;

//   togglers.forEach((toggler) => {
//     toggler.addEventListener("click", (event) => {
//       const target = event.currentTarget;
//       if (!target) return;

//       const content = target.nextElementSibling;          
//       const item = target.closest(".faq__item");          

//       target.classList.toggle("active");                  
//       content?.classList.toggle("active");                
//       item?.classList.toggle("active");                  
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

      const item = target.closest(".zones__item");
      const content = target.nextElementSibling;

      // Закрыть все остальные
      document.querySelectorAll(".zones__item").forEach((zoneItem) => {
        if (zoneItem !== item) {
          zoneItem.classList.remove("active");
          const content = zoneItem.querySelector(".zones__content");
          const button = zoneItem.querySelector(".zones__toggler");
          content?.classList.remove("active");
          button?.classList.remove("active");
        }
      });

      // Переключить текущий
      target.classList.toggle("active");
      content?.classList.toggle("active");
      item?.classList.toggle("active");
    });
  });
})();

