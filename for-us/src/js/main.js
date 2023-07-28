import $ from 'jquery';
import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';

import { closeModal, openModal } from './components/modal';
import {
  fieldListener, validateFields, keyField, prepField,
} from './components/inputs';
import generateId from './components/utils';
import GTMEvents from './components/gtmEvents';

const GTM = new GTMEvents();

window.jQuery = window.$ = $;
/// /////// DocReady //////////
window.addEventListener('load', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();

  GTM.addEventListeners();
  goNextSection();
  openPopup();
});

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

function openPopup() {
  const popupLink = document.querySelector('.popup__link');
  popupLink.addEventListener('click', () => openModal('#popup-modal-box'));
}
