import Medicine from "./medicine.js";
import MedicineManager from "./medicineManager.js";
import Ui from "./ui.js";

// Selecting dom elements
const medicineModal = document.querySelector(".form-modal");
const addMedicineButton = document.querySelector(
  ".inventory-actions__button--add"
);
const formSubmitButton = document.querySelector(".form-modal__submit-button");

const closeMedicineModalButton = document.querySelector(
  ".form-modal__cancel-button"
);

// Selecting form inputs
const form = document.querySelector(".form-modal__form");
const name = document.querySelector(".form-modal__input--medicine-name");
const manufacturer = document.querySelector(".form-modal__input--manufacturer");
const expirationDate = document.querySelector(
  ".form-modal__input--expiration-date"
);
const quantity = document.querySelector(".form-modal__input--quantity");

const deleteButton = document.querySelector(".delete-button");
const validationMessage = document.querySelector(".validation-message");

document.addEventListener("DOMContentLoaded", () => {
  Ui.displayAddMedicine(
    addMedicineButton,
    medicineModal,
    form,
    validationMessage,
    formSubmitButton
  );
  Ui.closeAddMedicineModal(closeMedicineModalButton, medicineModal);
  Ui.closeDeleteModal();
  Ui.renderMedicines();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // if (!Validation.validateForm(validationMessage)) {
  //   return;
  // }

  if (!Ui.currentEditId) {
    MedicineManager.addMedicine(
      name.value.trim(),
      manufacturer.value.trim(),
      expirationDate.value,
      quantity.value
    );
    Ui.renderMedicines();
  } else {
    MedicineManager.updateMedicine(
      Ui.currentEditId,
      name.value.trim(),
      manufacturer.value.trim(),
      expirationDate.value,
      quantity.value
    );
    Ui.currentEditId = null;
    medicineModal.classList.remove("display-add-medicine");
  }
  Ui.renderMedicines();
  form.reset();
});
