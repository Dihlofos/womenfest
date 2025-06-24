// "use strict";
// (function () {
//   const togglers = document.querySelectorAll(".js-faq-toggler");
//   if (!togglers.length) return;

//   togglers.forEach((toggler) => {
//     toggler.addEventListener("click", (event) => {
//       const target = event.currentTarget;
//       if (!target) return;
//       const content = target.nextElementSibling;
//       if (!content) return;
//       target.classList.toggle("active");
//       content.classList.toggle("active");
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

      const content = target.nextElementSibling;          
      const item = target.closest(".faq__item");          

      target.classList.toggle("active");                  
      content?.classList.toggle("active");                
      item?.classList.toggle("active");                  
    });
  });
})();
