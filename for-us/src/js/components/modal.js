const hidden = 'popup-modal-hidden';
const active = 'modal-box-active';
const noscroll = 'modal-box-viewed';
const closeIconClassName = 'close';
const { body } = document;

function defineModal(modalBoxId) {
  const modalBoxesList = document.querySelectorAll('.modal-box');
  const [modalBox] = Array.from(modalBoxesList)
    .filter((modal) => modal.dataset.modal === modalBoxId);
  return modalBox;
}

export function openModal(modalBoxId) {
  const modalBox = defineModal(modalBoxId);
  const modal = modalBox.closest('.popup-modal');
  body.classList.add(noscroll);
  modal.classList.remove(hidden);
  modalBox.classList.add(active);

  // закрыть эту модалку
  modal.addEventListener('click', (e) => {
    const { target } = e;
    const closeModalButton = (
      target.classList.contains(closeIconClassName))
      ? target
      : target.closest(`.${closeIconClassName}`);

    if (!target.closest('.modal-box') || closeModalButton) {
      closeModal(modalBox);
    }
  });
}

export function closeModal(modalBox) {
  body.classList.remove(noscroll);
  modalBox.closest('.popup-modal').classList.add(hidden);
}
