"use strict";
(function () {
   const buttons = document.querySelectorAll('.activities__buttons .primary-btn');
   const lists   = document.querySelectorAll('.activities__list');
 
   const showScene = (scene) => {
     lists.forEach(list => {
       list.hidden = list.dataset.scene !== scene;  
     });
   };
 
   buttons.forEach(button => {
     button.addEventListener('click', () => {
       buttons.forEach(b => b.classList.toggle('primary-btn--active', b === button)); 
       showScene(button.dataset.scene);
     });
   });
 
   const initial = document.querySelector('.primary-btn--active')?.dataset.scene;
   showScene(initial);

})();
