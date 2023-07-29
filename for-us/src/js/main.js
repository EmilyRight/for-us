import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';

import { closeModal, openModal } from './components/modal';
import generateId from './components/utils';
import GTMEvents from './components/gtmEvents';

const GTM = new GTMEvents();

/// /////// DocReady //////////
window.addEventListener('load', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();

  GTM.addEventListeners();
  goNextSection();
  openPopup();
  faqOpener();
  setAnimation();
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

function setActive(arr) {
  const activeClassName = 'active';
  arr.forEach((el) => {
    const itemText = el.childNodes[3]; // хардкод текстового дочернего узла
    if (el.classList.contains(activeClassName)) {
      itemText.style.transition = 'none';
      el.classList.remove(activeClassName);
    }
  });
}

function faqOpener() {
  const itemsList = document.querySelectorAll('.faq__item');
  const activeClassName = 'active';
  itemsList.forEach((item) => {
    item.addEventListener('click', () => {
      const itemText = item.childNodes[3]; // хардкод текстового дочернего узла
      if (item.classList.contains(activeClassName)) {
        itemText.style.transition = 'none';
        item.classList.remove(activeClassName);
      } else {
        setActive(itemsList);
        itemText.style.transition = '0.2s ease-in-out';
        item.classList.add(activeClassName);
      }
    });
  });
}

function setAnimation() {
  const screenWidth = document.documentElement.clientWidth;
  console.log(screenWidth);
  const items = document.querySelectorAll('.tariff');
  items.forEach((it) => {
    if (screenWidth < 600) {
      it.classList.add('fadeInUp');
    }
  });
}
