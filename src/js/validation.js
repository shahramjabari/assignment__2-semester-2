class Validation {
  static validationFormMessage(validationMessage) {
    const validateField = [
      {
        name: "medicine-name",
        message: "Please enter medicine name",
      },
      {
        name: "manufacturer",
        message: "Please enter manufacture name",
      },
      {
        name: "expiration-date",
        message: "Please enter expiration date",
      },
      {
        name: "quantity",
        message: "Please enter an amount of medicines",
      },
    ];

    for (let field of validateField) {
      const inputField = document.querySelector(
        `.form-modal__input--${field.name}`
      );

      validationMessage.textContent = "";

      inputField.addEventListener("input", () => {
        inputField.classList.remove("form__invalid-input");
        validationMessage.textContent = "";
      });

      if (!inputField.value.trim()) {
        validationMessage.style.display = "block";
        validationMessage.textContent = field.message;
        inputField.classList.add("form__invalid-input");
        return false;
      }
    }
    return true;
  }
}

export default Validation;
