import MedicineManager from "./medicineManager";

class Ui {
  static currentEditId = null;

  static displayAddMedicine(
    addMedicineButton,
    medicineModal,
    form,
    validationMessage,
    formSubmitButton
  ) {
    addMedicineButton.addEventListener("click", () => {
      form.reset();
      medicineModal.classList.add("display-add-medicine");
      Ui.currentEditId = null;
      formSubmitButton.textContent = "Add";
      validationMessage.style.display = "none";
    });
  }

  static closeAddMedicineModal(closeMedicineModalButton, medicineModal) {
    closeMedicineModalButton.addEventListener("click", () => {
      medicineModal.classList.remove("display-add-medicine");
      const inputs = document.querySelectorAll(".form-modal__form input");
      inputs.forEach((input) => {
        input.classList.remove("form__invalid-input");
      });
    });
  }

  static displayDeleteModal(medicineId, medicineName) {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteMessage = document.querySelector(".delete-modal__text");
    const confirmDeleteButton = document.querySelector(
      ".delete-modal__confirm-button"
    );

    deleteMessage.textContent = `Are you sure you want to delete ${medicineName}?`;
    deleteModal.classList.add("display-delete-modal");

    confirmDeleteButton.addEventListener("click", () => {
      MedicineManager.deleteMedicine(medicineId);
      deleteModal.classList.remove("display-delete-modal");
    });
  }
  static closeDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteModalMessage = document.querySelector(
      ".delete-modal__cancel-button"
    );
    const cancelDeleteButton = document.querySelector(
      ".delete-modal__cancel-button"
    );
    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.remove("display-delete-modal");
    });
  }

  static editModal() {
    const medicineModal = document.querySelector(".form-modal");
    const formSubmitButton = document.querySelector(
      ".form-modal__submit-button"
    );
    medicineModal.classList.add("display-add-medicine");
    formSubmitButton.textContent = "Submit editing";
  }
  static editForm(id) {
    const name = document.querySelector(".form-modal__input--medicine-name");
    const manufacturer = document.querySelector(
      ".form-modal__input--manufacturer"
    );
    const expirationDate = document.querySelector(
      ".form-modal__input--expiration-date"
    );
    const quantity = document.querySelector(".form-modal__input--quantity");

    const medicineCollection = JSON.parse(
      localStorage.getItem("medicines-collection")
    );
    const medicineEdit = medicineCollection.find(
      (medicine) => medicine.id === id
    );
    name.value = medicineEdit.name;
    manufacturer.value = medicineEdit.manufacturer;
    expirationDate.value = medicineEdit.expirationDate;
    quantity.value = medicineEdit.quantity;
    Ui.currentEditId = medicineEdit.id;
  }

  static renderMedicines() {
    const medicineList = document.querySelector(".inventory-table__body");
    medicineList.innerHTML = "";

    const medicines =
      JSON.parse(localStorage.getItem("medicines-collection")) || [];

    medicines.forEach((medicine, index) => {
      const row = document.createElement("tr");
      row.classList.add("inventory__table-row");

      const nameCell = document.createElement("td");
      nameCell.textContent = medicine.name;

      const manufacturerCell = document.createElement("td");
      manufacturerCell.textContent = medicine.manufacturer;

      const expirationDateCell = document.createElement("td");
      expirationDateCell.textContent = medicine.expirationDate;

      const quantityCell = document.createElement("td");
      quantityCell.textContent = medicine.quantity;

      const actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.classList.add("action-buttons__container");
      const actionsCell = document.createElement("td");

      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-id", index);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", index);

      actionButtonsContainer.append(editButton, deleteButton);
      actionsCell.append(actionButtonsContainer);

      row.append(
        nameCell,
        manufacturerCell,
        expirationDateCell,
        quantityCell,
        actionsCell
      );
      medicineList.append(row);

      deleteButton.addEventListener("click", () => {
        Ui.displayDeleteModal(medicine.id, medicine.name);
      });

      editButton.addEventListener("click", () => {
        Ui.editModal();
        Ui.editForm(medicine.id);
      });
    });
  }
}

export default Ui;
